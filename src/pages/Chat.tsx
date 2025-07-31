import TiltedCard from "@/components/TiltedCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Dumbbell, Utensils, Target, TrendingUp } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const quickReplies = [
  { text: "Suggest a workout", icon: Dumbbell },
  { text: "Give me a meal idea", icon: Utensils },
  { text: "Track my progress", icon: TrendingUp },
  { text: "Set a fitness goal", icon: Target },
];

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Fitness Buddy assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAssistantResponse(text.trim()),
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const getAssistantResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("workout") || lowerText.includes("exercise")) {
      return "Great! Based on your fitness level, I recommend starting with a 30-minute full body workout. Would you like me to suggest specific exercises or create a custom routine for you?";
    } else if (lowerText.includes("meal") || lowerText.includes("food") || lowerText.includes("eat")) {
      return "For a balanced meal, try grilled chicken with quinoa and roasted vegetables. This provides lean protein, complex carbs, and essential nutrients. Would you like more meal suggestions or help with meal planning?";
    } else if (lowerText.includes("progress") || lowerText.includes("track")) {
      return "Your progress looks good! You've completed 4 workouts this week and maintained a balanced diet. Keep up the consistency. Would you like to see detailed analytics or set new goals?";
    } else if (lowerText.includes("goal") || lowerText.includes("target")) {
      return "Setting clear goals is important! What would you like to focus on - weight loss, muscle gain, improved endurance, or overall health? I can help create a personalized plan.";
    } else {
      return "I understand you're looking for fitness guidance. I can help with workout routines, meal planning, progress tracking, and setting fitness goals. What specific area would you like to focus on?";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-foreground">Chat Assistant</h1>
        <p className="text-muted-foreground mt-2">Get personalized fitness advice and support</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat Interface */}
        <TiltedCard
          containerHeight="500px"
          imageHeight="500px"
          imageWidth="100%"
          captionText="Chat Assistant"
          showMobileWarning={false}
          scaleOnHover={1.02}
          rotateAmplitude={4}
          className="lg:col-span-3"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-white">Fitness Buddy Assistant</h3>
            </div>
            
            <div className="space-y-4 flex-1">
              {/* Messages */}
              <div className="h-80 overflow-y-auto space-y-4 p-4 border border-gray-600 rounded-lg bg-gray-800/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.sender === "assistant" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-700 border border-gray-600 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about workouts, meals, or fitness tips..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button type="submit" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </TiltedCard>

        {/* Quick Replies */}
        <TiltedCard
          containerHeight="500px"
          imageHeight="500px"
          imageWidth="100%"
          captionText="Quick Actions"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
        >
          <div className="p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-2 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => sendMessage(reply.text)}
                >
                  <reply.icon className="h-4 w-4" />
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
        </TiltedCard>
      </div>

      {/* Assistant Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <TiltedCard
          containerHeight="200px"
          imageHeight="200px"
          imageWidth="100%"
          captionText="Workout Guidance"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
        >
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <Dumbbell className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1 text-white">Workout Guidance</h3>
            <p className="text-sm text-gray-300">
              Get personalized workout recommendations based on your fitness level
            </p>
          </div>
        </TiltedCard>
        
        <TiltedCard
          containerHeight="200px"
          imageHeight="200px"
          imageWidth="100%"
          captionText="Nutrition Advice"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
        >
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1 text-white">Nutrition Advice</h3>
            <p className="text-sm text-gray-300">
              Receive meal suggestions and nutrition tips tailored to your goals
            </p>
          </div>
        </TiltedCard>
        
        <TiltedCard
          containerHeight="200px"
          imageHeight="200px"
          imageWidth="100%"
          captionText="Progress Tracking"
          showMobileWarning={false}
          scaleOnHover={1.05}
          rotateAmplitude={6}
        >
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1 text-white">Progress Tracking</h3>
            <p className="text-sm text-gray-300">
              Monitor your fitness journey and get insights on your improvements
            </p>
          </div>
        </TiltedCard>
      </div>
    </div>
  );
};