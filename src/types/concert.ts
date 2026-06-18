export interface Concert {
  id: string;
  city: string;
  venue: string;
  dateText: string;
  status: 'upcoming' | 'live' | 'past' | 'ended';
  posterId: number;
  cornerCount: number;
}

export interface ConcertNews {
  id: string;
  title: string;
  summary: string;
  type: 'weather' | 'shuttle' | 'security' | 'merch' | 'news' | 'ticket' | 'activity';
  typeLabel: string;
  time: string;
}
