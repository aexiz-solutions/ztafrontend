import Link from "next/link";
import styles from "./page.module.css";

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10", active: true },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

type Props = {
  searchParams?: Promise<{ modal?: "approve" | "rollback" }>;
};

export default async function ExecutionCenterPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const showApprove = params?.modal === "approve";
  const showRollback = params?.modal === "rollback";
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.adminBrand}>
          <span className={styles.brandShield}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" /></svg></span>
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
          <div className={styles.breadcrumb}>Admin / <strong>Execution Center</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.grid}>
            <article className={styles.col}>
              <h2>Execute Action</h2>
              <label className={styles.label}>Select Action</label>
              <input defaultValue="revoke_session" />
              <div className={styles.templateList}>
                <button type="button" className={styles.activeRow}>revoke_session</button>
                <button type="button">send_otp_notification</button>
                <button type="button">update_enrollment_status</button>
                <button type="button">export_pii_report</button>
              </div>
              <div className={styles.chipRow}><span className={styles.high}>High</span><span className={styles.irrev}>Irreversible</span></div>
              <div className={styles.warn}>Approval Required — this action will be queued for IT Head approval.</div>
              <label className={styles.label}>Input Fields</label>
              <input defaultValue="usr_482fa19fc3" />
              <input defaultValue="Suspicious login from unrecognized device" />
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> notify_user</label>
              <button type="button" className={styles.cta}>Execute Action</button>
            </article>

            <article className={styles.col}>
              <h2>Executions</h2>
              <div className={styles.tabs}><span className={styles.tabActive}>All</span><span>Pending</span><span>Running</span><span>Completed</span><span>Failed</span><span>Rolled Back</span></div>
              <ul className={styles.execList}>
                <li><strong>send_otp_notification</strong><span className={styles.done}>Completed</span></li>
                <li><strong>update_enrollment_status</strong><span className={styles.run}>Running</span></li>
                <li><strong>revoke_session</strong><span className={styles.fail}>Failed</span></li>
                <li><strong>export_pii_report</strong><span className={styles.rollback}>Rolled Back</span></li>
              </ul>
            </article>

            <article className={styles.col}>
              <h2>EXC-e842 <span className={styles.pending}>Pending Approval</span></h2>
              <p className={styles.muted}>Triggered by IT Head · 2 min ago</p>
              <div className={styles.timeline}>
                <p>Submitted</p><p>Validation passed</p><p>Queued for approval</p><p>Awaiting approval</p>
              </div>
              <div className={styles.events}>23:58:06 EXECUTION_QUEUED · IT Head<br />23:58:04 EXECUTION_SUBMITTED · IT Head</div>
              <div className={styles.actions}>
                <Link href="/admin/execution-center?modal=approve" className={styles.goodBtn}>Approve</Link>
                <Link href="/admin/execution-center?modal=rollback" className={styles.rollbackBtn}>Rollback</Link>
                <button type="button" className={styles.neutral}>Escalations</button>
              </div>
            </article>
          </div>
        </section>
      </main>
      {showApprove ? (
        <>
          <Link href="/admin/execution-center" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Approve Execution</h3>
            <p className={styles.muted}>This action is irreversible. All active sessions for this user will be immediately terminated.</p>
            <input placeholder="Approval note (optional)" />
            <div className={styles.modalActions}>
              <Link href="/admin/execution-center" className={styles.neutral}>Cancel</Link>
              <button type="button" className={styles.goodBtn}>Approve Execution</button>
            </div>
          </div>
        </>
      ) : null}
      {showRollback ? (
        <>
          <Link href="/admin/execution-center" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Rollback Execution</h3>
            <p className={styles.warn}>This action cannot be undone. Rollback will attempt to restore the previous state.</p>
            <input placeholder="Provide detailed reason for rollback..." />
            <div className={styles.modalActions}>
              <Link href="/admin/execution-center" className={styles.neutral}>Cancel</Link>
              <button type="button" className={styles.rollbackBtn}>Confirm Rollback</button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
