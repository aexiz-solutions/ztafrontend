import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";


type Props = {
  searchParams?: Promise<{
    frame?: "idle" | "kill-modal" | "kill-success" | "cache-modal";
  }>;
};

export default async function SecurityControlsPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const frame = params?.frame ?? "idle";
  const showKillModal = frame === "kill-modal";
  const showKillSuccess = frame === "kill-success";
  const showCacheModal = frame === "cache-modal";

  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Security Controls" />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Security Controls</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.cards}>
            <article className={styles.card}>
              <h2>Revoke Active Sessions</h2>
              <div className={styles.radioStack}>
                <label><input type="radio" name="scope" defaultChecked /> All active sessions</label>
                <label><input type="radio" name="scope" /> Department</label>
                <select defaultValue="Admissions"><option>Admissions</option><option>Finance</option></select>
                <label><input type="radio" name="scope" /> Specific user</label>
                <input placeholder="Search user..." />
              </div>
              <div className={styles.warnBanner}>This will immediately sign out all matched users.</div>
              {showKillSuccess ? (
                <div className={styles.successBanner}>Revoked 184 sessions successfully · 2026-04-14 23:17 · Ref: AUD-SEC-4201</div>
              ) : (
                <Link href="/admin/security-controls?frame=kill-modal" className={styles.revokeBtn}>Revoke Sessions</Link>
              )}
            </article>

            <article className={styles.card}>
              <h2>Clear Intent Cache</h2>
              <p className={styles.desc}>Clears cached query templates. Users will see slightly higher latency until cache warms up.</p>
              <p className={styles.muted}>Estimated warm-up time: ~15 minutes for 1,240 cached intents</p>
              <Link href="/admin/security-controls?frame=cache-modal" className={styles.cacheBtn}>Clear Cache</Link>
              {frame === "idle" ? null : <p className={styles.muted}>Cache cleared at 2026-04-14 23:06</p>}
            </article>
          </div>

          <article className={styles.logCard}>
            <h3>Recent Security Actions</h3>
            <table className={styles.table}>
              <thead><tr><th>Action Type</th><th>Performed By</th><th>Scope</th><th>Timestamp</th></tr></thead>
              <tbody>
                <tr><td>Revoke Sessions</td><td>IT Head</td><td>All active sessions</td><td>2026-04-14 23:17</td></tr>
                <tr><td>Clear Cache</td><td>IT Head</td><td>Intent cache</td><td>2026-04-14 23:06</td></tr>
                <tr><td>Revoke Sessions</td><td>IT Head</td><td>Dept: Finance</td><td>2026-04-14 18:42</td></tr>
                <tr><td>Clear Cache</td><td>IT Head</td><td>Intent cache</td><td>2026-04-13 14:03</td></tr>
                <tr><td>Revoke Sessions</td><td>IT Head</td><td>User: a.nair</td><td>2026-04-12 11:27</td></tr>
              </tbody>
            </table>
          </article>
        </section>
      </main>
      {showKillModal ? (
        <>
          <Link href="/admin/security-controls" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>You are about to revoke sessions for All active sessions.</h3>
            <p>This cannot be undone. Type REVOKE to confirm.</p>
            <input defaultValue="REVOKE" />
            <div className={styles.modalActions}>
              <Link href="/admin/security-controls" className={styles.neutralBtn}>Cancel</Link>
              <Link href="/admin/security-controls?frame=kill-success" className={styles.revokeBtn}>Confirm Revoke</Link>
            </div>
          </div>
        </>
      ) : null}
      {showCacheModal ? (
        <>
          <Link href="/admin/security-controls" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Clear the intent cache?</h3>
            <div className={styles.modalActions}>
              <Link href="/admin/security-controls" className={styles.neutralBtn}>Cancel</Link>
              <Link href="/admin/security-controls" className={styles.cacheBtn}>Confirm</Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
