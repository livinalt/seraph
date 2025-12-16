// src/types/ScamItem.ts
export interface ScamItem {
  _id: string;           // MongoDB ObjectId as string
  name: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  reports: number;
  firstSeen: string;
  screenshot: string;
  communitySafe: number;
  explanation: string;
  logoUrl: string;
}