import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaMicrophone, FaChartBar } from 'react-icons/fa';
import { messageTemplates, sentimentStyles, initSpeechRecognition, speak, generateAnalytics } from '../utils/chatFeatures';
import { saveChatHistory, loadChatHistory, analyzeContext } from '../utils/chatUtils';
import { languages, translations } from '../utils/languageUtils';
import { FaRobot, FaTimes, FaFile, FaSmile, FaPaperclip } from 'react-icons/fa';
import { searchMessages, formatMessage, saveUserPreferences, loadUserPreferences, UserPreferences } from '../utils/chatEnhancements';
import { FaSearch, FaCog, FaReply } from 'react-icons/fa';

interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessage extends BaseMessage {
  category?: 'general' | 'technical' | 'support' | 'sales';
  sentiment?: 'positive' | 'negative' | 'neutral';
  language?: string;
  reactions?: string[];
  attachments?: Array<{
    type: 'image' | 'file';
    url: string;
    name: string;
  }>;
}

interface ThreadedMessage extends ChatMessage {
  parentId?: string;
  id: string;
  replies?: ThreadedMessage[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const attachment = {
          type: file.type.startsWith('image/') ? 'image' : 'file',
          url: event.target?.result as string,
          name: file.name
        };
        
        setMessages(prev => [...prev, {
          text: `Attached: ${file.name}`,
          isBot: false,
          timestamp: new Date(),
          attachments: [attachment]
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addReaction = (messageIndex: number, reaction: string) => {
    setMessages(prev => prev.map((msg, idx) => 
      idx === messageIndex
        ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
        : msg
    ));
  };

  const exportChat = () => {
    const chatHistory = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    
    const blob = new Blob([JSON.stringify(chatHistory, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory();
    if (history.length > 0) {
      setMessages(history);
    }
  }, []);

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages]);

  const generateResponse = (userInput: string) => {
    const context = analyzeContext(messages);
    const input = userInput.toLowerCase();
    const responses = {
      'hello': ['Hi! How can I help you today?', 'Hello! What can I assist you with?', 'Greetings! How may I help you?'],
      'services': {
        'ai': 'We offer cutting-edge AI solutions including machine learning, deep learning, and neural networks.',
        'security': 'Our cybersecurity services include threat detection, prevention, and incident response.',
        'data': 'We provide comprehensive data services including engineering, analytics, and visualization.',
        'general': 'We offer various AI and IT services including AI Solutions, Data Science, Cybersecurity, and IT Infrastructure.'
      },
      'courses': {
        'ai': 'Our AI/ML courses cover deep learning, neural networks, and practical implementations.',
        'security': 'The cybersecurity program includes ethical hacking, security operations, and incident response.',
        'data': 'Data engineering courses cover big data, ETL processes, and data warehousing.',
        'general': 'We provide training in AI/ML, Cybersecurity, Data Engineering, and more. Check our Courses page for details!'
      },
      'price': {
        'courses': 'Course pricing varies by program. Contact us for current rates and available discounts.',
        'services': 'Our service pricing is customized based on project scope and requirements.',
        'general': 'Our pricing varies based on specific requirements. Please contact our team for a detailed quote.'
      },
      'default': 'I understand. Please contact our team for more specific information about your inquiry.'
    };

    // Context-aware response generation
    if (input.includes('services')) {
      if (input.includes('ai')) return responses.services.ai;
      if (input.includes('security')) return responses.services.security;
      if (input.includes('data')) return responses.services.data;
      return responses.services.general;
    }

    if (input.includes('courses')) {
      if (input.includes('ai')) return responses.courses.ai;
      if (input.includes('security')) return responses.courses.security;
      if (input.includes('data')) return responses.courses.data;
      return responses.courses.general;
    }

    if (input.includes('price') || input.includes('cost')) {
      if (input.includes('course')) return responses.price.courses;
      if (input.includes('service')) return responses.price.services;
      return responses.price.general;
    }

    if (input.includes('hello')) {
      return responses.hello[Math.floor(Math.random() * responses.hello.length)];
    }

    return responses.default;
  };

  const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
    const positiveWords = ['great', 'good', 'excellent', 'amazing', 'thanks'];
    const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'issue'];
    
    text = text.toLowerCase();
    const posCount = positiveWords.filter(word => text.includes(word)).length;
    const negCount = negativeWords.filter(word => text.includes(word)).length;
    
    if (posCount > negCount) return 'positive';
    if (negCount > posCount) return 'negative';
    return 'neutral';
  };

  const categorizeMessage = (text: string): ChatMessage['category'] => {
    text = text.toLowerCase();
    if (text.includes('price') || text.includes('cost') || text.includes('buy')) return 'sales';
    if (text.includes('help') || text.includes('support') || text.includes('issue')) return 'support';
    if (text.includes('ai') || text.includes('code') || text.includes('tech')) return 'technical';
    return 'general';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      text: input,
      isBot: false,
      timestamp: new Date(),
      category: categorizeMessage(input),
      sentiment: analyzeSentiment(input),
      language: currentLang
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = generateResponse(input);
      setMessages(prev => [...prev, {
        text: response,
        isBot: true,
        timestamp: new Date(),
        category: 'general',
        sentiment: 'neutral',
        language: currentLang
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (recognition.current) {
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(new Event('submit') as any);
      };

      recognition.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };

  const handleVoiceOutput = (text: string) => {
    speak(text, currentLang);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl z-50"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <FaRobot className="text-blue-600" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-200'}`}
                >
                  <FaMicrophone className={isListening ? 'text-white' : 'text-gray-600'} />
                </button>
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="p-2 rounded-full bg-gray-200"
                >
                  <FaChartBar className="text-gray-600" />
                </button>
              </div>
            </div>

            {showAnalytics ? (
              <div className="p-4">
                <h4 className="font-semibold mb-4">Chat Analytics</h4>
                <div className="space-y-2">
                  {Object.entries(generateAnalytics(messages)).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{JSON.stringify(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}
                    >
                      <div 
                        className={`p-2 rounded-lg max-w-[80%] ${
                          msg.isBot 
                            ? sentimentStyles.neutral.background
                            : sentimentStyles[msg.sentiment || 'neutral'].background
                        }`}
                        onClick={() => msg.isBot && handleVoiceOutput(msg.text)}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={translations[currentLang].placeholder}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;