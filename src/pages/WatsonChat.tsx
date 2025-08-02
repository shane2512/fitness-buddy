import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
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

export const WatsonChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI fitness assistant. I can help with workout plans, nutrition advice, and fitness goals. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiToken, setApiToken] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBearerToken = async (apiKey: string): Promise<string> => {
    try {
      const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=urn:iam:params:oauth:grant-type:apikey&apikey=${apiKey}`,
      });

      if (!response.ok) {
        throw new Error('Failed to generate bearer token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error generating bearer token:', error);
      throw error;
    }
  };

  const sendToWatsonx = async (message: string, token: string): Promise<string> => {
    try {
      const response = await fetch(
        'https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/6979cdc5-5b8e-4a5e-a653-9251913470b8/ai_service?version=2021-05-01',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            input_data: [{
              fields: ["input"],
              values: [[message]]
            }],
            parameters: {
              max_new_tokens: 1000,
              temperature: 0.7,
              top_p: 0.9,
              repetition_penalty: 1.1
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Extract the response text from the Watson AI response
      if (data.predictions && data.predictions[0] && data.predictions[0].values) {
        return data.predictions[0].values[0][0] || 'Sorry, I couldn\'t generate a response.';
      }
      
      return 'Sorry, I received an unexpected response format.';
    } catch (error) {
      console.error('Error calling Watsonx API:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (!apiToken) {
      toast({
        title: "API Token Required",
        description: "Please enter your IBM Cloud API key in the input field above the chat.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const bearerToken = await generateBearerToken(apiToken);
      const response = await sendToWatsonx(inputValue, bearerToken);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while processing your request. Please check your API key and try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: "Failed to send message. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2">AI Fitness Assistant</h1>
        <p className="text-gray-400">Chat with your personal AI trainer powered by IBM Watsonx</p>
      </div>

      {/* API Token Input */}
      <TiltedCard className="p-4">
        <div className="space-y-2">
          <label htmlFor="apiToken" className="text-sm font-medium text-gray-300">
            IBM Cloud API Key
          </label>
          <Input
            id="apiToken"
            type="password"
            placeholder="Enter your IBM Cloud API key"
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
          />
          <p className="text-xs text-gray-500">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>
      </TiltedCard>

      {/* Chat Interface */}
      <TiltedCard className="h-[500px] flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-700">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-white">Fitness Assistant</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`flex flex-col space-y-1 ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 max-w-xs sm:max-w-md lg:max-w-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-gray-700 text-gray-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="rounded-lg px-3 py-2 bg-gray-800 text-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about workouts, nutrition, or fitness goals..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
            />
            <Button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-primary hover:bg-primary/80"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </TiltedCard>
    </div>
  );
};