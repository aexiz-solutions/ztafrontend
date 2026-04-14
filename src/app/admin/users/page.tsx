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

const navItems = [
  {
    label: "New chat",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: "Search",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M19.2 12a7.2 7.2 0 0 0-.09-1.09l1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" />
      </svg>
    ),
  },
  {
    label: "Data Sources",
    href: "/admin/data-sources",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M4 10h16M9 5v14" />
      </svg>
    ),
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 18a6 6 0 0 1 11 0M16 8h5M18.5 5.5v5" />
      </svg>
    ),
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
        <div className={styles.sidebarTop}>
          <button type="button" className={styles.iconButton} aria-label="Collapse sidebar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 5l-8 7 8 7" />
            </svg>
          </button>
          <span className={styles.brand}>zta</span>
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navItem} ${item.label === "Users" ? styles.navItemActive : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Users</h1>
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
