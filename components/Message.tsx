import React from 'react';
import type { ChatMessage } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { CodeIcon } from './icons/CodeIcon';

interface MessageProps {
  message: ChatMessage;
}

const CodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-brand-hover border border-brand-border rounded-lg my-2 text-brand-text overflow-hidden">
            <div className="flex items-center justify-between px-4 py-1 bg-brand-border/50 text-xs text-brand-subtext">
                <div className="flex items-center gap-2">
                    <CodeIcon />
                    <span>{language || 'code'}</span>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-brand-text transition-colors">
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? 'Copied!' : 'Copy code'}
                </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto"><code className={`language-${language}`}>{value}</code></pre>
        </div>
    );
};

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-brand-primary' : 'bg-brand-hover ring-1 ring-brand-border'}`}>
          {isUser ? <UserIcon /> : <BotIcon />}
        </div>
        <div className={`p-4 rounded-xl max-w-lg ${isUser ? 'bg-brand-primary text-white' : 'bg-brand-surface border border-brand-border'}`}>
            <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : ''} prose-p:my-2 prose-headings:my-3`}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode; [key: string]: any; }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const codeText = String(children).replace(/\n$/, '');
                            return !inline && match ? (
                                <CodeBlock language={match[1]} value={codeText} />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {message.text}
                </ReactMarkdown>
            </div>
        </div>
      </div>
    </div>
  );
};
