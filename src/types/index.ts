export interface LocationCard {
  id: string;
  text: string;
  category: 'near' | 'medium' | 'far' | 'random';
}

export interface ActivityCard {
  id: string;
  text: string;
  category: 'observe' | 'interact' | 'create' | 'consume';
}

export interface WalkSession {
  id: string;
  locationCard: LocationCard;
  activityCard: ActivityCard;
  createdAt: Date;
  completed?: boolean;
  notes?: string;
}