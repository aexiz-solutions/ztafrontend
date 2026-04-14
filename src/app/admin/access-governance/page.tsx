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
      { label: "Audit Log", href: "#", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Roles & Permissions", href: "#", icon: "M12 3v6M6 6h12M5 13h14M7 21h10" },
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

export default function AccessGovernancePage() {
  const [openPolicyModal, setOpenPolicyModal] = useState(false);

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
            <button type="button" className={styles.tabActive} onClick={() => setOpenPolicyModal(true)}>
              Role Policies
            </button>
            <button type="button">Row-Level Rules</button>
            <button type="button">Field Masking</button>
          </div>

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
                      <button type="button" className={styles.tableAction}>
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
      </main>
    </div>
  );
}
