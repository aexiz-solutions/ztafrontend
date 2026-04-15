import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";

export default function AdminSettingsPage() {
  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Settings" />

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Admin / Settings</p>
            <h1>Settings</h1>
          </div>
          <div className={styles.headerBadge}>MOCK</div>
        </header>

        <section className={styles.panelGrid}>
          <article className={styles.card}>
            <h2>Admin Preferences</h2>
            <p>Mock settings surface for admin-only preferences and UI controls.</p>
            <div className={styles.rowList}>
              <div>
                <span>Theme</span>
                <strong>Dark shell</strong>
              </div>
              <div>
                <span>Sidebar</span>
                <strong>Fixed and shared</strong>
              </div>
              <div>
                <span>Scope</span>
                <strong>Admin-only</strong>
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <h2>Mock Actions</h2>
            <p>These actions are placeholders only and do not persist changes.</p>
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryBtn}>Save Draft</button>
              <Link href="/admin/audit-log" className={styles.secondaryBtn}>View Audit Log</Link>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
