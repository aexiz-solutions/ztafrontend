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
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4", active: true },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
      { label: "Pipeline Monitor", href: "/admin/pipeline-monitor", icon: "M4 19h16M7 16V8M12 16V5M17 16v-6" },
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

export default function ActionTemplatesPage() {
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
        <footer className={styles.sidebarFooter}>
          <div className={styles.footerIdentity}><span className={styles.footerAvatar}>I</span><div><p>IT Head</p><small>vig.b23@zta.ai</small></div></div>
        </footer>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Action Templates</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.head}>
            <div>
              <h1>Action Template Registry</h1>
              <p>Manage, override and toggle workflow action templates</p>
            </div>
            <div className={styles.stats}>
              <article><h3>12</h3><span>Total</span></article>
              <article><h3 className={styles.good}>10</h3><span>Enabled</span></article>
              <article><h3>2</h3><span>Disabled</span></article>
              <article><h3 className={styles.bad}>3</h3><span>High Risk</span></article>
            </div>
          </div>
          <div className={styles.workspace}>
            <article className={styles.listCard}>
              <div className={styles.listHead}>
                <h2>Templates</h2>
                <input placeholder="Search..." />
              </div>
              <ul>
                <li>
                  <div><strong>send_otp_notification</strong><span className={styles.tagLow}>Low</span><span className={styles.tagRev}>Reversible</span></div>
                  <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Enabled</label>
                </li>
                <li className={styles.active}>
                  <div><strong>revoke_session</strong><span className={styles.tagHigh}>High</span><span className={styles.tagIrrev}>Irreversible</span></div>
                  <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Enabled</label>
                </li>
                <li>
                  <div><strong>export_pii_report</strong><span className={styles.tagHigh}>High</span><span className={styles.tagIrrev}>Irreversible</span></div>
                  <label className={styles.switch}><input type="checkbox" /><span /> Disabled</label>
                </li>
                <li>
                  <div><strong>update_enrollment_status</strong><span className={styles.tagMed}>Medium</span><span className={styles.tagRev}>Reversible</span></div>
                  <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Enabled</label>
                </li>
              </ul>
            </article>
            <article className={styles.detailCard}>
              <div className={styles.templateTitle}>
                <h2>revoke_session</h2>
                <span className={styles.tagHigh}>High</span>
                <span className={styles.tagIrrev}>Irreversible</span>
              </div>
              <p className={styles.muted}>Immediately terminates all active sessions for a given user. Requires IT Head approval.</p>
              <div className={styles.schemaGrid}>
                <div>
                  <h4>Input Schema</h4>
                  <pre>{`{\n  "user_id": "string",\n  "reason": "string",\n  "notify_user": boolean\n}`}</pre>
                </div>
                <div>
                  <h4>Output Schema</h4>
                  <pre>{`{\n  "sessions_revoked": integer,\n  "revoked_at": "timestamp"\n}`}</pre>
                </div>
              </div>
              <h4>Allowed Personas</h4>
              <span className={styles.pill}>IT Head</span>
              <h4>Approval Required</h4>
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Yes — manual approval required</label>
              <hr />
              <div className={styles.overrideHead}><h3>Admin Override</h3><span className={styles.tagHigh}>Editable</span></div>
              <label className={styles.muted}>Override Notes</label>
              <textarea defaultValue="Restricted to IT Head persona only. Audit log mandatory on every invocation." />
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Override Enabled</label>
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Action Status</label>
              <div className={styles.footerActions}>
                <button type="button" className={styles.cta}>Update Override</button>
                <button type="button" className={styles.delete}>Delete Override</button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
