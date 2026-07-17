"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Sparkles, Send, Image as ImageIcon, Briefcase, Mail, Bot, User, Zap } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  source?: string;
};

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-card/60 border border-border/50 backdrop-blur-sm rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-3">
        <Bot className="h-4 w-4 text-primary animate-pulse" />
        <div className="flex gap-1.5">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
        <span className="text-xs text-muted-foreground ml-1">Processing...</span>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Checkmarks and bullets are already in the text
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
      <div className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
        isUser
          ? 'bg-gradient-to-br from-primary to-purple-600 text-white rounded-br-md'
          : 'bg-card/60 border border-border/50 backdrop-blur-sm text-card-foreground rounded-bl-md'
      }`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/20">
            <Bot className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI CMO</span>
            {msg.model && (
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full ml-auto">
                {msg.model}
              </span>
            )}
          </div>
        )}
        <div className="whitespace-pre-wrap">{renderContent(msg.content)}</div>
      </div>
    </div>
  );
}

const quickPrompts = [
  { icon: Mail, label: 'Email Promo', prompt: 'Create a promotional email campaign for my warm leads with a limited-time discount offer' },
  { icon: ImageIcon, label: 'Generate Images', prompt: 'Generate new social media images for Instagram promoting our summer sale' },
  { icon: Briefcase, label: 'Analyze Leads', prompt: 'Analyze my CRM for leads most likely to convert this quarter' },
  { icon: Zap, label: 'Full Campaign', prompt: 'Create a complete Black Friday marketing campaign — emails, social posts, and ad creatives' },
];

export default function AICmoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 **Hello! I\'m your AI Chief Marketing Officer.**\n\nI can autonomously execute your entire marketing workflow. Tell me what you need, and I\'ll generate the images, write the copy, target the right leads, and schedule everything.\n\n**Try asking me to:**\n- Create a promotional email campaign\n- Generate social media images\n- Analyze your CRM for hot leads\n- Run a complete multi-channel campaign\n\nWhat would you like to achieve today?',
      model: 'BizCatalyst AI',
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.content }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
          model: data.model,
          source: data.source,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '❌ Sorry, I encountered an error processing your request. Please try again.',
          model: 'System',
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Network error. Please check your connection and try again.',
        model: 'System',
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-4 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          AI Co-Pilot
          <span className="text-xs bg-primary/15 text-primary px-2.5 py-1 rounded-full font-medium">Autonomous Mode</span>
        </h1>
        <p className="text-muted-foreground mt-1 ml-[52px]">
          Tell the AI what you want to achieve, and it will execute the entire marketing workflow.
        </p>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-border/30">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} msg={msg} />
          ))}
          {isProcessing && <TypingIndicator />}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/80 backdrop-blur-sm border-t border-border/20">
          {/* Quick Prompts */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {quickPrompts.map((qp, i) => {
              const Icon = qp.icon;
              return (
                <button
                  key={i}
                  onClick={() => setInput(qp.prompt)}
                  disabled={isProcessing}
                  className="text-xs bg-secondary/50 hover:bg-secondary text-muted-foreground px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 transition-colors border border-border/30 hover:border-border/50 disabled:opacity-50"
                >
                  <Icon className="h-3 w-3" />
                  {qp.label}
                </button>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isProcessing}
              placeholder="E.g. 'Run a Black Friday campaign for my new shoe line...'"
              className="flex-1 bg-secondary/50 border border-border/50 rounded-full h-12 px-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 placeholder:text-muted-foreground/60 transition-all"
            />
            <button
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
            Powered by BizCatalyst AI • Qwythos-9B + HuggingFace
          </p>
        </div>
      </Card>
    </div>
  );
}
