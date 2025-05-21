import Link from "next/link"
import type { SidebarMenuButtonProps } from "@/types"

const SidebarMenuButton = ({ item }: SidebarMenuButtonProps) => {
  return (
    <li>
      <Link href={item.url} className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
        {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
        <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
      </Link>
    </li>
  )
}

export default SidebarMenuButton
