import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const BrowsePage = lazy(() => import("@/pages/BrowsePage"));
const CreatePage = lazy(() => import("@/pages/CreatePage"));
const MySkillsPage = lazy(() => import("@/pages/MySkillsPage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));

const PageLoader = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {["a", "b", "c", "d", "e", "f"].map((k) => (
        <Skeleton key={k} className="h-40 rounded-xl" />
      ))}
    </div>
  </div>
);

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/browse" });
  },
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BrowsePage />
    </Suspense>
  ),
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CreatePage />
    </Suspense>
  ),
});

const mySkillsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-skills",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MySkillsPage />
    </Suspense>
  ),
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LeaderboardPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  browseRoute,
  createRoute_,
  mySkillsRoute,
  leaderboardRoute,
  profileRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
