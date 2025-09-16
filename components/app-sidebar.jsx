"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Clock,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  Notebook,
  PieChart,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  Watch,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  user: {
    name: "Dummy Data",
    email: "dummy@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: Bot,
      items: [],
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: BookOpen,
      items: [],
    },
    {
      title: "Sales",
      url: "/dashboard/sales",
      icon: ShoppingCart,
      items: [],
    },
  ],
  projects: [
    {
      name: "Today Sales",
      url: "#",
      icon: Clock,
    },
    {
      name: "Weekly Sales",
      url: "#",
      icon: Notebook,
    },
    {
      name: "Monthly Sales",
      url: "#",
      icon: Calendar,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && <NavUser user={session.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
