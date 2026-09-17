import { GalleryItem, InstagramProfile } from '../types';
import { GALLERY_DATA, INSTAGRAM_PROFILE } from '../data/guuhData';

export interface InstagramFeedResponse {
  profile: InstagramProfile;
  posts: GalleryItem[];
  isLive: boolean;
  lastUpdated: string;
}

export async function fetchInstagramFeed(): Promise<InstagramFeedResponse> {
  try {
    const res = await fetch('/api/instagram', {
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
        return {
          profile: data.user ? {
            username: data.user.username || INSTAGRAM_PROFILE.username,
            fullName: data.user.fullName || INSTAGRAM_PROFILE.fullName,
            biography: data.user.bio || INSTAGRAM_PROFILE.biography,
            followersCount: data.user.followers || INSTAGRAM_PROFILE.followersCount,
            profilePicUrl: INSTAGRAM_PROFILE.profilePicUrl,
            isVerified: true
          } : INSTAGRAM_PROFILE,
          posts: data.posts.slice(0, 6),
          isLive: data.live ?? true,
          lastUpdated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
      }
    }
  } catch {
    // Network or static preview fallback
  }

  // Fallback to verified real cached data
  return {
    profile: INSTAGRAM_PROFILE,
    posts: GALLERY_DATA.slice(0, 6),
    isLive: false,
    lastUpdated: 'Recente'
  };
}
