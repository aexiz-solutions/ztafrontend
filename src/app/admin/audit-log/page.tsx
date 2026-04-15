import Link from "next/link";
import styles from "./page.module.css";

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Audit Log", href: "/admin/audit-log", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4", active: true },
      { label: "Security Controls", href: "/admin/security-controls", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Compliance Center", href: "/admin/compliance-center", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
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

type Props = {
  searchParams?: Promise<{
    frame?: string;
  }>;
};

export default async function AuditLogPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const showDashboard = resolvedSearchParams?.frame === "dashboard";
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
                <Link key={item.label} href={item.href} className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}>
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
          <div className={styles.breadcrumb}>Admin / <strong>Audit Log</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>

        {!showDashboard ? (
          <section className={styles.content}>
            <div className={styles.pageTop}>
              <h1>Audit Log</h1>
              <div className={styles.topActions}>
                <button type="button" className={styles.primaryBtn}>Apply Filters</button>
                <button type="button" className={styles.neutralBtn}>Export</button>
                <Link href="/admin/audit-log?frame=dashboard" className={styles.neutralBtn}>Open Dashboard</Link>
              </div>
            </div>

            <div className={styles.filterBar}>
              <input placeholder="Search user..." />
              <select defaultValue="All departments">
                <option>All departments</option>
                <option>Admissions</option>
                <option>Finance</option>
                <option>Library</option>
              </select>
              <input type="date" />
              <input type="date" />
              <button type="button" className={styles.blockedToggle}>Blocked only</button>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Query Text</th>
                    <th>Intent Hash</th>
                    <th>Domains Accessed</th>
                    <th>Blocked</th>
                    <th>Block Reason</th>
                    <th className={styles.right}>Latency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.mono}>2026-04-14 22:12:45</td>
                    <td>Riya Sharma <span className={`${styles.chip} ${styles.persona}`}>Student</span></td>
                    <td className={styles.query}>Show my pending fee details for semester 6...</td>
                    <td className={styles.mono}>A3F90C2D</td>
                    <td><span className={styles.pill}>Finance</span><span className={styles.pill}>Admissions</span></td>
                    <td />
                    <td />
                    <td className={styles.right}>224ms</td>
                  </tr>
                  <tr className={styles.blockedRow}>
                    <td className={styles.mono}>2026-04-14 22:10:01</td>
                    <td>Karan Mehta <span className={`${styles.chip} ${styles.persona}`}>Faculty</span></td>
                    <td className={styles.query}>Dump all student PII including phone and address...</td>
                    <td className={styles.mono}>F0B11E44</td>
                    <td><span className={styles.pill}>Admissions</span></td>
                    <td><span className={`${styles.chip} ${styles.blocked}`}>Blocked</span></td>
                    <td className={styles.muted}>PII policy violation</td>
                    <td className={styles.right}>118ms</td>
                  </tr>
                  <tr className={styles.expanded}>
                    <td colSpan={8}>
                      <strong>Full query:</strong> Dump all student PII including phone and address by department.
                      <br />
                      <span className={styles.muted}>Response summary: Request blocked by policy engine due to restricted fields.</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.mono}>2026-04-14 21:54:13</td>
                    <td>Aditi Nair <span className={`${styles.chip} ${styles.persona}`}>Dept Head</span></td>
                    <td className={styles.query}>Give timetable overlap report for CSE section B...</td>
                    <td className={styles.mono}>11BD92A1</td>
                    <td><span className={styles.pill}>Academics</span></td>
                    <td />
                    <td />
                    <td className={styles.right}>341ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.pagination}>
              <span>Showing 1–50</span>
              <div>
                <button type="button" className={styles.neutralBtn}>Prev</button>
                <button type="button" className={styles.neutralBtn}>Next</button>
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.content}>
            <div className={styles.pageTop}>
              <h1>Audit Dashboard</h1>
              <Link href="/admin/audit-log" className={styles.neutralBtn}>Open Explorer</Link>
            </div>
            <div className={styles.kpis}>
              <article className={styles.kpi}><p>Total Queries</p><h2>24,680</h2></article>
              <article className={styles.kpi}><p>Blocked Queries</p><h2>1,243</h2></article>
              <article className={styles.kpi}><p>Unique Users</p><h2>892</h2></article>
              <article className={styles.kpi}><p>Avg Latency</p><h2>286ms</h2></article>
            </div>
            <div className={styles.chart}>
              <h3>Daily Query Volume</h3>
              <div className={styles.chartMock}>
                <div className={styles.coralLine} />
                <div className={styles.redArea} />
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Intent Hash</th><th>Count</th><th>Last Seen</th></tr>
                </thead>
                <tbody>
                  <tr><td className={styles.mono}>A3F90C2D</td><td>2,140</td><td>2 mins ago</td></tr>
                  <tr><td className={styles.mono}>11BD92A1</td><td>1,872</td><td>5 mins ago</td></tr>
                  <tr><td className={styles.mono}>F0B11E44</td><td>1,043</td><td>7 mins ago</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
