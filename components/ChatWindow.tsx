import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { Message } from './Message';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1.5 p-2">
        <div className="w-2 h-2 bg-brand-subtext rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-brand-subtext rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-brand-subtext rounded-full animate-bounce"></div>
    </div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
             <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-hover flex items-center justify-center ring-1 ring-brand-border"></div>
                 <div className="p-1 rounded-xl bg-brand-surface max-w-lg border border-brand-border">
                    <TypingIndicator />
                </div>
             </div>
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatWindow;