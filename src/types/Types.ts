import { Timestamp } from "firebase/firestore";

export interface PhotoDataType {
  authorId: string;
  description: string;
  title: string;
  url: string;
  likes: number;
  tags: string[];
  createdAt: Timestamp;
}

export interface DocPhotosType {
  id: string;
  data: PhotoDataType;
}

export interface UserRefType {
  bio: string;
  city: string;
  country: string;
  email: string;
  createdAt: Timestamp;
  social: string;
  uid: string;
  userName: string;
}
