import {
  LayoutDashboard, Package, CalendarDays, Users, Star, Wallet, Store, Settings,
  BadgeCheck, ShieldAlert, CreditCard, BarChart3,
} from "lucide-react";
import type { ReactNode } from "react";
import { WebShell, type NavItem } from "./WebShell";

export const tailorNav: NavItem[] = [
  { to: "/app/tailor/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/tailor/orders", label: "Orders", icon: Package },
  { to: "/app/tailor/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/app/tailor/customers", label: "Customers", icon: Users },
  { to: "/app/tailor/reviews", label: "Reviews", icon: Star },
  { to: "/app/tailor/earnings", label: "Earnings", icon: Wallet },
  { to: "/app/tailor/profile", label: "Profile", icon: Store },
  { to: "/app/tailor/settings", label: "Settings", icon: Settings },
];

export const adminNav: NavItem[] = [
  { to: "/app/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/admin/verification", label: "Tailor Verification", icon: BadgeCheck },
  { to: "/app/admin/users", label: "Users", icon: Users },
  { to: "/app/admin/orders", label: "Orders", icon: Package },
  { to: "/app/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/app/admin/complaints", label: "Complaints", icon: ShieldAlert },
  { to: "/app/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/app/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/admin/settings", label: "Settings", icon: Settings },
];

export function TailorShell({ children }: { children: ReactNode }) {
  return <WebShell items={tailorNav} role="Tailor" workspace="Arjun's Studio">{children}</WebShell>;
}

export function AdminShell({ children }: { children: ReactNode }) {
  return <WebShell items={adminNav} role="Admin" workspace="Stitch HQ">{children}</WebShell>;
}
