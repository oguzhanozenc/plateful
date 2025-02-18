"use client";

import {
  Home,
  Box,
  Calendar,
  ClipboardList,
  Plus,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { title: "Home", route: "/", icon: Home },
  { title: "Food Inventory", route: "/inventory", icon: Box },
  {
    title: "Generate Recipes",
    route: "/generate-recipe",
    icon: ClipboardList,
  },
  { title: "Weekly Planner", route: "/weekly-planner", icon: Calendar },
  { title: "Recipes", route: "/recipes", icon: ClipboardList },
  { title: "Shopping List", route: "/shopping-list", icon: Box },
  { title: "Create Recipe", route: "/create-recipe", icon: Plus },
];

function PIcon() {
  return <span className="text-xl font-bold text-[#519339]">P</span>;
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className="flex items-center hover-text-[#3c692c] transition-colors"
              >
                <PIcon />
                <span>Plateful</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#2a4621]">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.route}
                      className="flex items-center text-[#2D3E3A] hover:text-[#14250e] transition-colors"
                    >
                      <item.icon className="mr-3 w-5 h-5 text-[#2D3E3A]" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className="flex items-center text-[#2a4621] hover:text-[#14250e] transition-colors"
              >
                <Settings className="mr-3 w-5 h-5 text-[#2D3E3A]" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
