export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category?: string;
  duration: string;
  year: string;
  producer?: string;
  description: string;
  thumbnail: string;
  viewsBadge?: string;
  publishedText?: string;
}

export interface TrackItem {
  id: string;
  title: string;
  featuring?: string;
  producer: string;
  duration: string;
  year: string;
  coverImage: string;
  spotifyUrl: string;
  youtubeUrl: string;
  audioPreviewUrl?: string;
  highlight?: boolean;
  bpm?: number;
}

export interface GalleryItem {
  id: string;
  type: 'instagram' | 'show' | 'bastidores' | 'ensaio';
  imageUrl: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  likes: number;
  commentsCount: number;
  platformUrl: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  tags: string[];
  shortcode?: string;
  embedUrl?: string;
  isVideo?: boolean;
  timestamp?: number;
}

export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  followersCount: number;
  profilePicUrl?: string;
  isVerified?: boolean;
}

export interface ShowItem {
  id: string;
  title: string;
  location: string;
  city: string;
  status: 'realizado' | 'confirmado' | 'agenda-aberta';
  date?: string;
  description?: string;
}
