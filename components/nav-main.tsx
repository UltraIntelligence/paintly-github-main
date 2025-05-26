import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarMenuButton } from "@/components/ui/sidebar-menu-button"
import { siteConfig } from "@/config/site"
import Link from "next/link"

interface MainNavProps {
  items?: {
    title: string
    href: string
    disabled?: boolean
  }[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <NavigationMenu>
          <NavigationMenuList>
            {items?.map((item) => {
              if (item.disabled) {
                return null
              }
              return (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuTrigger className="text-sm font-medium capitalize">
                      {item.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent className="sm:hidden">
                    <Link href={item.href} className="block text-sm font-medium capitalize">
                      {item.title}
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>
      ) : null}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="px-0 lg:hidden" aria-label="Open Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.sidebarNav.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </div>
  )
}
