import { createActor } from "@/backend";
import type {
  LeaderboardEntry,
  SkillFilter,
  SkillWithMeta,
  UserProfilePublic,
} from "@/types";
import { LeaderboardSort } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useBackendActor() {
  return useActor(createActor);
}

export function useMyProfile() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<UserProfilePublic | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMyCredits() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<bigint>({
    queryKey: ["myCredits"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getMyCredits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListSkills(filter: SkillFilter = {}) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SkillWithMeta[]>({
    queryKey: ["skills", filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSkills(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSkill(skillId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SkillWithMeta | null>({
    queryKey: ["skill", skillId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSkill(skillId);
    },
    enabled: !!actor && !isFetching && !!skillId,
  });
}

export function useMySkills() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SkillWithMeta[]>({
    queryKey: ["mySkills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySkills();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLeaderboard(
  sortBy: LeaderboardSort = LeaderboardSort.rating,
  limit = 20,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard", sortBy, limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLeaderboard(sortBy, BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateSkill() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: {
      title: string;
      audioUrl: string;
      category: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.createSkill(
        vars.title,
        vars.audioUrl,
        vars.category,
        vars.tags,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      qc.invalidateQueries({ queryKey: ["mySkills"] });
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useUnlockSkill() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skillId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.unlockSkill(skillId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skills"] });
      qc.invalidateQueries({ queryKey: ["skill"] });
      qc.invalidateQueries({ queryKey: ["myCredits"] });
    },
  });
}

export function useRateSkill() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { skillId: string; rating: number }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.rateSkill(vars.skillId, BigInt(vars.rating));
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["skill", vars.skillId] });
      qc.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}

export function useSaveMyProfile() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { name: string; languages: string[] }) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveMyProfile(vars.name, vars.languages);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}
