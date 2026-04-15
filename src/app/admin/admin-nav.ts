export type AdminNavItem = {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
};

export type AdminNavGroup = {
  section: string;
  items: AdminNavItem[];
};

const baseGroups: AdminNavGroup[] = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "/admin/access-governance", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Audit Log", href: "/admin/audit-log", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Security Controls", href: "/admin/security-controls", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Compliance Center", href: "/admin/compliance-center", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
      { label: "Pipeline Monitor", href: "/admin/pipeline-monitor", icon: "M4 19h16M7 16V8M12 16V5M17 16v-6" },
      { label: "Roles & Permissions", href: "/admin/users", icon: "M12 3v6M6 6h12M5 13h14M7 21h10" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10" },
      { label: "Integrations", href: "/admin/data-sources", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/admin/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

export function createAdminNav(activeLabel: string) {
  return baseGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      active: item.label === activeLabel,
    })),
  }));
}
