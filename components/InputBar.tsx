import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';

interface InputBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <div className="p-4 bg-brand-surface border-t border-brand-border sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-3 bg-brand-primary rounded-lg text-white disabled:bg-brand-subtext disabled:opacity-50 hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default InputBar;