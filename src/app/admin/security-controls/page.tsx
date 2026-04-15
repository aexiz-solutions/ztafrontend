import Link from "next/link";
import styles from "./page.module.css";

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Audit Log", href: "/admin/audit-log", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Security Controls", href: "/admin/security-controls", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z", active: true },
      { label: "Compliance Center", href: "/admin/compliance-center", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
      { label: "Pipeline Monitor", href: "/admin/pipeline-monitor", icon: "M4 19h16M7 16V8M12 16V5M17 16v-6" },
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
    frame?: "idle" | "kill-modal" | "kill-success" | "cache-modal";
  }>;
};

export default async function SecurityControlsPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const frame = params?.frame ?? "idle";
  const showKillModal = frame === "kill-modal";
  const showKillSuccess = frame === "kill-success";
  const showCacheModal = frame === "cache-modal";

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.adminBrand}>
          <span className={styles.brandShield}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" /></svg>
          </span>
          <span className={styles.brandText}>ZTA Admin</span>
        </div>
        {adminNav.map((group) => (
          <section key={group.section} className={styles.navGroup}>
            <p className={styles.groupTitle}>{group.section}</p>
            <nav className={styles.nav}>
              {group.items.map((item) => (
                <Link key={item.label} href={item.href} className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}>
                  <span className={styles.navIcon}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg></span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              ))}
            </nav>
          </section>
        ))}
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Security Controls</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.cards}>
            <article className={styles.card}>
              <h2>Revoke Active Sessions</h2>
              <div className={styles.radioStack}>
                <label><input type="radio" name="scope" defaultChecked /> All active sessions</label>
                <label><input type="radio" name="scope" /> Department</label>
                <select defaultValue="Admissions"><option>Admissions</option><option>Finance</option></select>
                <label><input type="radio" name="scope" /> Specific user</label>
                <input placeholder="Search user..." />
              </div>
              <div className={styles.warnBanner}>This will immediately sign out all matched users.</div>
              {showKillSuccess ? (
                <div className={styles.successBanner}>Revoked 184 sessions successfully · 2026-04-14 23:17 · Ref: AUD-SEC-4201</div>
              ) : (
                <Link href="/admin/security-controls?frame=kill-modal" className={styles.revokeBtn}>Revoke Sessions</Link>
              )}
            </article>

            <article className={styles.card}>
              <h2>Clear Intent Cache</h2>
              <p className={styles.desc}>Clears cached query templates. Users will see slightly higher latency until cache warms up.</p>
              <p className={styles.muted}>Estimated warm-up time: ~15 minutes for 1,240 cached intents</p>
              <Link href="/admin/security-controls?frame=cache-modal" className={styles.cacheBtn}>Clear Cache</Link>
              {frame === "idle" ? null : <p className={styles.muted}>Cache cleared at 2026-04-14 23:06</p>}
            </article>
          </div>

          <article className={styles.logCard}>
            <h3>Recent Security Actions</h3>
            <table className={styles.table}>
              <thead><tr><th>Action Type</th><th>Performed By</th><th>Scope</th><th>Timestamp</th></tr></thead>
              <tbody>
                <tr><td>Revoke Sessions</td><td>IT Head</td><td>All active sessions</td><td>2026-04-14 23:17</td></tr>
                <tr><td>Clear Cache</td><td>IT Head</td><td>Intent cache</td><td>2026-04-14 23:06</td></tr>
                <tr><td>Revoke Sessions</td><td>IT Head</td><td>Dept: Finance</td><td>2026-04-14 18:42</td></tr>
                <tr><td>Clear Cache</td><td>IT Head</td><td>Intent cache</td><td>2026-04-13 14:03</td></tr>
                <tr><td>Revoke Sessions</td><td>IT Head</td><td>User: a.nair</td><td>2026-04-12 11:27</td></tr>
              </tbody>
            </table>
          </article>
        </section>
      </main>
      {showKillModal ? (
        <>
          <Link href="/admin/security-controls" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>You are about to revoke sessions for All active sessions.</h3>
            <p>This cannot be undone. Type REVOKE to confirm.</p>
            <input defaultValue="REVOKE" />
            <div className={styles.modalActions}>
              <Link href="/admin/security-controls" className={styles.neutralBtn}>Cancel</Link>
              <Link href="/admin/security-controls?frame=kill-success" className={styles.revokeBtn}>Confirm Revoke</Link>
            </div>
          </div>
        </>
      ) : null}
      {showCacheModal ? (
        <>
          <Link href="/admin/security-controls" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Clear the intent cache?</h3>
            <div className={styles.modalActions}>
              <Link href="/admin/security-controls" className={styles.neutralBtn}>Cancel</Link>
              <Link href="/admin/security-controls" className={styles.cacheBtn}>Confirm</Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
