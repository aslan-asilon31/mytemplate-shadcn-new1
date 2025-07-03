import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarGroupLabel,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';

import * as React from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { Link ,usePage} from '@inertiajs/react';
import { 
  Users, 
  ShieldCheck, 
  KeyRound, 
  ChevronDown, 
  HomeIcon 
} from "lucide-react";
import AppLogo from './app-logo';
import useHasAnyPermission from '@/utils/permission';


function isActiveMenu(href: string, url: string) {
  if (href === url) return true;
  return false;
}

export function AppSidebar() {
    const { url } = usePage();
    const { userPermissions } = usePage().props;
    const isKapmbActive = url.startsWith("/dashboard/kapmb");
    const isRoleActive =
      url.startsWith("/dashboard/roles") ||
      url.startsWith("/dashboard/permissions") ||
      url.startsWith("/dashboard/users");

    const [openKapmb, setOpenKapmb] = React.useState(isKapmbActive);
    const [openRole, setOpenRole] = React.useState(isRoleActive);



// A custom hook to check if the user has any of the provided permissions

    React.useEffect(() => {
      setOpenKapmb(isKapmbActive);
      setOpenRole(isRoleActive);
    }, [url, isKapmbActive, isRoleActive]);

    const canViewRoles = useHasAnyPermission(['roles-data']);
    const canViewPermissions = useHasAnyPermission(['permissions-data']);
    const canViewUsers = useHasAnyPermission(['users-data']);
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={isActiveMenu("/dashboard", url) ? 'active' : ''}>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <HomeIcon className="mr-2" />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Render sections based on permissions */}
          {(canViewRoles || canViewPermissions || canViewUsers) && (
            <Collapsible open={openKapmb} onOpenChange={(v) => { setOpenKapmb(v); if (v) setOpenRole(false); }} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Users className="mr-2" />
                    Management Pengguna
                    <ChevronDown className={`ml-auto transition-transform ${openKapmb ? "rotate-180" : ""}`} size={18} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem className={isActiveMenu("/dashboard/roles", url) ? 'active' : ''}>
                      <SidebarMenuSubButton asChild>
                        <Link href="/dashboard/roles">Role</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem className={isActiveMenu("/dashboard/permissions", url) ? 'active' : ''}>
                      <SidebarMenuSubButton asChild>
                        <Link href="/dashboard/permissions">Permission</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem className={isActiveMenu("/dashboard/users", url) ? 'active' : ''}>
                      <SidebarMenuSubButton asChild>
                        <Link href="/dashboard/users">User</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )}
        </SidebarMenu>
      </SidebarGroupContent>

      <SidebarFooter className="mt-auto">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
