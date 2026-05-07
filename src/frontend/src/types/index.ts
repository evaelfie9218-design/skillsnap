import type { Principal } from "@icp-sdk/core/principal";

export type UserId = Principal;
export type SkillId = string;
export type Timestamp = bigint;

export interface SkillWithMeta {
  skillId: SkillId;
  userId: UserId;
  title: string;
  audioUrl: string;
  category: string;
  tags: string[];
  rating: number;
  durationSeconds: bigint;
  createdAt: Timestamp;
  isUnlocked: boolean;
  creatorName: string;
}

export interface UserProfilePublic {
  userId: UserId;
  name: string;
  credits: bigint;
  rating: number;
  languages: string[];
  creditsEarned: bigint;
  skillCount: bigint;
  createdAt: Timestamp;
}

export interface LeaderboardEntry {
  userId: UserId;
  name: string;
  avgRating: number;
  skillCount: bigint;
  creditsEarned: bigint;
}

export interface SkillFilter {
  category?: string;
  tag?: string;
  search?: string;
}

export enum LeaderboardSort {
  creditsEarned = "creditsEarned",
  skillCount = "skillCount",
  rating = "rating",
}

export type Result<T> =
  | { __kind__: "ok"; ok: T }
  | { __kind__: "err"; err: string };
