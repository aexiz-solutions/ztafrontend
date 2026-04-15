import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";


type Props = {
  searchParams?: Promise<{ modal?: "approve" | "rollback" }>;
};

export default async function ExecutionCenterPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const showApprove = params?.modal === "approve";
  const showRollback = params?.modal === "rollback";
  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Execution Center" />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Execution Center</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.grid}>
            <article className={styles.col}>
              <h2>Execute Action</h2>
              <label className={styles.label}>Select Action</label>
              <input defaultValue="revoke_session" />
              <div className={styles.templateList}>
                <Link href="/admin/execution-center" className={styles.activeRow}>revoke_session</Link>
                <Link href="/admin/execution-center?template=send_otp_notification">send_otp_notification</Link>
                <Link href="/admin/execution-center?template=update_enrollment_status">update_enrollment_status</Link>
                <Link href="/admin/execution-center?template=export_pii_report">export_pii_report</Link>
              </div>
              <div className={styles.chipRow}><span className={styles.high}>High</span><span className={styles.irrev}>Irreversible</span></div>
              <div className={styles.warn}>Approval Required — this action will be queued for IT Head approval.</div>
              <label className={styles.label}>Input Fields</label>
              <input defaultValue="usr_482fa19fc3" />
              <input defaultValue="Suspicious login from unrecognized device" />
              <label className={styles.switch}><input type="checkbox" defaultChecked /><span /> notify_user</label>
              <Link href="/admin/execution-center?modal=approve" className={styles.cta}>Execute Action</Link>
            </article>

            <article className={styles.col}>
              <h2>Executions</h2>
              <div className={styles.tabs}><span className={styles.tabActive}>All</span><span>Pending</span><span>Running</span><span>Completed</span><span>Failed</span><span>Rolled Back</span></div>
              <ul className={styles.execList}>
                <li><strong>send_otp_notification</strong><span className={styles.done}>Completed</span></li>
                <li><strong>update_enrollment_status</strong><span className={styles.run}>Running</span></li>
                <li><strong>revoke_session</strong><span className={styles.fail}>Failed</span></li>
                <li><strong>export_pii_report</strong><span className={styles.rollback}>Rolled Back</span></li>
              </ul>
            </article>

            <article className={styles.col}>
              <h2>EXC-e842 <span className={styles.pending}>Pending Approval</span></h2>
              <p className={styles.muted}>Triggered by IT Head · 2 min ago</p>
              <div className={styles.timeline}>
                <p>Submitted</p><p>Validation passed</p><p>Queued for approval</p><p>Awaiting approval</p>
              </div>
              <div className={styles.events}>23:58:06 EXECUTION_QUEUED · IT Head<br />23:58:04 EXECUTION_SUBMITTED · IT Head</div>
              <div className={styles.actions}>
                <Link href="/admin/execution-center?modal=approve" className={styles.goodBtn}>Approve</Link>
                <Link href="/admin/execution-center?modal=rollback" className={styles.rollbackBtn}>Rollback</Link>
                <Link href="/admin/audit-log?frame=dashboard" className={styles.neutral}>Escalations</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      {showApprove ? (
        <>
          <Link href="/admin/execution-center" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Approve Execution</h3>
            <p className={styles.muted}>This action is irreversible. All active sessions for this user will be immediately terminated.</p>
            <input placeholder="Approval note (optional)" />
            <div className={styles.modalActions}>
              <Link href="/admin/execution-center" className={styles.neutral}>Cancel</Link>
              <Link href="/admin/audit-log" className={styles.goodBtn}>Approve Execution</Link>
            </div>
          </div>
        </>
      ) : null}
      {showRollback ? (
        <>
          <Link href="/admin/execution-center" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Rollback Execution</h3>
            <p className={styles.warn}>This action cannot be undone. Rollback will attempt to restore the previous state.</p>
            <input placeholder="Provide detailed reason for rollback..." />
            <div className={styles.modalActions}>
              <Link href="/admin/execution-center" className={styles.neutral}>Cancel</Link>
              <Link href="/admin/execution-center" className={styles.rollbackBtn}>Confirm Rollback</Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
