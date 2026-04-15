import Link from "next/link";
import styles from "./page.module.css";

type Persona =
  | "Student"
  | "Faculty"
  | "Dept Head"
  | "Admin Staff"
  | "Executive"
  | "IT Head";

type UserRow = {
  id: string;
  name: string;
  email: string;
  persona: Persona;
  department: string;
  status: "Active" | "Inactive";
  lastLogin: string;
  showEdit?: boolean;
};

const users: UserRow[] = [
  {
    id: "u-1001",
    name: "Arjun Menon",
    email: "arjun.menon@zta.ai",
    persona: "Student",
    department: "Computer Science",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: "u-1002",
    name: "Dr. Riya Sen",
    email: "riya.sen@zta.ai",
    persona: "Faculty",
    department: "Data Science",
    status: "Active",
    lastLogin: "Yesterday",
    showEdit: true,
  },
  {
    id: "u-1003",
    name: "Rahul Iyer",
    email: "rahul.iyer@zta.ai",
    persona: "Dept Head",
    department: "Mechanical",
    status: "Inactive",
    lastLogin: "4 days ago",
  },
  {
    id: "u-1004",
    name: "Neha Kapoor",
    email: "neha.kapoor@zta.ai",
    persona: "Admin Staff",
    department: "Academic Ops",
    status: "Active",
    lastLogin: "1 hour ago",
  },
  {
    id: "u-1005",
    name: "Vikram Rao",
    email: "vikram.rao@zta.ai",
    persona: "IT Head",
    department: "IT Services",
    status: "Active",
    lastLogin: "just now",
  },
];

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5", active: true },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Audit Log", href: "/admin/audit-log", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Security Controls", href: "/admin/security-controls", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Compliance Center", href: "/admin/compliance-center", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
      { label: "Pipeline Monitor", href: "/admin/pipeline-monitor", icon: "M4 19h16M7 16V8M12 16V5M17 16v-6" },
      { label: "Roles & Permissions", href: "#", icon: "M12 3v6M6 6h12M5 13h14M7 21h10" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10" },
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

function personaClass(persona: Persona) {
  return `persona${persona.replace(" ", "")}`;
}

type Props = {
  searchParams?: Promise<{ frame?: string }>;
};

export default async function UsersPage({ searchParams }: Props) {
  const params = (await searchParams) ?? {};
  const isDrawerOpen = params.frame === "edit";
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.adminBrand}>
          <span className={styles.brandShield}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" />
            </svg>
          </span>
          <span className={styles.brandText}>ZTA Admin</span>
        </div>

        {adminNav.map((group) => (
          <section key={group.section} className={styles.navGroup}>
            <p className={styles.groupTitle}>{group.section}</p>
            <nav className={styles.nav} aria-label={`${group.section} navigation`}>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
                >
                  <span className={styles.navIcon}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              ))}
            </nav>
          </section>
        ))}

        <footer className={styles.sidebarFooter}>
          <div className={styles.footerIdentity}>
            <span className={styles.footerAvatar}>I</span>
            <div>
              <p>IT Head</p>
              <small>vig.b23@zta.ai</small>
            </div>
          </div>
        </footer>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Users</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>

        <section className={styles.content}>
          <div className={styles.filterBar}>
            <input type="text" placeholder="Search by name or email" className={styles.filterInput} />
            <select className={styles.filterSelect} defaultValue="All">
              <option>All</option>
              <option>Student</option>
              <option>Faculty</option>
              <option>Dept Head</option>
              <option>Admin Staff</option>
              <option>Executive</option>
              <option>IT Head</option>
            </select>
            <select className={styles.filterSelect}>
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Data Science</option>
              <option>Mechanical</option>
              <option>Academic Ops</option>
              <option>IT Services</option>
            </select>
            <div className={styles.statusToggle}>
              <button type="button" className={styles.toggleActive}>
                Active
              </button>
              <button type="button">Inactive</button>
            </div>
            <button type="button" className={styles.applyButton}>
              Apply Filters
            </button>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Persona</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={user.showEdit ? styles.showEdit : ""}>
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.avatar}>{user.name[0]}</span>
                        <span className={styles.nameText}>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[personaClass(user.persona)]}`}>
                        {user.persona}
                      </span>
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <span className={`${styles.badge} ${user.status === "Active" ? styles.statusActive : styles.statusInactive}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className={styles.editAction}>
                        <Link href="/admin/users?frame=edit" aria-label="Edit user">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button type="button">Prev</button>
            <span>Showing 1–25, load more</span>
            <button type="button">Next</button>
          </div>
        </section>

        {isDrawerOpen ? (
          <div className={styles.drawerLayer}>
            <div className={styles.overlay} />
            <aside className={styles.drawer}>
              <header className={styles.drawerHeader}>
                <h2>Edit User</h2>
                <Link href="/admin/users" className={styles.closeLink}>
                  Close
                </Link>
              </header>
              <div className={styles.drawerBody}>
                <label>
                  Name
                  <input value="Neha Kapoor" readOnly />
                </label>
                <label>
                  Email
                  <input value="neha.kapoor@zta.ai" readOnly />
                </label>
                <label>
                  Persona
                  <select defaultValue="Admin Staff">
                    <option>Student</option>
                    <option>Faculty</option>
                    <option>Dept Head</option>
                    <option>Admin Staff</option>
                    <option>Executive</option>
                    <option>IT Head</option>
                  </select>
                </label>
                <label>
                  Department
                  <input defaultValue="Academic Ops" />
                </label>
                <label>
                  Status
                  <div className={styles.statusToggle}>
                    <button type="button" className={styles.toggleActive}>
                      Active
                    </button>
                    <button type="button">Inactive</button>
                  </div>
                </label>
                <label>
                  Admin Function
                  <input defaultValue="Policy Management" />
                </label>
              </div>
              <footer className={styles.drawerFooter}>
                <button type="button" className={styles.saveButton}>
                  Save User
                </button>
                <Link href="/admin/users" className={styles.cancelLink}>
                  Cancel
                </Link>
              </footer>
            </aside>
          </div>
        ) : null}
      </main>
    </div>
  );
}
