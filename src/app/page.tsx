"use client";

import { useState } from "react";
import styles from "./page.module.css";

const navItems = [
  {
    label: "New chat",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: "Search",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M19.2 12a7.2 7.2 0 0 0-.09-1.09l1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.page} ${collapsed ? styles.collapsed : ""}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d={collapsed ? "M8 5l8 7-8 7" : "M16 5l-8 7 8 7"}
              />
            </svg>
          </button>
          <span className={styles.brand}>zta</span>
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href="#" className={styles.navItem}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.profileCard}>
            <span className={styles.profileAvatar}>V</span>
            <span className={styles.profileMeta}>
              <span className={styles.profileName}>vbg</span>
              <span className={styles.profilePlan}>Free plan</span>
            </span>
          </button>
        </div>
      </aside>

      <main className={styles.chatSection}>
        <header className={styles.chatHeader}>ZTA-AI Assistant</header>
        <section className={styles.chatBody}>
          <article className={styles.idleState}>
            <div className={styles.idleTitleRow}>
              
              <h1 className={styles.idleTitle}>What shall we think through?</h1>
            </div>

            <div className={styles.composer}>
              <label className={styles.srOnly} htmlFor="chat-input">
                Chat input
              </label>
              <input
                id="chat-input"
                className={styles.chatInput}
                type="text"
                placeholder="How can I help you today?"
              />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
