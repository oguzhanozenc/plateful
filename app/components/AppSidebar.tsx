"use client";

import {
  LayoutDashboard,
  Box,
  Calendar,
  ClipboardList,
  Plus,
  ShoppingCart,
  Settings,
  Menu,
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
  SidebarProvider,
  SidebarTrigger,
} from "@/ui/sidebar";

import Link from "next/link";
import Image from "next/image";

import Title from "@/app/components/Title";

const menuItems = [
  { title: "Dashboard", route: "/", icon: LayoutDashboard },
  { title: "Food Inventory", route: "/inventory", icon: Box },
  { title: "Planner", route: "/planner", icon: Calendar },
  { title: "Recipes", route: "/recipes", icon: ClipboardList },
  { title: "Generate Recipe", route: "/generate-recipe", icon: Plus },
  { title: "Shopping List", route: "/shopping-list", icon: ShoppingCart },
  { title: "Create Recipe", route: "/create-recipe", icon: Plus },
];

export function AppSidebar() {
  return (
    <SidebarProvider>
      <div className="flex-shrink-0 min-h-screen  min-h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="flex items-center justify-between ">
            <SidebarMenu>
              <SidebarMenuItem>
                <div>
                  <SidebarTrigger className="flex justify-self-end items-center">
                    <Menu className="w-5 h-5 text-gray-500" />
                  </SidebarTrigger>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/"
                      className="flex items-center text-black hover:text-black transition-colors"
                    >
                      <div className="flex items-center justify-self-center gap-2">
                        <Image
                          src="/logo-black.png"
                          width={20}
                          height={20}
                          alt="logo"
                        />
                        <Title className="text-xl text-neutral-800 mb-1">
                          Plateful
                        </Title>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="mt-2">
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
      </div>
    </SidebarProvider>
  );
}
