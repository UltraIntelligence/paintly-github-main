import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Home, Calendar, Settings } from "lucide-react"

const NavMain = () => {
  const navigationItems = [
    {
      href: "/",
      title: "Today",
      icon: <Home size={20} />,
    },
    {
      href: "/calendar",
      title: "Calendar",
      icon: <Calendar size={20} />,
    },
    {
      href: "/settings",
      title: "Settings",
      icon: <Settings size={20} />,
    },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <NavigationMenuLink href={item.href}>{item.icon}</NavigationMenuLink>
            </SidebarMenuButton>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMain
