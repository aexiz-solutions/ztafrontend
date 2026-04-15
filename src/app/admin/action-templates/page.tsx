import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";


export default function ActionTemplatesPage() {
  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Action Templates" />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Action Templates</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.head}>
            <div>
              <h1>Action Template Registry</h1>
              <p>Manage, override and toggle workflow action templates</p>
            </div>
            <div className={styles.stats}>
              <article><h3>12</h3><span>Total</span></article>
              <article><h3 className={styles.good}>10</h3><span>Enabled</span></article>
              <article><h3>2</h3><span>Disabled</span></article>
              <article><h3 className={styles.bad}>3</h3><span>High Risk</span></article>
            </div>
          </div>
          <div className={styles.workspace}>
            <article className={styles.listCard}>
              <div className={styles.listHead}>
                <h2>Templates</h2>
                <input placeholder="Search..." />
              </div>
              <ul>
                <li>
                  <div><strong>send_otp_notification</strong><span className={styles.tagLow}>Low</span><span className={styles.tagRev}>Reversible</span></div>
                  <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Enabled</label>
                </li>
                <li className={styles.active}>
                  <div><strong>revoke_session</strong><span className={styles.tagHigh}>High</span><span className={styles.tagIrrev}>Irreversible</span></div>
                  <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Enabled</label>
                </li>
                <li>
                  <div><strong>export_pii_report</strong><span className={styles.tagHigh}>High</span><span className={styles.tagIrrev}>Irreversible</span></div>
                  <label className={styles.switch}><input type="checkbox" /><span /> Disabled</label>
                </li>
                <li>
                  <div><strong>update_enrollment_status</strong><span className={styles.tagMed}>Medium</span><span className={styles.tagRev}>Reversible</span></div>
                  <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Enabled</label>
                </li>
              </ul>
            </article>
            <article className={styles.detailCard}>
              <div className={styles.templateTitle}>
                <h2>revoke_session</h2>
                <span className={styles.tagHigh}>High</span>
                <span className={styles.tagIrrev}>Irreversible</span>
              </div>
              <p className={styles.muted}>Immediately terminates all active sessions for a given user. Requires IT Head approval.</p>
              <div className={styles.schemaGrid}>
                <div>
                  <h4>Input Schema</h4>
                  <pre>{`{\n  "user_id": "string",\n  "reason": "string",\n  "notify_user": boolean\n}`}</pre>
                </div>
                <div>
                  <h4>Output Schema</h4>
                  <pre>{`{\n  "sessions_revoked": integer,\n  "revoked_at": "timestamp"\n}`}</pre>
                </div>
              </div>
              <h4>Allowed Personas</h4>
              <span className={styles.pill}>IT Head</span>
              <h4>Approval Required</h4>
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Yes — manual approval required</label>
              <hr />
              <div className={styles.overrideHead}><h3>Admin Override</h3><span className={styles.tagHigh}>Editable</span></div>
              <label className={styles.muted}>Override Notes</label>
              <textarea defaultValue="Restricted to IT Head persona only. Audit log mandatory on every invocation." />
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Override Enabled</label>
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> Action Status</label>
              <div className={styles.footerActions}>
                <Link href="/admin/execution-center" className={styles.cta}>Update Override</Link>
                <Link href="/admin/action-templates" className={styles.delete}>Delete Override</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

