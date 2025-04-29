import { ChatMessage, ChatAttachment, AgentType } from '../types';

// In-memory storage for chat histories (replace with actual database in production)
const chatHistories: Record<string, ChatMessage[]> = {};

// Maximum number of retries for failed requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const chatService = {
  // Save chat history for an agent
  saveChatHistory: (agentId: string, messages: ChatMessage[]) => {
    chatHistories[agentId] = messages;
    // In a real app, this would save to a database
    localStorage.setItem(`chat_history_${agentId}`, JSON.stringify(messages));
  },

  // Load chat history for an agent
  loadChatHistory: (agentId: string): ChatMessage[] => {
    if (chatHistories[agentId]) {
      return chatHistories[agentId];
    }
    
    // Try to load from localStorage
    const savedHistory = localStorage.getItem(`chat_history_${agentId}`);
    if (savedHistory) {
      const messages = JSON.parse(savedHistory).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      chatHistories[agentId] = messages;
      return messages;
    }
    
    return [];
  },

  // Process message with retry logic
  processMessage: async (
    agent: AgentType,
    message: string,
    retryCount = 0
  ): Promise<ChatMessage> => {
    try {
      // Simulate different responses based on agent category
      let response: ChatMessage = {
        id: Date.now().toString(),
        sender: 'agent',
        text: '',
        timestamp: new Date(),
        attachments: []
      };

      switch (agent.category) {
        case 'hr':
          response.text = `As an HR agent, I understand your query: "${message}". Here's my analysis:`;
          response.attachments = [
            {
              type: 'chart',
              data: {
                type: 'bar',
                labels: ['Engineering', 'Marketing', 'Sales', 'Product'],
                values: [92, 88, 82, 78]
              }
            },
            {
              type: 'metric',
              data: {
                title: 'Employee Satisfaction',
                value: 85,
                trend: 'up',
                change: 5
              }
            }
          ];
          break;

        case 'employee':
          response.text = `As an employee support agent, I'll help you with: "${message}". Here's what I found:`;
          response.attachments = [
            {
              type: 'document',
              data: {
                title: 'Employee Handbook',
                content: 'Relevant section from the handbook...'
              }
            }
          ];
          break;

        case 'personal':
          response.text = `As a personal assistant, I'll help you with: "${message}". Here's my suggestion:`;
          response.attachments = [
            {
              type: 'metric',
              data: {
                title: 'Task Priority',
                value: 75,
                trend: 'stable',
                change: 0
              }
            }
          ];
          break;

        default:
          response.text = `I received your message: "${message}". This is a default response.`;
      }

      return response;
    } catch (error) {
      console.error('Error processing message:', error);
      
      if (retryCount < MAX_RETRIES) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return chatService.processMessage(agent, message, retryCount + 1);
      }
      
      throw new Error('Failed to process message after multiple retries');
    }
  }
}; 