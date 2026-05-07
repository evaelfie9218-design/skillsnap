import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaderboardEntry {
    creditsEarned: bigint;
    userId: UserId;
    name: string;
    skillCount: bigint;
    avgRating: number;
}
export type Timestamp = bigint;
export interface SkillWithMeta {
    title: string;
    skillId: SkillId;
    userId: UserId;
    createdAt: Timestamp;
    tags: Array<string>;
    audioUrl: string;
    creatorName: string;
    durationSeconds: bigint;
    category: string;
    rating: number;
    isUnlocked: boolean;
}
export type SkillId = string;
export type Result_1 = {
    __kind__: "ok";
    ok: SkillId;
} | {
    __kind__: "err";
    err: string;
};
export interface UserProfilePublic {
    creditsEarned: bigint;
    credits: bigint;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    languages: Array<string>;
    skillCount: bigint;
    rating: number;
}
export type UserId = Principal;
export interface SkillFilter {
    tag?: string;
    search?: string;
    category?: string;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export enum LeaderboardSort {
    creditsEarned = "creditsEarned",
    skillCount = "skillCount",
    rating = "rating"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createSkill(title: string, audioUrl: string, category: string, tags: Array<string>): Promise<Result_1>;
    getCallerUserProfile(): Promise<UserProfilePublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLeaderboard(sortBy: LeaderboardSort, limit: bigint): Promise<Array<LeaderboardEntry>>;
    getMyCredits(): Promise<bigint>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getMySkills(): Promise<Array<SkillWithMeta>>;
    getSkill(skillId: SkillId): Promise<SkillWithMeta | null>;
    getSkillRating(skillId: SkillId): Promise<number>;
    getUserProfile(userId: UserId): Promise<UserProfilePublic | null>;
    isCallerAdmin(): Promise<boolean>;
    isUnlocked(skillId: SkillId): Promise<boolean>;
    listSkills(filter: SkillFilter): Promise<Array<SkillWithMeta>>;
    rateSkill(skillId: SkillId, rating: bigint): Promise<Result>;
    saveCallerUserProfile(name: string): Promise<void>;
    saveMyProfile(name: string, languages: Array<string>): Promise<void>;
    unlockSkill(skillId: SkillId): Promise<Result>;
}
