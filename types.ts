export interface ServiceDefinition {
  id: string;
  name: string;
  icon: string;
  code: string;
  description: string;
  estimatedTimePerPerson: number; // in minutes
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Ticket {
  id: string;
  serviceId: string;
  number: string; // e.g., A-005
  date: string; // "YYYY-MM-DD"
  timeSlot: string; // "09:00 - 10:00"
  timestamp: number;
  status: 'booked' | 'completed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 'login' | 'home' | 'booking' | 'ticket' | 'assistant' | 'profile';