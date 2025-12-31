"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Bot,
  Music,
  CalendarCheck,
  Wallet,
  Wrench,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/ai-business", label: "AI Business", icon: Bot },
  { href: "/music-label", label: "Music Label", icon: Music },
  { href: "/schedule", label: "Daily Schedule", icon: CalendarCheck },
  { href: "/finance", label: "Financials", icon: Wallet },
  { href: "/automations", label: "Automations", icon: Wrench },
  { href: "/grants", label: "SA Grants", icon: Landmark },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="p-2">
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              className={cn(
                "group-data-[collapsible=icon]:justify-center",
                "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90"
              )}
              tooltip={{
                children: item.label,
                className: "bg-primary text-primary-foreground",
              }}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
