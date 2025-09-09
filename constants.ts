import React from 'react';
import { Feature } from './types';
import { KnowledgeIcon } from './components/icons/KnowledgeIcon';
import { CreativeIcon } from './components/icons/CreativeIcon';
import { TroubleshootIcon } from './components/icons/TroubleshootIcon';
import { InspirationIcon } from './components/icons/InspirationIcon';
import { CodeAssistantIcon } from './components/icons/CodeAssistantIcon';
import { MathIcon } from './components/icons/MathIcon';

interface FeatureConfig {
  title: string;
  description: string;
  systemInstruction: string;
  icon: React.FC;
  suggestions?: string[];
}

export const FEATURES: Record<Feature, FeatureConfig> = {
  KNOWLEDGE_BASE: {
    title: 'Knowledge Base',
    description: 'Get answers to your questions based on a vast corpus of information.',
    systemInstruction: 'You are an AI assistant designed to provide accurate and comprehensive information. Answer the user\'s questions clearly and concisely.',
    icon: KnowledgeIcon,
    suggestions: [
      "What is the theory of relativity?",
      "Who was the first person to walk on the moon?",
      "How does photosynthesis work?",
    ]
  },
  CREATIVE_WRITING: {
    title: 'Creative Writing',
    description: 'Generate stories, poems, or scripts to spark your imagination.',
    systemInstruction: 'You are a creative AI assistant. Help the user write stories, poems, or other creative content. Be imaginative and inspiring.',
    icon: CreativeIcon,
    suggestions: [
        "Write a short story about a detective in a futuristic city.",
        "Compose a poem about the changing seasons.",
        "Help me brainstorm ideas for a fantasy novel.",
    ]
  },
  TROUBLESHOOTING: {
    title: 'Troubleshooting',
    description: 'Get help diagnosing and solving technical problems.',
    systemInstruction: 'You are a technical support AI. Help the user troubleshoot problems by providing step-by-step instructions and clear explanations.',
    icon: TroubleshootIcon,
    suggestions: [
        "My computer is running slow, what can I do?",
        "Why is my internet connection not working?",
        "How do I fix a bug in my Python code?",
    ]
  },
  INSPIRATION_BOT: {
    title: 'Inspiration Bot',
    description: 'Find new ideas, quotes, or perspectives to fuel your creativity.',
    systemInstruction: 'You are an inspiration bot. Provide the user with new ideas, motivational quotes, and fresh perspectives to spark their creativity.',
    icon: InspirationIcon,
    suggestions: [
        "Give me a motivational quote for today.",
        "What are some interesting topics to learn about?",
        "Suggest a new hobby I could try.",
    ]
  },
  CODE_ASSISTANT: {
    title: 'Code Assistant',
    description: 'Get help with writing, debugging, and understanding code.',
    systemInstruction: 'You are an expert AI programmer. Assist the user with writing, debugging, and explaining code in various programming languages.',
    icon: CodeAssistantIcon,
    suggestions: [
        "Write a Python function to sort a list of numbers.",
        "Explain what a closure is in JavaScript.",
        "How do I make a GET request in React?",
    ]
  },
  MATH_SOLVER: {
    title: 'Math Solver',
    description: 'Solve complex math problems, from algebra to calculus.',
    systemInstruction: 'You are a brilliant mathematician AI. Your goal is to solve mathematical problems provided by the user. Always show your work, explaining each step of the solution process clearly. Use Markdown to format equations and calculations for readability.',
    icon: MathIcon,
    suggestions: [
        "Solve for x: 2x + 5 = 15",
        "What is the derivative of x^3 + 4x^2 - 6?",
        "Explain the Pythagorean theorem.",
    ]
  },
};