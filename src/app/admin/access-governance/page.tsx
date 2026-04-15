"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      {
        label: "Access Governance",
        href: "/admin/access-governance",
        icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z",
        active: true,
      },
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
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10" },
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

const rows = [
  {
    role: "student_default",
    domains: "inst.edu, bca.edu",
    mask: "High",
    scope: "Dept",
    hours: "Yes",
    mfa: "Required",
    status: "Enabled",
  },
  {
    role: "faculty_base",
    domains: "cs.inst.edu",
    mask: "Medium",
    scope: "Dept",
    hours: "Yes",
    mfa: "Required",
    status: "Enabled",
  },
  {
    role: "admin_staff",
    domains: "admin.inst.edu",
    mask: "Medium",
    scope: "Global",
    hours: "No",
    mfa: "Optional",
    status: "Enabled",
  },
  {
    role: "it_head",
    domains: "it.inst.edu",
    mask: "Low",
    scope: "Global",
    hours: "No",
    mfa: "Required",
    status: "Enabled",
  },
  {
    role: "executive",
    domains: "exec.inst.edu",
    mask: "Low",
    scope: "Global",
    hours: "No",
    mfa: "Required",
    status: "Enabled",
  },
];

const maskingFields = [
  {
    id: "student_id",
    fieldName: "student_id",
    source: "users",
    dataType: "UUID",
    visibility: "Visible",
    pii: "Non-PII",
    personas: ["None"],
  },
  {
    id: "email",
    fieldName: "email",
    source: "users",
    dataType: "String",
    visibility: "Masked",
    pii: "PII",
    personas: ["Student", "Faculty"],
  },
  {
    id: "aadhaar_number",
    fieldName: "aadhaar_number",
    source: "kyc_records",
    dataType: "String",
    visibility: "Hidden",
    pii: "PII",
    personas: ["Student", "Faculty", "Dept Head"],
  },
  {
    id: "salary_band",
    fieldName: "salary_band",
    source: "hr_data",
    dataType: "Enum",
    visibility: "Masked",
    pii: "PII",
    personas: ["Admin Staff"],
  },
  {
    id: "last_login",
    fieldName: "last_login",
    source: "sessions",
    dataType: "Timestamp",
    visibility: "Visible",
    pii: "Non-PII",
    personas: ["None"],
  },
];

