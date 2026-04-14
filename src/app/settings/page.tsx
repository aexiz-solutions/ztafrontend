"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./settings.module.css";

type Section = "appearance" | "account" | "notifications" | "privacy" | "about";
type Mode = "light" | "dark" | "sky";

const navItems = [
  {
    label: "New chat",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: "Search",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M19.2 12a7.2 7.2 0 0 0-.09-1.09l1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" />
      </svg>
    ),
  },
];

const sections: Array<{ id: Section; label: string }> = [
  { id: "appearance", label: "Appearance" },
  { id: "account", label: "Account" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy", label: "Privacy" },
  { id: "about", label: "About" },
];

const recentChats = [
  "ZTA architecture notes",
  "Quarterly KPI summary",
  "Security policy draft",
];

const modeTokens: Record<Mode, { bg: string; side: string }> = {
  light: { bg: "#FAF9F7", side: "#F1EEEA" },
  dark: { bg: "#1A1A1A", side: "#141414" },
  sky: { bg: "#0F1B2D", side: "#0A1520" },
};

export default function SettingsPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("appearance");
  const [mode, setMode] = useState<Mode>("dark");
  const router = useRouter();

  const currentMode = useMemo(() => modeTokens[mode], [mode]);

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={collapsed ? "M8 5l8 7-8 7" : "M16 5l-8 7 8 7"} />
            </svg>
          </button>
          {!collapsed ? <span className={styles.brand}>zta</span> : null}
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navItem} ${item.label === "Settings" ? styles.navItemActive : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed ? <span className={styles.navLabel}>{item.label}</span> : null}
            </Link>
          ))}
        </nav>

        {!collapsed ? (
          <div className={styles.recents}>
            <p className={styles.recentsTitle}>Recents</p>
            {recentChats.map((chat) => (
              <Link key={chat} href="/" className={styles.recentLink}>
                {chat}
              </Link>
            ))}
          </div>
        ) : null}

        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.profileCard}>
            <span className={styles.profileAvatar}>V</span>
            {!collapsed ? (
              <span className={styles.profileMeta}>
                <span className={styles.profileName}>vbg</span>
                <span className={styles.profilePlan}>Free plan</span>
              </span>
            ) : null}
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <button type="button" className={styles.backButton} onClick={() => router.push("/")}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <span className={styles.headerTitle}>Settings</span>
        </header>

        <section className={styles.content}>
          <nav className={styles.sectionNav} aria-label="Settings sections">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`${styles.sectionLink} ${activeSection === section.id ? styles.sectionLinkActive : ""}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <article className={styles.panel}>
            {activeSection === "appearance" ? (
              <>
                <h2>Appearance</h2>
                <div className={styles.appearanceCards}>
                  {(
                    [
                      { id: "light", label: "Light" },
                      { id: "dark", label: "Dark" },
                      { id: "sky", label: "Night Sky" },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.modeCard} ${mode === item.id ? styles.modeCardActive : ""}`}
                      onClick={() => setMode(item.id)}
                    >
                      <span className={styles.miniPreview}>
                        <span className={styles.miniTop} style={{ background: modeTokens[item.id].bg }} />
                        <span className={styles.miniBody}>
                          <span className={styles.miniSidebar} style={{ background: modeTokens[item.id].side }} />
                          <span className={styles.miniMain} style={{ background: modeTokens[item.id].bg }}>
                            <span className={styles.miniAccent} />
                          </span>
                        </span>
                      </span>
                      <span className={styles.modeLabel}>{item.label}</span>
                    </button>
                  ))}
                </div>
                <div
                  className={styles.hiddenSection}
                  style={{
                    border: "0.0625rem solid var(--line)",
                    borderRadius: "0.75rem",
                    padding: "0.75rem",
                    background: currentMode.bg,
                  }}
                >
                  Preview sample ({mode} mode)
                </div>
              </>
            ) : null}

            {activeSection === "account" ? (
              <>
                <h2>Account</h2>
                <div className={styles.uploadBox}>Profile picture upload</div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name">Name</label>
                  <input id="name" defaultValue="vbg" />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="email">Email</label>
                  <input id="email" className={styles.readonly} defaultValue="vbg@gmail.com" readOnly />
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="password">Password change</label>
                  <input id="password" type="password" placeholder="••••••••" />
                </div>
              </>
            ) : null}

            {activeSection === "notifications" ? (
              <>
                <h2>Notifications</h2>
                <p className={styles.hiddenSection}>Notification settings structure placeholder.</p>
              </>
            ) : null}

            {activeSection === "privacy" ? (
              <>
                <h2>Privacy</h2>
                <p className={styles.hiddenSection}>Privacy settings structure placeholder.</p>
              </>
            ) : null}

            {activeSection === "about" ? (
              <>
                <h2>About</h2>
                <div className={styles.aboutList}>
                  <p>Version: 0.1.0</p>
                  <a href="#">Terms of Service</a>
                  <a href="#">Privacy Policy</a>
                </div>
              </>
            ) : null}
          </article>
        </section>
      </main>
    </div>
  );
}
