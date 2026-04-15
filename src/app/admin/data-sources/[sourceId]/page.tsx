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
      { label: "Compliance Center", href: "/admin/compliance-center", icon: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
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

type Props = {
  params: Promise<{ sourceId: string }>;
  searchParams: Promise<{ tab?: string }>;
};

export default async function SourceDetailPage({ params, searchParams }: Props) {
  const { sourceId } = await params;
  const { tab } = await searchParams;
  const currentRoute = `/admin/data-sources/${sourceId}`;
  const sourcePath = `/admin/data-sources/${sourceId}`;
  const activeTab =
    tab === "health" || tab === "schema" || tab === "sync-history" || tab === "edit-config" ? tab : "schema";

  const schemaRows = [
    { field: "applicant_id", original: "applicant_id", alias: "admissions.applicant_id", type: "UUID", visibility: "Visible", pii: "Non-PII" },
    { field: "email", original: "email_address", alias: "admissions.email", type: "String", visibility: "Masked", pii: "PII" },
    { field: "full_name", original: "full_name", alias: "admissions.full_name", type: "String", visibility: "Masked", pii: "PII" },
    { field: "program_applied", original: "programme_code", alias: "admissions.program_applied", type: "Enum", visibility: "Visible", pii: "Non-PII" },
    { field: "application_date", original: "applied_on", alias: "admissions.application_date", type: "Timestamp", visibility: "Visible", pii: "Non-PII" },
    { field: "status", original: "application_status", alias: "admissions.status", type: "Enum", visibility: "Visible", pii: "Non-PII" },
  ];

  const syncRows = [
    { id: "SYN-20260413-003", type: "Full", status: "Success", started: "Apr 13 18:42:05", duration: "4m 12s", records: "4,328", error: "—" },
    { id: "SYN-20260413-002", type: "Incremental", status: "Success", started: "Apr 13 12:00:00", duration: "0m 38s", records: "142", error: "—" },
    { id: "SYN-20260413-001", type: "Incremental", status: "Failed", started: "Apr 13 06:00:00", duration: "0m 04s", records: "0", error: "Connection refused — timeout" },
    { id: "SYN-20260412-005", type: "Full", status: "Success", started: "Apr 12 18:42:05", duration: "3m 55s", records: "4,290", error: "—" },
    { id: "SYN-20260412-004", type: "Incremental", status: "Success", started: "Apr 12 12:00:00", duration: "0m 41s", records: "167", error: "—" },
  ];

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
                    className={`${styles.navItem} ${
                      item.active || (item.label === "Data Sources" && (currentRoute.startsWith("/admin/data-sources") || currentRoute.startsWith("/data-sources")))
                        ? styles.navItemActive
                        : ""
                    }`}
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
            <Link href={`${sourcePath}?tab=health`} className={`${styles.tabLink} ${activeTab === "health" ? styles.tabActive : ""}`}>
              Health
            </Link>
            <Link href={`${sourcePath}?tab=schema`} className={`${styles.tabLink} ${activeTab === "schema" ? styles.tabActive : ""}`}>
              Schema
            </Link>
            <Link
              href={`${sourcePath}?tab=sync-history`}
              className={`${styles.tabLink} ${activeTab === "sync-history" ? styles.tabActive : ""}`}
            >
              Sync History
            </Link>
            <Link
              href={`${sourcePath}?tab=edit-config`}
              className={`${styles.tabLink} ${activeTab === "edit-config" ? styles.tabActive : ""}`}
            >
              Edit Config
            </Link>
          </div>

          {activeTab === "schema" ? (
            <>
              <div className={styles.warnStrip}>
                <span className={styles.warnText}>Schema may be outdated. Last discovery: Apr 8, 2026</span>
                <button type="button" className={styles.inlineResync}>Run Schema Resync</button>
              </div>

              <div className={styles.schemaToolbar}>
                <label className={styles.searchField}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m20 20-4.2-4.2M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
                  </svg>
                  <input type="text" placeholder="Search field names..." />
                </label>
                <button type="button" className={styles.refreshBtn}>Run Schema Resync</button>
              </div>

              <div className={styles.schemaWrap}>
                <table className={styles.schemaTable}>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      <th>Original Column</th>
                      <th>Alias Token</th>
                      <th>Data Type</th>
                      <th>Visibility</th>
                      <th>PII</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schemaRows.map((row) => (
                      <tr key={row.field}>
                        <td>{row.field}</td>
                        <td>{row.original}</td>
                        <td>{row.alias}</td>
                        <td>
                          <span className={`${styles.chip} ${styles[`type${row.type}`]}`}>{row.type}</span>
                        </td>
                        <td>
                          <span className={`${styles.chip} ${row.visibility === "Masked" ? styles.masked : styles.visible}`}>
                            {row.visibility}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.chip} ${row.pii === "PII" ? styles.pii : styles.nonPii}`}>{row.pii}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {activeTab === "sync-history" ? (
            <>
              <div className={styles.sectionHead}>
                <h3>Sync History</h3>
                <div className={styles.actions}>
                  <button type="button" className={styles.refreshBtn}>Run Sync</button>
                  <button type="button" className={styles.neutralBtn}>Run Full Resync</button>
                </div>
              </div>

              <div className={styles.inProgressStrip}>
                <div className={styles.progressTop}>
                  <span>SYN-20260413-004 · Full Sync · In progress</span>
                  <span>Started: 2026-04-13 23:59</span>
                  <strong>~2 min remaining</strong>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} />
                </div>
              </div>

              <div className={styles.schemaWrap}>
                <table className={styles.schemaTable}>
                  <thead>
                    <tr>
                      <th>Sync ID</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Started</th>
                      <th>Duration</th>
                      <th>Records</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td><span className={`${styles.chip} ${row.type === "Full" ? styles.typeUUID : styles.typeString}`}>{row.type}</span></td>
                        <td>
                          <span className={`${styles.chip} ${row.status === "Success" ? styles.visible : styles.pii}`}>{row.status}</span>
                        </td>
                        <td>{row.started}</td>
                        <td>{row.duration}</td>
                        <td>{row.records}</td>
                        <td>{row.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {activeTab === "edit-config" ? (
            <section className={styles.configPanel}>
              <div className={styles.configField}>
                <label>Source Name</label>
                <input value={sourceId} readOnly />
              </div>
              <div className={styles.configField}>
                <label>Source Type</label>
                <div className={styles.typeRow}>
                  <span className={`${styles.chip} ${styles.typeString}`}>REST API</span>
                  <small>Read-only</small>
                </div>
              </div>
              <div className={styles.configField}>
                <label>Department Scope</label>
                <div className={styles.scopeRow}>
                  <span className={styles.scopeTag}>Admissions</span>
                  <span className={styles.scopeTag}>Academic Affairs</span>
                  <span className={styles.scopeTag}>Student Services</span>
                  <button type="button" className={styles.scopeAdd}>+ Add</button>
                </div>
              </div>
              <div className={styles.configField}>
                <label>Connection Config (non-sensitive fields only)</label>
                <pre className={styles.codeBlock}>{`{
  "host": "api.admissions.inst.edu",
  "port": 443,
  "base_path": "/v2",
  "timeout_ms": 5000,
  "api_key": "**************",
  "client_secret": "**************"
}`}</pre>
              </div>
              <button type="button" className={styles.credentialLink}>Update credentials (stored encrypted)</button>
              <div className={styles.configActions}>
                <button type="button" className={styles.neutralBtn}>Test Connection</button>
                <span className={`${styles.chip} ${styles.visible}`}>Connection successful — 142ms</span>
              </div>
              <button type="button" className={styles.refreshBtn}>Save Source</button>
            </section>
          ) : null}

          {activeTab === "health" ? (
            <div className={styles.healthEmpty}>Health view available. Select Schema, Sync History, or Edit Config to manage this source.</div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
