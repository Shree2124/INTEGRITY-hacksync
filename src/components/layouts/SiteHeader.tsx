"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Map as MapIcon,
  Camera as CameraIcon,
  Bell as BellIcon,
  User as UserIcon,
  LogOut,
  Building2,
  LayoutDashboard,
} from "lucide-react";
import { User } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  user?: User;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => pathname === path;

  const hasNotifications = true;

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md z-[90] sticky top-0 border-b border-slate-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="bg-blue-600 p-1.5 rounded-lg shrink-0 border border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-none font-serif">
              INTEGRITY
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:block">
              Citizen Audit Portal
            </p>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dashboard Link */}
          <Link href="/dashboard" aria-label="Dashboard">
            <div
              className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                isActive("/dashboard")
                  ? "bg-slate-800 text-white shadow-inner"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="hidden md:inline text-sm font-medium">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Map Link */}
          <Link href="/mapview" aria-label="Map View">
            <div
              className={`p-2 rounded-lg transition-all flex items-center gap-2 ${
                isActive("/mapview")
                  ? "bg-slate-800 text-white shadow-inner"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <MapIcon size={20} />
              <span className="hidden md:inline text-sm font-medium">Map</span>
            </div>
          </Link>

          <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block"></div>

          {/* Alerts Link */}
          <Link href="/alertview" aria-label="Alerts">
            <div
              className={`relative p-2 rounded-lg transition-all duration-300 ${
                isActive("/alertview")
                  ? "bg-slate-800 text-blue-400 shadow-inner"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <BellIcon size={20} />
              {hasNotifications && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-slate-900"></span>
                </span>
              )}
            </div>
          </Link>

          {/* Audit CTA (Highlighted) */}
          <Link href="/createaudit" aria-label="New Audit">
            <div
              className={`ml-1 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all transform active:scale-95 ${
                isActive("/auditview")
                  ? "bg-orange-600 text-white ring-2 ring-orange-400/50"
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              }`}
            >
              <CameraIcon size={18} />
              <span className="hidden sm:inline text-sm font-bold">Audit</span>
            </div>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Profile Menu"
              className={`p-0.5 rounded-full border-2 transition-all ${
                isActive("/profileview")
                  ? "border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  : "border-transparent hover:border-slate-600"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden relative">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={16} className="text-slate-400" />
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-[100]"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-[110]">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user?.email || ""}
                    </p>
                  </div>

                  <Link
                    href="/profileview"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <UserIcon size={16} />
                    View Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut size={16} />
                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
