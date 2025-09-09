import React from 'react';
import { SparkleIcon } from './icons/SparkleIcon';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  isLoading: boolean;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelectSuggestion, isLoading }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-6 mb-4">
        <div className="flex items-center gap-2 text-sm text-brand-subtext mb-3">
            <SparkleIcon />
            <span>Suggestions</span>
        </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelectSuggestion(suggestion)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-brand-surface border border-brand-border rounded-full text-sm text-brand-text hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionChips;
