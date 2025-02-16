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
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const menuItems = [
  { title: "Home", route: ROUTES.HOME, icon: Home },
  { title: "Food Inventory", route: ROUTES.INVENTORY, icon: Box },
  {
    title: "Generate Recipes",
    route: ROUTES.GENERATE_RECIPE,
    icon: ClipboardList,
  },
  { title: "Weekly Planner", route: ROUTES.WEEKLY_PLANNER, icon: Calendar },
  { title: "Recipes", route: ROUTES.RECIPES, icon: ClipboardList },
  { title: "Shopping List", route: ROUTES.SHOPPING_LIST, icon: Box },
  { title: "Create Recipe", route: ROUTES.CREATE_RECIPE, icon: Plus },
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
                to="/"
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
                      to={item.route}
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
                to="/settings"
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
