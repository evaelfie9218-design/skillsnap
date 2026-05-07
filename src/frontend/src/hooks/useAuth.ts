import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface UseAuthReturn {
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  identity: Identity | null;
  principal: string | null;
}

export function useAuth(): UseAuthReturn {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isLoggedIn = loginStatus === "success" && identity != null;
  const isLoading = loginStatus === "logging-in";

  const principal =
    isLoggedIn && identity ? identity.getPrincipal().toText() : null;

  return {
    login,
    logout: clear,
    isLoggedIn,
    isLoading,
    identity: identity ?? null,
    principal,
  };
}
