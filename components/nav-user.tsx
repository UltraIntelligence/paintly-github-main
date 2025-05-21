import type React from "react"

interface NavUserProps {
  name: string
  imageUrl: string
}

const NavUser: React.FC<NavUserProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      <img src={imageUrl || "/placeholder.svg"} alt={name} className="h-4 w-4 flex-shrink-0 rounded-full" />
      <span className="truncate group-data-[collapsible=icon]:hidden">{name}</span>
    </div>
  )
}

export default NavUser
