import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
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
      <AdminSidebar activeLabel="Users" />

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
