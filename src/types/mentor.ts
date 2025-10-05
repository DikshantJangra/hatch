
export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  status: 'Available' | 'Busy' | 'Offline';
  expertise: string[];
  rating: number;
  sessionsCompleted: number;
}
