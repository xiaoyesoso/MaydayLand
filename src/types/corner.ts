export type CornerCategory = 'cafe' | 'bookstore' | 'record' | 'graffiti' | 'venue' | 'newopen' | 'other';

export interface Corner {
  id: string;
  name: string;
  city: string;
  address: string;
  category: CornerCategory;
  categoryLabel: string;
  imageId: number; // picsum.photos id
  lyric: string; // ≤ 30 字
  song: string;
  lyricCredit: string; // 词/曲：作者
  passcode: string;
  recommend: string;
  likes: number;
  notes: number;
  distanceText: string;
  moodTags: string[];
}

export interface Badge {
  id: string;
  song: string;
  city: string;
  unlockedAt: string;
}

export interface CheckinFootprint {
  id: string;
  cornerId: string;
  cornerName: string;
  city: string;
  song: string;
  lyric: string;
  date: string;
  imageId: number;
}

export interface PendingCorner {
  id: string;
  name: string;
  city: string;
  address: string;
  lyric: string;
  song: string;
  passcode: string;
  category: string;
  moodTags: string[];
  recommend: string;
  createdAt: string;
}
