export const messageTemplates = {
  technical: {
    greeting: "I can help you with technical questions about our services.",
    closing: "Let me know if you need more technical details.",
    fallback: "That's an interesting technical question. Let me help you with that."
  },
  support: {
    greeting: "I'm here to help resolve any issues you're experiencing.",
    closing: "Is there anything else you need assistance with?",
    fallback: "I understand you're having an issue. Let me help you solve that."
  },
  sales: {
    greeting: "I can provide information about our pricing and services.",
    closing: "Would you like to speak with our sales team?",
    fallback: "Let me help you find the right solution for your needs."
  }
};

export const sentimentStyles = {
  positive: 'text-green-500',
  neutral: 'text-gray-500',
  negative: 'text-red-500'
};

export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

export const generateAnalytics = (messages: any[]) => {
  return {
    totalMessages: messages.length,
    averageLength: messages.reduce((acc, msg) => acc + msg.content.length, 0) / messages.length,
    sentiment: analyzeSentiment(messages)
  };
};

const analyzeSentiment = (messages: any[]) => {
  // Basic sentiment analysis implementation
  // You might want to use a proper NLP library for production
  return 'neutral';
};

export const initSpeechRecognition = () => {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    return recognition;
  }
  return null;
};

export const speak = (text: string, lang: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
};

export interface ChatAnalytics {
  totalMessages: number;
  userMessages: number;
  botMessages: number;
  averageResponseTime: number;
  popularTopics: Record<string, number>;
  sentimentDistribution: Record<string, number>;
}

export const generateAnalytics = (messages: ChatMessage[]): ChatAnalytics => {
  // Analytics implementation
  const analytics: ChatAnalytics = {
    totalMessages: messages.length,
    userMessages: messages.filter(m => !m.isBot).length,
    botMessages: messages.filter(m => m.isBot).length,
    averageResponseTime: 0,
    popularTopics: {},
    sentimentDistribution: {
      positive: 0,
      negative: 0,
      neutral: 0
    }
  };

  // Calculate response times and collect statistics
  messages.forEach((msg, _index) => {
    if (msg.sentiment) {
      analytics.sentimentDistribution[msg.sentiment]++;
    }
    if (msg.category) {
      analytics.popularTopics[msg.category] = (analytics.popularTopics[msg.category] || 0) + 1;
    }
  });

  return analytics;
};