import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons/ChatIcons';

const markdownToHtml = (text: string): string => {
    if (!text) return "";

    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (const line of lines) {
        let processedLine = line
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        if (processedLine.startsWith('### ')) {
            html += `<h3>${processedLine.substring(4)}</h3>`;
            continue;
        }
        if (processedLine.startsWith('## ')) {
            html += `<h2>${processedLine.substring(3)}</h2>`;
            continue;
        }
        if (processedLine.startsWith('# ')) {
            html += `<h1>${processedLine.substring(2)}</h1>`;
            continue;
        }
        
        const isListItem = processedLine.startsWith('* ') || processedLine.startsWith('- ');
        if (isListItem) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${processedLine.substring(2)}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            if (processedLine.trim() !== '') {
                html += `<p>${processedLine}</p>`;
            }
        }
    }

    if (inList) {
        html += '</ul>';
    }

    return html;
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: 'Hi there! I am AgriGuru, your AI assistant. How can I help you with your farming questions today?' }],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await getChatbotResponse(input);
    const botMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
    
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-200"
            aria-label="Open support chat"
          >
            <ChatBubbleIcon className="h-8 w-8" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm h-[70vh] max-h-[500px] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-white rounded-t-2xl">
            <h3 className="font-bold text-lg">AgriGuru Assistant</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                <div
                  className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-primary-500 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.parts[0].text) }}></div>
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white disabled:bg-gray-400 transition-colors"
                aria-label="Send message"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;