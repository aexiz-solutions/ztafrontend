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
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10", active: true },
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

type Props = {
  searchParams?: {
    tab?: string;
    frame?: string;
    state?: string;
    domain?: string;
  };
};

export default function InterpreterConfigPage({ searchParams }: Props) {
  const activeTab =
    searchParams?.tab === "intent-definitions"
      ? "intent-definitions"
      : searchParams?.tab === "detection-keywords"
        ? "detection-keywords"
        : searchParams?.tab === "domain-source-bindings"
          ? "domain-source-bindings"
          : searchParams?.tab === "onboarding-validator"
            ? "onboarding-validator"
        : "domain-keywords";
  const getRoleClass = (role: string) => {
    if (role === "Admin Staff") return styles.roleAdmin;
    if (role === "Dept Head") return styles.roleHead;
    return styles.roleChip;
  };

  const intentRows = [
    {
      intent: "check_result",
      description: "Fetch academic result for a student",
      entity: "STUDENT",
      roles: ["Student", "Faculty"],
      status: "Active",
    },
    {
      intent: "pay_fee",
      description: "Initiate or check fee payment",
      entity: "TRANSACTION",
      roles: ["Student", "Admin Staff"],
      status: "Active",
    },
    {
      intent: "borrow_book",
      description: "Borrow or reserve a library book",
      entity: "RESOURCE",
      roles: ["Student", "Faculty"],
      status: "Active",
    },
    {
      intent: "raise_grievance",
      description: "Submit a grievance or complaint",
      entity: "TEXT",
      roles: ["Student", "Faculty", "Dept Head"],
      status: "Active",
    },
    {
      intent: "view_timetable",
      description: "Retrieve class or exam timetable",
      entity: "SCHEDULE",
      roles: ["Student", "Faculty"],
      status: "Inactive",
    },
  ];

  const domainRows = [
    { domain: "admissions", keywords: ["application", "admission", "enroll", "join"], status: "Active" },
    { domain: "academics", keywords: ["grade", "marks", "result", "CGPA", "exam"], status: "Active" },
    { domain: "finance", keywords: ["fee", "payment", "scholarship", "invoice"], status: "Active" },
    { domain: "library", keywords: ["book", "borrow", "return", "overdue", "fine"], status: "Inactive" },
    { domain: "hostel", keywords: ["room", "allotment", "warden", "hostel fee"], status: "Active" },
  ];

  const detectionRows = [
    { keyword: "my marks", linkedIntent: "check_result", matchType: "Fuzzy", status: "Active" },
    { keyword: "result", linkedIntent: "check_result", matchType: "Exact Match", status: "Active" },
    { keyword: "pay fees", linkedIntent: "pay_fee", matchType: "Fuzzy", status: "Active" },
    { keyword: "borrow book", linkedIntent: "borrow_book", matchType: "Exact Match", status: "Active" },
    { keyword: "timetable", linkedIntent: "view_timetable", matchType: "Fuzzy", status: "Inactive" },
  ];

  const bindingRows = [
    { domain: "admissions", source: "admissions_api_v2", sourceType: "REST", status: "Active" },
    { domain: "academics", source: "postgres://academics_db", sourceType: "PostgreSQL", status: "Active" },
    { domain: "finance", source: "finance_erp_api", sourceType: "REST", status: "Active" },
    { domain: "library", source: "library_vector_store", sourceType: "Vector", status: "Inactive" },
    { domain: "hostel", source: "hostel_db", sourceType: "MySQL", status: "Active" },
  ];

  const isBindingTab = activeTab === "domain-source-bindings";
  const isOnboardingTab = activeTab === "onboarding-validator";
  const isBindingModalOpen = isBindingTab && searchParams?.frame === "bind-domain";
  const bindingRoute = "/admin/interpreter-config?tab=domain-source-bindings";
  const onboardingRoute = "/admin/interpreter-config?tab=onboarding-validator";
  const showOnboardingResults = isOnboardingTab && searchParams?.state === "results";
  const onboardingDomain = searchParams?.domain ?? "";

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
          <div className={styles.breadcrumb}>Admin / <strong>Interpreter Configuration</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>

        <section className={styles.content}>
          <div className={`${styles.workspace} ${isBindingTab || isOnboardingTab ? styles.workspaceSingle : ""}`}>
            <div className={styles.leftPane}>
              <div className={styles.pageTop}>
                <h1>Interpreter Configuration</h1>
                <p>Configure domain keywords, intent definitions, detection rules and data source bindings</p>
                {isBindingTab ? (
                  <Link href={`${bindingRoute}&frame=bind-domain`} className={styles.bindButton}>
                    Bind Domain
                  </Link>
                ) : null}
              </div>

              <div className={styles.tabs}>
                <Link
                  href="/admin/interpreter-config?tab=domain-keywords"
                  className={`${styles.tab} ${activeTab === "domain-keywords" ? styles.tabActive : ""}`}
                >
                  Domain Keywords
                </Link>
                <Link
                  href="/admin/interpreter-config?tab=intent-definitions"
                  className={`${styles.tab} ${activeTab === "intent-definitions" ? styles.tabActive : ""}`}
                >
                  Intent Definitions
                </Link>
                <Link
                  href="/admin/interpreter-config?tab=detection-keywords"
                  className={`${styles.tab} ${activeTab === "detection-keywords" ? styles.tabActive : ""}`}
                >
                  Detection Keywords
                </Link>
                <Link
                  href="/admin/interpreter-config?tab=domain-source-bindings"
                  className={`${styles.tab} ${activeTab === "domain-source-bindings" ? styles.tabActive : ""}`}
                >
                  Domain-Source Bindings
                </Link>
                <Link
                  href="/admin/interpreter-config?tab=onboarding-validator"
                  className={`${styles.tab} ${activeTab === "onboarding-validator" ? styles.tabActive : ""}`}
                >
                  Onboarding Validator
                </Link>
              </div>

              {isOnboardingTab ? (
                <>
                  <div className={styles.validatorControls}>
                    <select className={styles.validatorSelect} defaultValue={onboardingDomain || ""}>
                      <option value="" disabled>Select a domain...</option>
                      <option value="admissions">admissions</option>
                      <option value="academics">academics</option>
                      <option value="finance">finance</option>
                      <option value="library">library</option>
                      <option value="hostel">hostel</option>
                    </select>
                    <Link href={`${onboardingRoute}&state=results&domain=admissions`} className={styles.bindButton}>
                      {showOnboardingResults ? "Re-run Validation" : "Run Validation"}
                    </Link>
                    {showOnboardingResults ? <span className={styles.lastRunChip}>Last run: just now</span> : null}
                  </div>

                  {!showOnboardingResults ? (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4 12h10M4 7h14M4 17h8M19 16l2 2 3-3" />
                        </svg>
                      </div>
                      <h3>No validation results yet</h3>
                      <p>Select a domain from the dropdown above and click Run Validation to check readiness.</p>
                    </div>
                  ) : (
                    <>
                      <div className={styles.warningBanner}>
                        <div>
                          <h3>WARNINGS — Domain partially ready</h3>
                          <p>3 warnings found. Review and resolve before enabling in production.</p>
                        </div>
                        <div className={styles.bannerStats}>
                          <span><strong>12</strong> Checks passed</span>
                          <span><strong>3</strong> Warnings</span>
                          <span><strong>0</strong> Errors</span>
                        </div>
                      </div>

                      <div className={styles.tableWrap}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Severity</th>
                              <th>Code</th>
                              <th>Message</th>
                              <th>Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><span className={`${styles.chip} ${styles.fuzzyChip}`}>Warning</span></td>
                              <td>W_DOM_002</td>
                              <td>No synonyms defined for &apos;application&apos; keyword</td>
                              <td>Add synonym variants to improve recall.</td>
                            </tr>
                            <tr>
                              <td><span className={`${styles.chip} ${styles.fuzzyChip}`}>Warning</span></td>
                              <td>W_INT_005</td>
                              <td>Intent &apos;raise_grievance&apos; has no fallback response configured</td>
                              <td>Configure fallback in intent settings.</td>
                            </tr>
                            <tr>
                              <td><span className={`${styles.chip} ${styles.fuzzyChip}`}>Warning</span></td>
                              <td>W_SRC_001</td>
                              <td>Data source API response schema not validated</td>
                              <td>Run schema sync to auto-detect fields.</td>
                            </tr>
                            <tr>
                              <td><span className={`${styles.chip} ${styles.exactChip}`}>Info</span></td>
                              <td>I_DOM_001</td>
                              <td>Domain covers 94% of expected keyword categories</td>
                              <td>3 optional categories unconfigured.</td>
                            </tr>
                            <tr>
                              <td><span className={`${styles.chip} ${styles.exactChip}`}>Info</span></td>
                              <td>I_INT_004</td>
                              <td>All intents have at least 2 detection keywords</td>
                              <td>Recommendation: add 3+ for robustness.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      {activeTab === "intent-definitions" ? (
                        <tr>
                          <th>Intent Name</th>
                          <th>Description</th>
                          <th>Entity Type</th>
                          <th>Allowed Roles</th>
                          <th>Status</th>
                        </tr>
                      ) : activeTab === "detection-keywords" ? (
                        <tr>
                          <th>Keyword</th>
                          <th>Linked Intent</th>
                          <th>Match Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      ) : activeTab === "domain-source-bindings" ? (
                        <tr>
                          <th>Domain</th>
                          <th>Bound Data Source</th>
                          <th>Source Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      ) : (
                        <tr>
                          <th>Domain Name</th>
                          <th>Keywords (sample)</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {activeTab === "intent-definitions"
                        ? intentRows.map((row) => (
                            <tr key={row.intent}>
                              <td>{row.intent}</td>
                              <td>{row.description}</td>
                              <td>{row.entity}</td>
                              <td>
                                <div className={styles.roleGroup}>
                                  {row.roles.map((role) => (
                                    <span key={role} className={`${styles.chip} ${getRoleClass(role)}`}>{role}</span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <span className={`${styles.chip} ${row.status === "Active" ? styles.success : styles.inactive}`}>
                                  <span className={styles.statusDot} />
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        : activeTab === "detection-keywords"
                          ? detectionRows.map((row) => (
                              <tr key={row.keyword}>
                                <td>{row.keyword}</td>
                                <td>{row.linkedIntent}</td>
                                <td>
                                  <span className={`${styles.chip} ${row.matchType === "Fuzzy" ? styles.fuzzyChip : styles.exactChip}`}>
                                    {row.matchType}
                                  </span>
                                </td>
                                <td>
                                  <span className={`${styles.chip} ${row.status === "Active" ? styles.success : styles.inactive}`}>
                                    <span className={styles.statusDot} />
                                    {row.status}
                                  </span>
                                </td>
                                <td>
                                  <div className={styles.actionButtons}>
                                    <button type="button" className={styles.iconAction} aria-label="Edit">
                                      <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                                      </svg>
                                    </button>
                                    <button type="button" className={styles.iconAction} aria-label="Disable">
                                      <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="m6 6 12 12M6 18 18 6" />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : activeTab === "domain-source-bindings"
                            ? bindingRows.map((row) => (
                                <tr key={`${row.domain}-${row.source}`}>
                                  <td>{row.domain}</td>
                                  <td>{row.source}</td>
                                  <td>
                                    <span className={`${styles.chip} ${styles.exactChip}`}>
                                      {row.sourceType}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={`${styles.chip} ${row.status === "Active" ? styles.success : styles.inactive}`}>
                                      <span className={styles.statusDot} />
                                      {row.status}
                                    </span>
                                  </td>
                                  <td>
                                    <div className={styles.actionButtons}>
                                      <Link href={`${bindingRoute}&frame=bind-domain`} className={styles.iconAction} aria-label="Edit">
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                          <path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                                        </svg>
                                      </Link>
                                      <button type="button" className={styles.iconAction} aria-label="Disable">
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                          <path d="m6 6 12 12M6 18 18 6" />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                          : domainRows.map((row) => (
                            <tr key={row.domain}>
                              <td>{row.domain}</td>
                              <td>
                                <div className={styles.roleGroup}>
                                  {row.keywords.map((keyword) => (
                                    <span key={keyword} className={`${styles.chip} ${styles.keywordChip}`}>{keyword}</span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <span className={`${styles.chip} ${row.status === "Active" ? styles.success : styles.inactive}`}>
                                  <span className={styles.statusDot} />
                                  {row.status}
                                </span>
                              </td>
                              <td>
                                <div className={styles.actionButtons}>
                                  <button type="button" className={styles.iconAction} aria-label="Edit">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                                    </svg>
                                  </button>
                                  <button type="button" className={styles.iconAction} aria-label="Disable">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                      <path d="m6 6 12 12M6 18 18 6" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {isBindingTab || isOnboardingTab ? null : <aside className={styles.drawer}>
              <div className={styles.drawerHeader}>
                <h2>
                  {activeTab === "intent-definitions"
                    ? "Add / Edit Intent"
                    : activeTab === "detection-keywords"
                      ? "Add / Edit Keyword"
                       : "Add / Update Domain"}
                </h2>
                <button type="button" className={styles.iconBtn}>×</button>
              </div>

              <div className={styles.drawerBody}>
                {activeTab === "intent-definitions" ? (
                  <>
                    <label>
                      Intent Name
                      <input defaultValue="check_result" />
                    </label>
                    <label>
                      Description
                      <input defaultValue="Fetch academic result for a student" />
                    </label>
                    <label>
                      Entity Type
                      <select defaultValue="STUDENT">
                        <option>STUDENT</option>
                        <option>TRANSACTION</option>
                        <option>RESOURCE</option>
                        <option>TEXT</option>
                        <option>SCHEDULE</option>
                      </select>
                    </label>
                    <label>
                      Allowed Roles
                      <div className={styles.rolesInput}>
                        <span className={`${styles.chip} ${styles.roleEdit}`}>Student ×</span>
                        <span className={`${styles.chip} ${styles.roleEdit}`}>Faculty ×</span>
                      </div>
                    </label>
                  </>
                ) : activeTab === "detection-keywords" ? (
                  <>
                    <label>
                      Keyword
                      <input defaultValue="my marks" />
                    </label>
                    <label>
                      Linked Intent
                      <select defaultValue="check_result">
                        <option>check_result</option>
                        <option>pay_fee</option>
                        <option>borrow_book</option>
                        <option>view_timetable</option>
                      </select>
                    </label>
                    <label>
                      Match Type
                      <select defaultValue="Fuzzy">
                        <option>Fuzzy</option>
                        <option>Exact Match</option>
                      </select>
                    </label>
                  </>
                ) : (
                  <>
                    <label>
                      Domain Name
                      <input defaultValue="admissions" />
                    </label>
                    <label>
                      Keywords
                      <div className={styles.rolesInput}>
                        <span className={`${styles.chip} ${styles.roleEdit}`}>application</span>
                        <span className={`${styles.chip} ${styles.roleEdit}`}>admission</span>
                        <span className={`${styles.chip} ${styles.roleEdit}`}>enroll</span>
                        <span className={`${styles.chip} ${styles.roleEdit}`}>join</span>
                      </div>
                    </label>
                  </>
                )}
                <div className={styles.toggleRow}>
                  <span>{activeTab === "domain-keywords" ? "Status (Active)" : "Active"}</span>
                  <button type="button" className={styles.toggle} aria-label="Toggle active">
                    <span />
                  </button>
                  <strong>Enabled</strong>
                </div>
              </div>

              <div className={styles.drawerFooter}>
                <button type="button" className={styles.neutralBtn}>Cancel</button>
                <button type="button" className={styles.primaryBtn}>
                  {activeTab === "intent-definitions"
                    ? "Save Intent"
                    : activeTab === "detection-keywords"
                      ? "Save Keyword"
                       : "Save Domain"}
                </button>
              </div>
            </aside>}
          </div>
          {isBindingModalOpen ? (
            <>
              <Link href={bindingRoute} className={styles.modalOverlay} aria-label="Close bind domain modal" />
              <div className={styles.bindModal}>
                <div className={styles.bindHeader}>
                  <h3>Bind Domain to Data Source</h3>
                  <Link href={bindingRoute} className={styles.iconBtn}>×</Link>
                </div>
                <div className={styles.bindBody}>
                  <label>
                    Domain
                    <select defaultValue="admissions">
                      <option>admissions</option>
                      <option>academics</option>
                      <option>finance</option>
                      <option>library</option>
                      <option>hostel</option>
                    </select>
                  </label>
                  <label>
                    Data Source
                    <select defaultValue="admissions_api_v2">
                      <option>admissions_api_v2</option>
                      <option>postgres://academics_db</option>
                      <option>finance_erp_api</option>
                      <option>library_vector_store</option>
                      <option>hostel_db</option>
                    </select>
                  </label>
                  <label>
                    Source Type
                    <select defaultValue="REST">
                      <option>REST</option>
                      <option>PostgreSQL</option>
                      <option>MySQL</option>
                      <option>Vector</option>
                    </select>
                  </label>
                  <div className={styles.toggleRow}>
                    <span>Active</span>
                    <button type="button" className={styles.toggle} aria-label="Toggle active">
                      <span />
                    </button>
                    <strong>Enabled</strong>
                  </div>
                </div>
                <div className={styles.drawerFooter}>
                  <Link href={bindingRoute} className={styles.neutralBtn}>Cancel</Link>
                  <button type="button" className={styles.primaryBtn}>Bind Domain</button>
                </div>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
}
