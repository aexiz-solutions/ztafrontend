import Link from "next/link";
import { createAdminNav } from "./admin-nav";
import styles from "./admin-sidebar.module.css";

type Props = {
  activeLabel?: string;
};

export function AdminSidebar({ activeLabel = "" }: Props) {
  const adminNav = createAdminNav(activeLabel);

  return (
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
  );
}
