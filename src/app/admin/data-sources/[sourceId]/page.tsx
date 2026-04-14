import Link from "next/link";
import styles from "./page.module.css";

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Audit Log", href: "#", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Roles & Permissions", href: "#", icon: "M12 3v6M6 6h12M5 13h14M7 21h10" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14", active: true },
      { label: "Interpreter Config", href: "#", icon: "M12 3v18M7 8h10M7 16h10" },
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

type Props = {
  params: Promise<{ sourceId: string }>;
};

export default async function SourceDetailPage({ params }: Props) {
  const { sourceId } = await params;
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
          <div className={styles.breadcrumb}>Admin / Data Sources / <strong>{sourceId}</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>

        <section className={styles.content}>
          <div className={styles.pageTop}>
            <div>
              <h1>{sourceId}</h1>
              <div className={styles.sourceBadges}>
                <span className={styles.typeBadge}>REST API</span>
                <span className={styles.connectedBadge}>Connected</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.neutralBtn}>Edit</button>
              <button type="button" className={styles.warnBtn}>Disable</button>
            </div>
          </div>

          <div className={styles.tabs}>
            <button type="button" className={styles.tabActive}>Health</button>
            <button type="button">Schema</button>
            <button type="button">Sync History</button>
            <button type="button">Edit Config</button>
          </div>

          <div className={styles.metrics}>
            <article className={styles.metricCard}>
              <p>Connection Status</p>
              <h2 className={styles.green}>Connected</h2>
              <small>Last checked 2 min ago</small>
            </article>
            <article className={styles.metricCard}>
              <p>Last Successful Sync</p>
              <h2>Apr 13, 2026 18:42</h2>
              <small>5 hours ago</small>
            </article>
            <article className={styles.metricCard}>
              <p>Avg Query Latency</p>
              <h2 className={styles.blue}>142 ms</h2>
              <small>p95: 380ms · p99: 610ms</small>
            </article>
          </div>

          <div className={styles.refreshRow}>
            <button type="button" className={styles.refreshBtn}>Refresh Health</button>
            <span className={styles.scopeLabel}>Department scope:</span>
            <span className={styles.scopeChip}>Admissions</span>
            <span className={styles.scopeChip}>Academic Affairs</span>
            <span className={styles.scopeChip}>Student Services</span>
          </div>

          <div className={styles.eventsWrap}>
            <div className={styles.eventsHeader}>
              <h3>Recent Health Events</h3>
              <button type="button">View all</button>
            </div>
            <table className={styles.eventsTable}>
              <tbody>
                <tr>
                  <td>2026-04-13 18:42:05</td>
                  <td><span className={`${styles.eventType} ${styles.success}`}>SYNC_SUCCESS</span></td>
                  <td>Full sync completed — 4,328 records processed</td>
                </tr>
                <tr>
                  <td>2026-04-13 12:05:11</td>
                  <td><span className={`${styles.eventType} ${styles.warn}`}>LATENCY_SPIKE</span></td>
                  <td>Query latency exceeded 500ms threshold for 3 minutes</td>
                </tr>
                <tr>
                  <td>2026-04-12 09:14:33</td>
                  <td><span className={`${styles.eventType} ${styles.info}`}>CONN_RESTORED</span></td>
                  <td>Connection restored after 4m 12s downtime</td>
                </tr>
                <tr>
                  <td>2026-04-12 09:10:21</td>
                  <td><span className={`${styles.eventType} ${styles.error}`}>CONN_ERROR</span></td>
                  <td>TCP connection refused — host unreachable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
