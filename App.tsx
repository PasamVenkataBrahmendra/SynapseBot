import React, { useState, useEffect } from 'react';
import { AppState, ChatMessage, Feature } from './types';
import { FEATURES } from './constants';
import { startChat, sendMessageStream } from './services/geminiService';
import FeatureMenu from './components/FeatureMenu';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { LogoIcon } from './components/icons/LogoIcon';
import { BackIcon } from './components/icons/BackIcon';
import { TrashIcon } from './components/icons/TrashIcon';
import SuggestionChips from './components/SuggestionChips';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to save messages to localStorage whenever they change for the current feature
  useEffect(() => {
    if (appState === AppState.CHATTING && selectedFeature) {
      const storageKey = `chatHistory_${selectedFeature}`;
      if (messages.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } else {
        // If messages are cleared (e.g., new chat), remove from storage
        localStorage.removeItem(storageKey);
      }
    }
  }, [messages, selectedFeature, appState]);


  const handleSelectFeature = (feature: Feature) => {
    const storageKey = `chatHistory_${feature}`;
    const savedMessagesRaw = localStorage.getItem(storageKey);
    const initialMessages = savedMessagesRaw ? JSON.parse(savedMessagesRaw) : [];

    setSelectedFeature(feature);
    setMessages(initialMessages);
    startChat(feature, initialMessages); // Pass history to geminiService
    setAppState(AppState.CHATTING);
  };

  const handleBackToMenu = () => {
    setAppState(AppState.MENU);
    setSelectedFeature(null);
    setMessages([]);
  };

  const handleNewChat = () => {
    if (selectedFeature) {
        const storageKey = `chatHistory_${selectedFeature}`;
        localStorage.removeItem(storageKey); // Clear from storage
        setMessages([]); // Clear from state
        startChat(selectedFeature); // Start a fresh chat session without history
    }
  }

  const handleSendMessage = async (text: string) => {
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    // Use a functional update to get the latest state
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    const newBotMessage: ChatMessage = {
        id: botMessageId,
        text: '',
        sender: 'bot'
    };
    setMessages((prev) => [...prev, newBotMessage]);

    try {
      const stream = await sendMessageStream(text);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: 'Sorry, something went wrong.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const currentFeature = selectedFeature ? FEATURES[selectedFeature] : null;

  return (
    <div className="flex flex-col h-screen bg-brand-bg text-brand-text font-sans">
      <header className="flex items-center justify-between p-4 border-b border-brand-border sticky top-0 bg-brand-bg/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
            {appState === AppState.CHATTING ? (
                <button onClick={handleBackToMenu} className="p-2 hover:bg-brand-hover rounded-full" aria-label="Back to menu">
                    <BackIcon />
                </button>
            ) : (
                <LogoIcon />
            )}
            <h1 className="text-xl font-semibold">
                {appState === AppState.CHATTING && currentFeature ? currentFeature.title : 'SynapseBot'}
            </h1>
        </div>
        {appState === AppState.CHATTING && (
            <button onClick={handleNewChat} className="p-2 hover:bg-brand-hover rounded-full" aria-label="Clear Chat">
                <TrashIcon />
            </button>
        )}
      </header>

      <main className="flex-1 flex flex-col min-h-0">
        {appState === AppState.MENU ? (
          <div className="overflow-y-auto">
            <FeatureMenu onSelectFeature={handleSelectFeature} />
          </div>
        ) : (
          <>
            <ChatWindow messages={messages} isLoading={isLoading} />
            <div className="px-4 md:px-6">
                {messages.length === 0 && currentFeature?.suggestions && !isLoading && (
                    <SuggestionChips
                        suggestions={currentFeature.suggestions}
                        onSelectSuggestion={handleSelectSuggestion}
                        isLoading={isLoading}
                    />
                )}
            </div>
            <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;