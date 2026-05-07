import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useMyCredits } from "@/hooks/useBackend";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ListMusic,
  LogIn,
  LogOut,
  Menu,
  Mic,
  Trophy,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/browse", label: "Browse", icon: ListMusic },
  { to: "/create", label: "Create", icon: Mic },
  { to: "/my-skills", label: "My Skills", icon: Zap },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

function NavLink({
  to,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      data-ocid={`nav.${label.toLowerCase().replace(" ", "-")}.link`}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

export function Layout() {
  const { isLoggedIn, login, logout, isLoading } = useAuth();
  const { data: credits } = useMyCredits();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/browse"
            data-ocid="nav.logo.link"
            className="flex items-center gap-2 font-display font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Mic size={16} className="text-primary-foreground" />
            </span>
            <span>SkillSnap</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                {...link}
                active={pathname.startsWith(link.to)}
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isLoggedIn && credits != null && (
              <Badge
                variant="outline"
                className="hidden sm:flex gap-1 border-primary/30 text-primary"
                data-ocid="nav.credits.badge"
              >
                <Zap size={12} />
                {Number(credits)} credits
              </Badge>
            )}

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    data-ocid="nav.user_menu.button"
                  >
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      data-ocid="nav.profile.link"
                      className="flex items-center gap-2"
                    >
                      <User size={14} /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    data-ocid="nav.logout.button"
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut size={14} className="mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoading}
                data-ocid="nav.login.button"
                className="gap-2"
              >
                <LogIn size={14} />
                {isLoading ? "Signing in…" : "Sign In"}
              </Button>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-ocid="nav.mobile_menu.button"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 pt-8">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      {...link}
                      active={pathname.startsWith(link.to)}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.mobile_profile.link"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                      pathname === "/profile"
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <User size={16} /> Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
