import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Dumbbell, Utensils, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import TiltedCard from '@/components/TiltedCard';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  { text: "Suggest a workout", icon: Dumbbell },
  { text: "Give me a meal idea", icon: Utensils },
  { text: "Track my progress", icon: TrendingUp },
  { text: "Set a fitness goal", icon: Target },
];

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI fitness assistant powered by IBM Watson. I can help with workout plans, nutrition advice, and fitness goals. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = "cpd-apikey-IBMid-694000MR2J-2025-08-02T09:58:15Z";
  const SCORING_URL = "https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/6979cdc5-5b8e-4a5e-a653-9251913470b8/ai_service_stream?version=2021-05-01";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.addEventListener("load", () => {
        try {
          const tokenResponse = JSON.parse(xhr.responseText);
          resolve(tokenResponse.access_token);
        } catch (ex) {
          reject(new Error("Error parsing token response"));
        }
      });
      
      xhr.addEventListener("error", () => {
        reject(new Error("Error getting token"));
      });
      
      xhr.open("POST", "https://iam.cloud.ibm.com/identity/token");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + API_KEY);
    });
  };

  const apiPost = (token: string, payload: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.addEventListener("load", () => {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (ex) {
          reject(new Error("Error parsing API response"));
        }
      });
      
      xhr.addEventListener("error", () => {
        reject(new Error("Error calling API"));
      });
      
      xhr.open("POST", SCORING_URL);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(payload);
    });
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get authentication token
      const token = await getToken();
      
      // Prepare payload for IBM Watson
      const payload = JSON.stringify({
        messages: [
          {
            content: `You are a fitness and health assistant. Please provide helpful advice about: ${messageText}`,
            role: "user"
          }
        ]
      });

      // Call IBM Watson API
      const response = await apiPost(token, payload);
      
      // Extract response text (adjust based on actual API response structure)
      let botResponseText = "I'm here to help with your fitness journey!";
      
      if (response && response.choices && response.choices[0] && response.choices[0].message) {
        botResponseText = response.choices[0].message.content;
      } else if (response && response.generated_text) {
        botResponseText = response.generated_text;
      } else {
        // Fallback responses for common fitness queries
        botResponseText = getFallbackResponse(messageText);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Provide fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getFallbackResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Using offline mode. For full AI features, check your connection.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("workout") || lowerText.includes("exercise")) {
      return "Great! For a balanced workout, I recommend starting with 30 minutes of mixed cardio and strength training. Try: 10 minutes warm-up, 15 minutes strength exercises (push-ups, squats, lunges), and 5 minutes cool-down stretching. Would you like specific exercise recommendations?";
    } else if (lowerText.includes("meal") || lowerText.includes("food") || lowerText.includes("nutrition")) {
      return "For optimal nutrition, focus on balanced meals with lean protein, complex carbs, and healthy fats. Try: grilled chicken with quinoa and roasted vegetables, or a salmon bowl with brown rice and avocado. Aim for 5-6 smaller meals throughout the day. What are your dietary preferences?";
    } else if (lowerText.includes("progress") || lowerText.includes("track")) {
      return "Tracking progress is key to success! Monitor: 1) Weight/body measurements weekly, 2) Workout performance (reps, weights, duration), 3) Energy levels and sleep quality, 4) Photos for visual progress. Consistency is more important than perfection. How long have you been on your fitness journey?";
    } else if (lowerText.includes("goal") || lowerText.includes("target")) {
      return "Setting SMART goals is crucial! Make them Specific, Measurable, Achievable, Relevant, and Time-bound. Examples: 'Lose 10 pounds in 3 months' or 'Run 5K in under 30 minutes by year-end'. Start with small, achievable goals and build momentum. What's your main fitness objective?";
    } else if (lowerText.includes("motivation") || lowerText.includes("help")) {
      return "You've got this! Remember why you started - every small step counts. Celebrate small wins, find a workout buddy, track your progress, and be patient with yourself. Consistency beats perfection every time. What's challenging you most right now?";
    } else {
      return "I'm here to help with your fitness journey! I can assist with workout routines, meal planning, progress tracking, goal setting, and motivation. What specific area would you like to focus on today?";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">AI Fitness Assistant</h1>
        <p className="text-muted-foreground mt-2">Get personalized fitness advice powered by IBM Watson</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat Interface */}
        <TiltedCard
          containerHeight="500px"
          containerWidth="100%"
          imageHeight="500px"
          imageWidth="100%"
          captionText="AI Chat Assistant"
          showMobileWarning={false}
          scaleOnHover={1.02}
          rotateAmplitude={4}
          className="lg:col-span-3"
          displayOverlayContent={true}
          overlayContent={
            <div className="p-6 h-full flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">AI Fitness Assistant</h3>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4 pr-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary/20">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-800 border border-gray-700 text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {message.sender === "user" && (
                        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-700">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary/20">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about workouts, nutrition, or fitness tips..."
                  className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={!inputValue.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          }
        />

        {/* Quick Replies */}
        <TiltedCard
          containerHeight="500px"
          containerWidth="100%"
          imageHeight="500px"
          imageWidth="100%"
          captionText="Quick Actions"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-6 h-full flex flex-col bg-gray-900/90 backdrop-blur-sm rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-2 border-gray-600 text-white hover:bg-gray-700 bg-gray-800/50"
                    onClick={() => handleQuickReply(reply.text)}
                    disabled={isLoading}
                  >
                    <reply.icon className="h-4 w-4" />
                    {reply.text}
                  </Button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-white mb-2">AI Features</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Personalized workout plans</li>
                  <li>• Nutrition recommendations</li>
                  <li>• Progress tracking advice</li>
                  <li>• Motivation & goal setting</li>
                </ul>
              </div>
            </div>
          }
        />
      </div>

      {/* AI Features Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <TiltedCard
          containerHeight="150px"
          containerWidth="100%"
          imageHeight="150px"
          imageWidth="100%"
          captionText="Workout Planning"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gray-900/90 backdrop-blur-sm rounded-lg">
              <Dumbbell className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Workout Planning</h3>
              <p className="text-sm text-gray-300">
                Get AI-powered workout recommendations
              </p>
            </div>
          }
        />
        
        <TiltedCard
          containerHeight="150px"
          containerWidth="100%"
          imageHeight="150px"
          imageWidth="100%"
          captionText="Nutrition Advice"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gray-900/90 backdrop-blur-sm rounded-lg">
              <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Nutrition Advice</h3>
              <p className="text-sm text-gray-300">
                Receive personalized meal suggestions
              </p>
            </div>
          }
        />
        
        <TiltedCard
          containerHeight="150px"
          containerWidth="100%"
          imageHeight="150px"
          imageWidth="100%"
          captionText="Progress Tracking"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gray-900/90 backdrop-blur-sm rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Progress Tracking</h3>
              <p className="text-sm text-gray-300">
                Monitor your fitness journey with AI insights
              </p>
            </div>
          }
        />
        
        <TiltedCard
          containerHeight="150px"
          containerWidth="100%"
          imageHeight="150px"
          imageWidth="100%"
          captionText="Goal Setting"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
          displayOverlayContent={true}
          overlayContent={
            <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gray-900/90 backdrop-blur-sm rounded-lg">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1 text-white">Goal Setting</h3>
              <p className="text-sm text-gray-300">
                Set and achieve fitness goals with AI guidance
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
};