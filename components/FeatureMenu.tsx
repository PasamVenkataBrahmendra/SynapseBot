import React from 'react';
import type { Feature } from '../types';
import { FEATURES } from '../constants';

interface FeatureMenuProps {
  onSelectFeature: (feature: Feature) => void;
}

const FeatureMenu: React.FC<FeatureMenuProps> = ({ onSelectFeature }) => {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-brand-text">Welcome to SynapseBot!</h2>
        <p className="mt-2 text-lg text-brand-subtext max-w-2xl">
          I'm a helpful AI assistant. Select a feature below to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {(Object.keys(FEATURES) as Feature[]).map((key) => {
          const feature = FEATURES[key];
          return (
            <button
              key={key}
              onClick={() => onSelectFeature(key)}
              className="group flex flex-col items-start p-6 bg-brand-surface rounded-xl border border-brand-border hover:border-brand-primary hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-brand-hover rounded-lg text-brand-primary mb-4">
                <feature.icon />
              </div>
              <h3 className="text-lg font-semibold text-brand-text mb-1">{feature.title}</h3>
              <p className="text-sm text-brand-subtext">{feature.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureMenu;