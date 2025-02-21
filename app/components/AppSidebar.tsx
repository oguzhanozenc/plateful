"use client";

import {
  LayoutDashboard,
  Box,
  Calendar,
  ClipboardList,
  Plus,
  ShoppingCart,
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
  { title: "Dashboard", route: "/", icon: LayoutDashboard },
  { title: "Food Inventory", route: "/inventory", icon: Box },
  { title: "Planner", route: "/planner", icon: Calendar },
  { title: "Recipes", route: "/recipes", icon: ClipboardList },
  { title: "Shopping List", route: "/shopping-list", icon: ShoppingCart },
  { title: "Create Recipe", route: "/create-recipe", icon: Plus },
];

function PIcon() {
  return <span className="text-xl font-bold text-black">P</span>;
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
                className="flex items-center text-black hover:text-black transition-colors"
              >
                <PIcon />
                <span className="ml-2 font-semibold">Plateful</span>
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
