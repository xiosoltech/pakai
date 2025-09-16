
import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import Card from './shared/Card';
import Icon from './shared/Icon';

// Check for SpeechRecognition API
// Fix: Cast window to any to access non-standard SpeechRecognition APIs.
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const isSpeechSupported = !!SpeechRecognition;

const HealthBot: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isTtsEnabled, setIsTtsEnabled] = useState(true);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const speak = (text: string) => {
        if (!isTtsEnabled || !window.speechSynthesis) return;
        window.speechSynthesis.cancel(); // Stop any currently speaking utterance
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (messageText = input) => {
        if (!messageText.trim()) return;

        const userMessage: ChatMessage = { role: 'user', parts: [{ text: messageText }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await streamChatResponse(messageText);
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);
            
            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].parts[0].text = modelResponse;
                    return newMessages;
                });
            }
            speak(modelResponse); // Speak the full response when done
        } catch (error) {
            console.error('Error streaming chat response:', error);
            const errorMessage: ChatMessage = {
                role: 'model',
                parts: [{ text: 'Sorry, I encountered an error. Please try again.' }]
            };
             setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = errorMessage;
                return newMessages;
            });
            speak(errorMessage.parts[0].text);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        const initializeChat = async () => {
            setIsLoading(true);
            try {
                const stream = await streamChatResponse("Hello");
                let modelResponse = '';
                setMessages([{ role: 'model', parts: [{ text: '' }] }]);
                
                for await (const chunk of stream) {
                    modelResponse += chunk.text;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[0].parts[0].text = modelResponse;
                        return newMessages;
                    });
                }
                speak(modelResponse);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                 const initErrorMsg = 'Hello! I am having trouble starting up. Please check the connection and refresh.';
                 setMessages([{
                    role: 'model',
                    parts: [{ text: initErrorMsg }]
                }]);
                speak(initErrorMsg);
            } finally {
                setIsLoading(false);
            }
        };

        if (messages.length === 0) {
            initializeChat();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Setup Speech Recognition
    useEffect(() => {
        if (!isSpeechSupported) return;
        
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setInput(finalTranscript + interimTranscript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognitionRef.current = recognition;
    }, []);

    const toggleListening = () => {
        if (!isSpeechSupported) return;
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-3xl font-bold text-text-primary">HealthBot Symptom Checker</h2>
                 <button onClick={() => setIsTtsEnabled(!isTtsEnabled)} className="p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label={isTtsEnabled ? "Disable spoken responses" : "Enable spoken responses"}>
                     <Icon name={isTtsEnabled ? 'volumeUp' : 'volumeOff'} className="w-6 h-6 text-text-secondary" />
                 </button>
            </div>
            <Card className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-brand-secondary text-white' : 'bg-gray-200 text-text-primary'}`}>
                                {msg.parts[0].text}
                            </div>
                        </div>
                    ))}
                     {isLoading && messages[messages.length - 1]?.role === 'user' && (
                        <div className="flex justify-start">
                            <div className="max-w-lg px-4 py-3 rounded-2xl bg-gray-200 text-text-primary">
                                <div className="flex items-center space-x-2">
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                             <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                                placeholder="Describe your symptoms or press the mic..."
                                className="w-full p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent transition-colors hover:border-gray-400"
                                disabled={isLoading}
                            />
                            {isSpeechSupported && (
                                <button
                                    onClick={toggleListening}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-200'}`}
                                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                                >
                                    <Icon name="microphone" className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-brand-secondary text-white rounded-full hover:bg-brand-primary disabled:bg-gray-400 transition-colors"
                        >
                            <Icon name="send" />
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default HealthBot;