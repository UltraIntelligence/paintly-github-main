import {
  CalendarDaysIcon,
  Users2Icon,
  MapPinIcon,
  Building2Icon,
  GiftIcon,
  LayoutTemplateIcon,
  HelpCircleIcon,
  SettingsIcon,
} from "lucide-react"

const navMain = [
  {
    title: "Today",
    url: "/today",
    icon: CalendarDaysIcon,
  },
  {
    title: "Schedule",
    url: "#",
    icon: CalendarDaysIcon,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: LayoutTemplateIcon,
  },
]

const navSecondary = [
  {
    title: "Customers",
    url: "#",
    icon: Users2Icon,
  },
  {
    title: "Locations",
    url: "#",
    icon: MapPinIcon,
  },
  {
    title: "Properties",
    url: "#",
    icon: Building2Icon,
  },
  {
    title: "Products",
    url: "#",
    icon: GiftIcon,
  },
]

const navTertiary = [
  {
    title: "Help",
    url: "#",
    icon: HelpCircleIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
]

export function AppSidebar() {
  return (
    <div className="hidden w-[260px] flex-col border-r bg-white py-4 md:flex">
      <div className="flex-1 space-y-2 px-3">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">Main</h2>
          <div className="flex flex-col space-y-1">
            {navMain.map((item) => (
              <NavItem key={item.title} title={item.title} url={item.url} icon={item.icon} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">Secondary</h2>
          <div className="flex flex-col space-y-1">
            {navSecondary.map((item) => (
              <NavItem key={item.title} title={item.title} url={item.url} icon={item.icon} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight">More</h2>
          <div className="flex flex-col space-y-1">
            {navTertiary.map((item) => (
              <NavItem key={item.title} title={item.title} url={item.url} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ title, url, icon: Icon }: { title: string; url: string; icon: any }) {
  return (
    <a href={url} className="group flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-slate-100">
      <Icon className="h-4 w-4 text-slate-400" />
      <span>{title}</span>
    </a>
  )
}
