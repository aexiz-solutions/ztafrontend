import Link from "next/link";
import { Fragment } from "react";
import styles from "./page.module.css";

type Source = {
  id: string;
  name: string;
  type: "ERPNext" | "PostgreSQL" | "MySQL" | "Google Sheets" | "Google Drive";
  readiness: "Ready" | "Incomplete" | "Error";
  ingested: "Yes" | "No";
  domains: string[];
  status: "Connected" | "Disconnected" | "Error" | "Paused";
  lastSync: string;
  error?: string;
  showActions?: boolean;
};

const sources: Source[] = [
  {
    id: "finance-erpnext",
    name: "Finance ERP",
    type: "ERPNext",
    readiness: "Ready",
    ingested: "Yes",
    domains: ["Finance", "Audit"],
    status: "Connected",
    lastSync: "2 hours ago",
    showActions: true,
  },
  {
    id: "hr-postgres",
    name: "HR Core DB",
    type: "PostgreSQL",
    readiness: "Incomplete",
    ingested: "No",
    domains: ["HR", "PeopleOps"],
    status: "Paused",
    lastSync: "5 days ago",
  },
  {
    id: "sales-sheet",
    name: "Sales Ops Sheet",
    type: "Google Sheets",
    readiness: "Ready",
    ingested: "Yes",
    domains: ["Sales", "Forecasting"],
    status: "Disconnected",
    lastSync: "30 minutes ago",
  },
  {
    id: "drive-contracts",
    name: "Contracts Drive",
    type: "Google Drive",
    readiness: "Error",
    ingested: "No",
    domains: ["Legal", "Compliance"],
    status: "Error",
    lastSync: "just now",
    error: "OAuth token expired. Reconnect source and re-run health check.",
  },
];

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
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
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14", active: true },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10" },
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

function ActionIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function DataSourcesPage() {
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
          <div className={styles.breadcrumb}>Admin / <strong>Data Sources</strong></div>
          <div className={styles.headerUser}>IT Head</div>
          <button type="button" className={styles.createButton}>
            Create Source
          </button>
        </header>

        <section className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Readiness</th>
                <th>Graph Ingested</th>
                <th>Binding Domains</th>
                <th>Status</th>
                <th>Last Sync</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <Fragment key={source.id}>
                  <tr
                    className={`${source.status === "Error" ? styles.rowError : ""} ${source.showActions ? styles.showActions : ""}`}
                  >
                    <td>
                      <Link href={`/admin/data-sources/${source.id}`} className={styles.nameLink}>
                        {source.name}
                      </Link>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`type${source.type.replace(" ", "")}`]}`}>
                        {source.type}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`ready${source.readiness}`]}`}>
                        {source.readiness}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`ingest${source.ingested}`]}`}>
                        {source.ingested}
                      </span>
                    </td>
                    <td>
                      <div className={styles.pills}>
                        {source.domains.map((domain) => (
                          <span key={domain} className={styles.pill}>
                            {domain}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`status${source.status}`]}`}>
                        {source.status}
                      </span>
                    </td>
                    <td>{source.lastSync}</td>
                    <td>
                      <div className={styles.actions}>
                        <button type="button" aria-label="Edit">
                          <ActionIcon d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                        </button>
                        <button type="button" aria-label="Test">
                          <ActionIcon d="M9 3v7a3 3 0 0 0 6 0V6h3v4a6 6 0 0 1-12 0V3z" />
                        </button>
                        <button type="button" aria-label="Health">
                          <ActionIcon d="M12 20s-7-4.7-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.3-7 10-7 10Z" />
                        </button>
                        <button type="button" aria-label="Sync">
                          <ActionIcon d="M20 7v5h-5M4 17v-5h5M6 9a7 7 0 0 1 12-2M18 15a7 7 0 0 1-12 2" />
                        </button>
                        <button type="button" aria-label="Resync">
                          <ActionIcon d="M21 8v4h-4M17 4v4h-4M3 16v-4h4M7 20v-4h4" />
                        </button>
                        <button type="button" aria-label="Enable or disable">
                          <ActionIcon d="M4 12a8 8 0 0 0 16 0 8 8 0 1 0-16 0Zm8-5v10" />
                        </button>
                        <button type="button" aria-label="Schema">
                          <ActionIcon d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
                        </button>
                        <button type="button" aria-label="History">
                          <ActionIcon d="M12 6v6l4 2M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {source.error ? (
                    <tr>
                      <td colSpan={8} className={styles.errorCell}>
                        <details className={styles.errorDetails} open>
                          <summary>Source error details</summary>
                          <p>{source.error}</p>
                        </details>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
