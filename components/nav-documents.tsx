"use client"

import React from "react"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  IconButton,
  styled,
  type Theme,
} from "@mui/material"
import {
  ExpandLess,
  ExpandMore,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"
import { useState } from "react"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  children?: NavItem[]
  href?: string
}

interface SidebarMenuButtonProps {
  collapsed: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  open?: boolean
}

const SidebarMenuButton = styled(ListItem)(({ theme, collapsed }: { theme?: Theme; collapsed: boolean }) => ({
  padding: theme.spacing(1.5, 2),
  ...(collapsed && {
    padding: theme.spacing(1.5, 1),
  }),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start",
}))

export const NavDocuments: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({})
  const [collapsed, setCollapsed] = useState(false)

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: <HomeIcon />, href: "/" },
    { id: "documents", label: "Documents", icon: <DescriptionIcon />, href: "/documents" },
    {
      id: "projects",
      label: "Projects",
      icon: <FolderIcon />,
      children: [
        { id: "project1", label: "Project 1", icon: <DescriptionIcon />, href: "/projects/1" },
        { id: "project2", label: "Project 2", icon: <DescriptionIcon />, href: "/projects/2" },
      ],
    },
  ]

  const handleClick = (id: string) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpandable = item.children && item.children.length > 0
    const isOpen = !!open[item.id]

    return (
      <React.Fragment key={item.id}>
        <SidebarMenuButton
          button
          key={item.id}
          onClick={isExpandable ? () => handleClick(item.id) : undefined}
          collapsed={collapsed}
          open={isOpen}
          icon={item.icon}
          label={item.label}
        >
          <ListItemIcon sx={{ minWidth: collapsed ? "auto" : 36, mr: collapsed ? 0 : 1 }}>{item.icon}</ListItemIcon>
          {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />}
          {isExpandable && !collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
        </SidebarMenuButton>
        {isExpandable && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => renderNavItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    )
  }

  return (
    <Box sx={{ width: collapsed ? 60 : 240, height: "100vh", bgcolor: "background.paper", overflowX: "hidden" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5 }}>
        {!collapsed && <Typography variant="h6">Navigation</Typography>}
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>
      <List component="nav" aria-label="main mailbox folders">
        {navItems.map((item) => renderNavItem(item))}
      </List>
    </Box>
  )
}
