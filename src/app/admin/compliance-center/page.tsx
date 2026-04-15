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
      { label: "Security Controls", href: "/admin/security-controls", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Compliance Center", href: "/admin/compliance-center", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5", active: true },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
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
    tab?: "summary" | "forensic-export" | "retention" | "cases";
    frame?: "list" | "detail";
    modal?: "legal-hold";
  }>;
};

export default async function ComplianceCenterPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const tab = params?.tab ?? "summary";
  const frame = params?.frame ?? "list";
  const showCaseDetail = tab === "cases" && frame === "detail";
  const showLegalHoldModal = showCaseDetail && params?.modal === "legal-hold";

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
          <div className={styles.breadcrumb}>Admin / <strong>Compliance Center</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.shell}>
            <aside className={styles.innerNav}>
              <p>COMPLIANCE CENTER</p>
              <Link href="/admin/compliance-center?tab=summary" className={tab === "summary" ? styles.innerActive : ""}>Summary</Link>
              <Link href="/admin/compliance-center?tab=forensic-export" className={tab === "forensic-export" ? styles.innerActive : ""}>Forensic Export</Link>
              <Link href="/admin/compliance-center?tab=retention" className={tab === "retention" ? styles.innerActive : ""}>Retention</Link>
              <Link href="/admin/compliance-center?tab=cases" className={tab === "cases" ? styles.innerActive : ""}>Cases</Link>
            </aside>
            <div className={styles.panel}>
              {tab === "summary" ? (
                <>
                  <h1>Compliance Center</h1>
                  <p className={styles.muted}>Audit, retention, enforcement and case management.</p>
                  <div className={styles.kpis}>
                    <article><span>Total Queries</span><h3>1,284,902</h3></article>
                    <article><span>Legal Holds</span><h3>14</h3></article>
                    <article><span>Open Cases</span><h3>7</h3></article>
                    <article><span>Retention Window</span><h3>11 Apr</h3></article>
                  </div>
                  <div className={styles.bar}><div style={{ width: "78%" }} /></div>
                  <table className={styles.table}>
                    <thead><tr><th>Timestamp</th><th>Actor</th><th>Department</th><th>Event</th><th>Status</th></tr></thead>
                    <tbody>
                      <tr><td>Apr 14 22:46</td><td>nadia.chen</td><td>Legal</td><td>Document QA</td><td><span className={styles.good}>PASS</span></td></tr>
                      <tr><td>Apr 14 22:39</td><td>ajay.nair</td><td>Engineering</td><td>Code Gen</td><td><span className={styles.good}>PASS</span></td></tr>
                      <tr><td>Apr 14 22:31</td><td>liya.park</td><td>HR</td><td>PI Lookup</td><td><span className={styles.bad}>BLOCK</span></td></tr>
                    </tbody>
                  </table>
                </>
              ) : null}
              {tab === "forensic-export" ? (
                <div className={styles.split}>
                  <article className={styles.box}>
                    <h2>Configure Export</h2>
                    <input placeholder="Case ID, user ID, or hash..." />
                    <input placeholder="Select date range..." />
                    <label><input type="checkbox" defaultChecked /> Include PII</label>
                    <button type="button" className={styles.cta}>Create Export</button>
                  </article>
                  <article className={styles.box}>
                    <h2>Export Jobs</h2>
                    <ul>
                      <li>EXP-008 · completed <button>Download</button></li>
                      <li>EXP-006 · queued</li>
                      <li>EXP-005 · failed <button>Download</button></li>
                    </ul>
                  </article>
                </div>
              ) : null}
              {tab === "retention" ? (
                <>
                  <div className={styles.alert}>Data retention settings are irreversible. Deleted records cannot be restored.</div>
                  <div className={styles.split}>
                    <article className={styles.box}>
                      <h2>Current Retention Policy</h2>
                      <p>Session data · 90 days</p>
                      <p>Audit logs · 4 years</p>
                      <p>Legal holds · until release</p>
                    </article>
                    <article className={styles.box}>
                      <h2>Execute Retention</h2>
                      <button type="button" className={styles.neutral}>Run Dry Run</button>
                      <button type="button" className={styles.danger}>Execute Retention</button>
                    </article>
                  </div>
                </>
              ) : null}
              {tab === "cases" && !showCaseDetail ? (
                <>
                  <div className={styles.caseHead}>
                    <h2>Cases</h2>
                    <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.cta}>Create Case</Link>
                  </div>
                  <table className={styles.table}>
                    <thead><tr><th>Case ID</th><th>Summary</th><th>Severity</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      <tr><td>CSE-0090</td><td>Suspected PI exfiltration — contractor account</td><td>Critical</td><td>Open</td><td><Link href="/admin/compliance-center?tab=cases&frame=detail">View</Link></td></tr>
                      <tr><td>CSE-0088</td><td>Unresolved PII access — old query template</td><td>High</td><td>Review</td><td><Link href="/admin/compliance-center?tab=cases&frame=detail">View</Link></td></tr>
                    </tbody>
                  </table>
                </>
              ) : null}
              {showCaseDetail ? (
                <div className={styles.split}>
                  <article className={styles.box}>
                    <h2>CSE-0090 — Suspected PI exfiltration</h2>
                    <p className={styles.muted}>Case details</p>
                    <ul className={styles.list}>
                      <li>Status: Open</li>
                      <li>Owner: IT Head</li>
                      <li>Created: 14 Apr 2026</li>
                    </ul>
                  </article>
                  <article className={styles.box}>
                    <h2>Actions</h2>
                    <button type="button" className={styles.neutral}>Legal Hold</button>
                    <button type="button" className={styles.goodBtn}>Approve Case</button>
                    <button type="button" className={styles.danger}>Close Case</button>
                    <Link href="/admin/compliance-center?tab=cases&frame=detail&modal=legal-hold" className={styles.danger}>Disable Legal Hold</Link>
                  </article>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      {showLegalHoldModal ? (
        <>
          <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Disable Legal Hold?</h3>
            <p>Disabling the legal hold will enable this case record for deletion.</p>
            <div className={styles.modalActions}>
              <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.neutral}>Cancel</Link>
              <button type="button" className={styles.danger}>Disable Legal Hold</button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
