export interface ChatMessage {
  text: string;
  category?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  language: string;
}

export const searchMessages = (messages: ChatMessage[], query: string) => {
  const searchTerm = query.toLowerCase();
  return messages.filter(msg => 
    msg.text.toLowerCase().includes(searchTerm) ||
    msg.category?.toLowerCase().includes(searchTerm)
  );
};

export const formatMessage = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
};

export const saveUserPreferences = (prefs: UserPreferences) => {
  localStorage.setItem('chat_preferences', JSON.stringify(prefs));
};

export const loadUserPreferences = (): UserPreferences => {
  const defaults: UserPreferences = {
    theme: 'light',
    fontSize: 'medium',
    notifications: true,
    language: 'en'
  };
  
  const stored = localStorage.getItem('chat_preferences');
  return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
};