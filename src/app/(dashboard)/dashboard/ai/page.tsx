"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Sparkles, Send, Image as ImageIcon, Briefcase, Mail } from 'lucide-react';

export default function AICmoPage() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I am your AI Chief Marketing Officer. Type a prompt like "Create a Black Friday campaign for shoes" and I will automatically generate the images, ad copy, and schedule the emails for you.' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { role: 'user', content: input };
    setMessages([...messages, newMsg]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI generation pipeline (Hackathon Demo)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: `I have created the campaign based on "${newMsg.content}".\n\n✅ Generated 3 Social Media Images via HuggingFace API\n✅ Drafted 2 Marketing Emails targeting your Warm Leads\n✅ Scheduled for distribution next Tuesday at 9:00 AM.\n\nWould you like to review the assets?` 
      }]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="text-primary h-8 w-8" /> 
          AI Co-Pilot (Autonomous Mode)
        </h2>
        <p className="text-muted-foreground mt-1">
          Tell the AI what you want to achieve, and it will execute the entire marketing workflow.
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-4 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border shadow-sm text-card-foreground whitespace-pre-line'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-card border shadow-sm text-card-foreground rounded-lg p-4 flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                Processing request... Generating images...
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-background border-t">
          <div className="flex gap-2 mb-3 overflow-x-auto">
            <button onClick={() => setInput("Create a promotional email for my warm leads")} className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1 transition-colors">
              <Mail className="h-3 w-3" /> Email Promo
            </button>
            <button onClick={() => setInput("Generate a new social media image for Instagram")} className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1 transition-colors">
              <ImageIcon className="h-3 w-3" /> Generate Image
            </button>
            <button onClick={() => setInput("Analyze my CRM for leads likely to convert")} className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1 transition-colors">
              <Briefcase className="h-3 w-3" /> Analyze Leads
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g. 'Run a Black Friday campaign for my new shoe line...'"
              className="flex-1 bg-background border rounded-full h-12 px-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
            <button 
              type="submit" 
              disabled={isProcessing || !input.trim()}
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 transition-opacity"
            >
              <Send className="h-4 w-4 ml-1" />
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
