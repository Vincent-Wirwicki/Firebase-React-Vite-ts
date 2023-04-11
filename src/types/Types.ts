import { Timestamp } from "firebase/firestore";

export interface PhotoType {
  author: string;
  authorId: string;
  description: string;
  title: string;
  url: string;
  likes: number;
  tags: [];
  createdAt: { nanoseconds: number; seconds: number };
}

export interface DocPhotos {
  id: string;
  data: PhotoType;
}

export interface user {
  bio: string;
  city: string;
  country: string;
  email: string;
  createdAt: Timestamp;
  social: string;
  uid: string;
  userName: string;
}
