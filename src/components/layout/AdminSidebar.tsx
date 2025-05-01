
import { Link, useLocation } from "react-router-dom";
import { Calendar, Settings, LayoutDashboard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

const AdminSidebar = () => {
  const location = useLocation();
  
  // Menu items for admin
  const menuItems = [
    {
      icon: Calendar,
      label: "Agenda",
      path: "/admin/calendar"
    },
    {
      icon: LayoutDashboard,
      label: "Tableau de bord",
      path: "/admin"
    },
    {
      icon: Settings,
      label: "Paramètres",
      path: "/admin/settings"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <div className="flex flex-col items-center space-y-2 px-6">
          <Link to="/">
            <img 
              src="/lovable-uploads/aa748680-a193-4233-a46f-961ae78e353b.png" 
              alt="Pétaouchnock Sports" 
              className="h-12 w-auto"
            />
          </Link>
          <h2 className="text-sm font-semibold text-sidebar-foreground">
            Administration
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild active={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-4 px-6">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <span className="text-xs text-muted-foreground">v1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