export default function AccessGovernancePage() {
  const [activeTab, setActiveTab] = useState<"policies" | "row-rules" | "masking">(
    "policies",
  );
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
  const [openRuleDrawer, setOpenRuleDrawer] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState("email");
  const rowRules = [
    {
      role: "student_default",
      scopeField: "student_id",
      pattern: "{{user.id}}",
      filter: "Exact Match",
    },
    {
      role: "faculty_base",
      scopeField: "department_id",
      pattern: "{{user.department}}",
      filter: "Exact Match",
    },
    {
      role: "admin_staff",
      scopeField: "org_unit",
      pattern: "{{user.org_unit}}.*",
      filter: "Regex",
    },
    {
      role: "it_head",
      scopeField: "*",
      pattern: "*",
      filter: "Wildcard",
    },
    {
      role: "executive",
      scopeField: "data_class",
      pattern: "in:[confidential,restricted]",
      filter: "In-List",
    },
  ];
  const selectedField =
    maskingFields.find((field) => field.id === selectedFieldId) ?? maskingFields[0];

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
            <nav>
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
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
          <div className={styles.breadcrumb}>Admin / <strong>Access Governance</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>

        <section className={styles.content}>
          <div className={styles.pageTop}>
            <div>
              <h1>Access Governance</h1>
              <p>Manage role policies, row-level rules and field masking.</p>
            </div>
            <button type="button" className={styles.createButton} onClick={() => setOpenPolicyModal(true)}>
              Create Policy
            </button>
          </div>

          <div className={styles.tabs}>
            <button
              type="button"
              className={activeTab === "policies" ? styles.tabActive : ""}
              onClick={() => setActiveTab("policies")}
            >
              Role Policies
            </button>
            <button
              type="button"
              className={activeTab === "row-rules" ? styles.tabActive : ""}
              onClick={() => setActiveTab("row-rules")}
            >
              Row-Level Rules
            </button>
            <button
              type="button"
              className={activeTab === "masking" ? styles.tabActive : ""}
              onClick={() => setActiveTab("masking")}
            >
              Field Masking
            </button>
          </div>

          {activeTab === "policies" ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Role Key</th>
                    <th>Allowed Domains</th>
                    <th>Masking Level</th>
                    <th>Scope Type</th>
                    <th>Biz Hours</th>
                    <th>MFA Req.</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.role}>
                      <td>{row.role}</td>
                      <td>{row.domains}</td>
                      <td>{row.mask}</td>
                      <td>{row.scope}</td>
                      <td>{row.hours}</td>
                      <td>{row.mfa}</td>
                      <td>
                        <span className={styles.statusChip}>{row.status}</span>
                      </td>
                      <td>
                        <button type="button" className={styles.tableAction} onClick={() => setOpenPolicyModal(true)}>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === "row-rules" ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Role Key</th>
                    <th>Scope Field</th>
                    <th>Scope Value Pattern</th>
                    <th>Filter Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rowRules.map((rule) => (
                    <tr key={`${rule.role}-${rule.scopeField}`}>
                      <td>{rule.role}</td>
                      <td>{rule.scopeField}</td>
                      <td>{rule.pattern}</td>
                      <td>
                        <span className={styles.filterChip}>{rule.filter}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={styles.tableAction}
                          onClick={() => setOpenRuleDrawer(true)}
                          aria-label="Edit row-level rule"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === "masking" ? (
            <>
              <div className={styles.maskingFilters}>
                <label className={styles.searchWrap}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6" />
                    <path d="m16 16 4 4" />
                  </svg>
                  <input type="text" placeholder="Search fields..." />
                </label>
                <select defaultValue="all-source">
                  <option value="all-source">Source: All</option>
                  <option>users</option>
                  <option>kyc_records</option>
                  <option>hr_data</option>
                  <option>sessions</option>
                </select>
                <select defaultValue="all-visibility">
                  <option value="all-visibility">Visibility: All</option>
                  <option>Visible</option>
                  <option>Masked</option>
                  <option>Hidden</option>
                </select>
                <button type="button" className={styles.piiOnlyToggle}>
                  <span>PII Only</span>
                  <span className={styles.toggleKnob} />
                </button>
              </div>

              <div className={styles.maskingLayout}>
                <div className={styles.maskingTableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Field Name</th>
                        <th>Data Source</th>
                        <th>Data Type</th>
                        <th>Visibility</th>
                        <th>PII</th>
                        <th>Masked For Personas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maskingFields.map((field) => (
                        <tr
                          key={field.id}
                          className={selectedFieldId === field.id ? styles.selectedMaskRow : ""}
                          onClick={() => setSelectedFieldId(field.id)}
                        >
                          <td>{field.fieldName}</td>
                          <td>{field.source}</td>
                          <td>{field.dataType}</td>
                          <td>
                            <span className={`${styles.smallChip} ${styles[`visibility${field.visibility}`]}`}>
                              {field.visibility}
                            </span>
                          </td>
                          <td>
                            <span className={`${styles.smallChip} ${styles[`pii${field.pii.replace("-", "")}`]}`}>
                              {field.pii}
                            </span>
                          </td>
                          <td>
                            <div className={styles.personaPills}>
                              {field.personas.map((persona) => (
                                <span key={persona} className={styles.personaPill}>
                                  {persona}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside className={styles.maskingPanel}>
                  <header className={styles.maskingPanelHeader}>
                    <h3>{selectedField.fieldName}</h3>
                    <span className={styles.smallChipDanger}>PII</span>
                  </header>
                  <small>
                    {selectedField.source} · {selectedField.dataType} ·{" "}
                    {selectedField.pii === "PII" ? "PII field" : "Non-PII field"}
                  </small>
                  <label>
                    Visibility
                    <select defaultValue={selectedField.visibility}>
                      <option>Visible</option>
                      <option>Masked</option>
                      <option>Hidden</option>
                    </select>
                  </label>
                  <label>
                    Data Type
                    <select defaultValue={selectedField.dataType}>
                      <option>UUID</option>
                      <option>String</option>
                      <option>Enum</option>
                      <option>Timestamp</option>
                    </select>
                  </label>
                  <div className={styles.switchRow}>
                    <span>Mark as PII</span>
                    <button type="button" className={styles.toggleOn}>
                      Enabled
                    </button>
                  </div>
                  <div className={styles.switchRow}>
                    <span>Apply Tokenisation</span>
                    <button type="button" className={styles.toggleOn}>
                      Enabled
                    </button>
                  </div>
                  <div className={styles.maskedPersonaBox}>
                    <p>Masked For Personas</p>
                    <div className={styles.personaPills}>
                      {selectedField.personas.map((persona) => (
                        <span key={persona} className={styles.personaPill}>
                          {persona}
                        </span>
                      ))}
                      <button type="button" className={styles.addPill}>
                        + Add
                      </button>
                    </div>
                  </div>
                  <footer className={styles.maskingPanelFooter}>
                    <button type="button" className={styles.cancelBtn}>
                      Discard
                    </button>
                    <button type="button" className={styles.saveBtn}>
                      Update Field Policy
                    </button>
                  </footer>
                </aside>
              </div>
            </>
          ) : null}
        </section>

        {openPolicyModal ? (
          <div className={styles.modalLayer}>
            <div className={styles.modalOverlay} onClick={() => setOpenPolicyModal(false)} />
            <section className={styles.modal}>
              <header className={styles.modalHeader}>
                <h2>Create Role Policy</h2>
                <button type="button" onClick={() => setOpenPolicyModal(false)} aria-label="Close modal">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </header>
              <div className={styles.modalBody}>
                <label>
                  Role Key
                  <select defaultValue="student_default">
                    <option>student_default</option>
                    <option>faculty_base</option>
                    <option>admin_staff</option>
                    <option>it_head</option>
                  </select>
                </label>
                <label>
                  Allowed Domains (comma-separated)
                  <input defaultValue="inst.edu, bca.edu" />
                </label>
                <div className={styles.flagList}>
                  <div className={styles.flagRow}>
                    <span>Business Hours Only</span>
                    <button type="button" className={styles.toggleOn}>Enabled</button>
                  </div>
                  <div className={styles.flagRow}>
                    <span>MFA Required</span>
                    <button type="button" className={styles.toggleOn}>Enabled</button>
                  </div>
                  <div className={styles.flagRow}>
                    <span>Trusted Device Required</span>
                    <button type="button" className={styles.toggleOff}>Disabled</button>
                  </div>
                </div>
              </div>
              <footer className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setOpenPolicyModal(false)}>
                  Cancel
                </button>
                <button type="button" className={styles.saveBtn}>
                  Save Policy
                </button>
              </footer>
            </section>
          </div>
        ) : null}

        {openRuleDrawer ? (
          <div className={styles.drawerLayer}>
            <div className={styles.drawerOverlay} onClick={() => setOpenRuleDrawer(false)} />
            <aside className={styles.ruleDrawer}>
              <header className={styles.ruleDrawerHeader}>
                <h2>Edit Row-Level Rule</h2>
                <button type="button" onClick={() => setOpenRuleDrawer(false)} aria-label="Close drawer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </header>
              <div className={styles.ruleDrawerBody}>
                <label>
                  Role Key
                  <select defaultValue="faculty_base">
                    <option>student_default</option>
                    <option>faculty_base</option>
                    <option>admin_staff</option>
                    <option>it_head</option>
                    <option>executive</option>
                  </select>
                </label>
                <label>
                  Scope Field
                  <input defaultValue="department_id" />
                </label>
                <label>
                  Scope Value Pattern
                  <input defaultValue="{{user.department}}" />
                </label>
                <label>
                  Filter Type
                  <select defaultValue="Exact Match">
                    <option>Exact Match</option>
                    <option>Regex</option>
                    <option>Wildcard</option>
                    <option>In-List</option>
                  </select>
                </label>
                <div className={styles.drawerHint}>
                  Use {"{{user.X}}"} to bind row filters to the session context.
                </div>
              </div>
              <footer className={styles.ruleDrawerFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setOpenRuleDrawer(false)}>
                  Cancel
                </button>
                <button type="button" className={styles.saveBtn}>
                  Save Rule
                </button>
              </footer>
            </aside>
          </div>
        ) : null}
      </main>
    </div>
  );
}
