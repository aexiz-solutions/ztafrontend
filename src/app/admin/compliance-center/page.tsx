import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";


type Props = {
  searchParams?: Promise<{
    tab?: "summary" | "forensic-export" | "retention" | "cases";
    frame?: "list" | "detail";
    modal?: "legal-hold";
  }>;
};

export default async function ComplianceCenterPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const tab = params?.tab ?? "summary";
  const frame = params?.frame ?? "list";
  const showCaseDetail = tab === "cases" && frame === "detail";
  const showLegalHoldModal = showCaseDetail && params?.modal === "legal-hold";

  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Compliance Center" />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Compliance Center</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>
        <section className={styles.content}>
          <div className={styles.shell}>
            <aside className={styles.innerNav}>
              <p>COMPLIANCE CENTER</p>
              <Link href="/admin/compliance-center?tab=summary" className={tab === "summary" ? styles.innerActive : ""}>Summary</Link>
              <Link href="/admin/compliance-center?tab=forensic-export" className={tab === "forensic-export" ? styles.innerActive : ""}>Forensic Export</Link>
              <Link href="/admin/compliance-center?tab=retention" className={tab === "retention" ? styles.innerActive : ""}>Retention</Link>
              <Link href="/admin/compliance-center?tab=cases" className={tab === "cases" ? styles.innerActive : ""}>Cases</Link>
            </aside>
            <div className={styles.panel}>
              {tab === "summary" ? (
                <>
                  <h1>Compliance Center</h1>
                  <p className={styles.muted}>Audit, retention, enforcement and case management.</p>
                  <div className={styles.kpis}>
                    <article><span>Total Queries</span><h3>1,284,902</h3></article>
                    <article><span>Legal Holds</span><h3>14</h3></article>
                    <article><span>Open Cases</span><h3>7</h3></article>
                    <article><span>Retention Window</span><h3>11 Apr</h3></article>
                  </div>
                  <div className={styles.bar}><div style={{ width: "78%" }} /></div>
                  <table className={styles.table}>
                    <thead><tr><th>Timestamp</th><th>Actor</th><th>Department</th><th>Event</th><th>Status</th></tr></thead>
                    <tbody>
                      <tr><td>Apr 14 22:46</td><td>nadia.chen</td><td>Legal</td><td>Document QA</td><td><span className={styles.good}>PASS</span></td></tr>
                      <tr><td>Apr 14 22:39</td><td>ajay.nair</td><td>Engineering</td><td>Code Gen</td><td><span className={styles.good}>PASS</span></td></tr>
                      <tr><td>Apr 14 22:31</td><td>liya.park</td><td>HR</td><td>PI Lookup</td><td><span className={styles.bad}>BLOCK</span></td></tr>
                    </tbody>
                  </table>
                </>
              ) : null}
              {tab === "forensic-export" ? (
                <div className={styles.split}>
                  <article className={styles.box}>
                    <h2>Configure Export</h2>
                    <input placeholder="Case ID, user ID, or hash..." />
                    <input placeholder="Select date range..." />
                    <label><input type="checkbox" defaultChecked /> Include PII</label>
                    <Link href="/admin/compliance-center?tab=forensic-export&frame=list" className={styles.cta}>Create Export</Link>
                  </article>
                  <article className={styles.box}>
                    <h2>Export Jobs</h2>
                    <ul>
                      <li>EXP-008 · completed <Link href="/admin/audit-log">Download</Link></li>
                      <li>EXP-006 · queued</li>
                      <li>EXP-005 · failed <Link href="/admin/audit-log">Download</Link></li>
                    </ul>
                  </article>
                </div>
              ) : null}
              {tab === "retention" ? (
                <>
                  <div className={styles.alert}>Data retention settings are irreversible. Deleted records cannot be restored.</div>
                  <div className={styles.split}>
                    <article className={styles.box}>
                      <h2>Current Retention Policy</h2>
                      <p>Session data · 90 days</p>
                      <p>Audit logs · 4 years</p>
                      <p>Legal holds · until release</p>
                    </article>
                    <article className={styles.box}>
                      <h2>Execute Retention</h2>
                      <Link href="/admin/compliance-center?tab=retention&frame=list" className={styles.neutral}>Run Dry Run</Link>
                      <Link href="/admin/compliance-center?tab=cases" className={styles.danger}>Execute Retention</Link>
                    </article>
                  </div>
                </>
              ) : null}
              {tab === "cases" && !showCaseDetail ? (
                <>
                  <div className={styles.caseHead}>
                    <h2>Cases</h2>
                    <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.cta}>Create Case</Link>
                  </div>
                  <table className={styles.table}>
                    <thead><tr><th>Case ID</th><th>Summary</th><th>Severity</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                      <tr><td>CSE-0090</td><td>Suspected PI exfiltration — contractor account</td><td>Critical</td><td>Open</td><td><Link href="/admin/compliance-center?tab=cases&frame=detail">View</Link></td></tr>
                      <tr><td>CSE-0088</td><td>Unresolved PII access — old query template</td><td>High</td><td>Review</td><td><Link href="/admin/compliance-center?tab=cases&frame=detail">View</Link></td></tr>
                    </tbody>
                  </table>
                </>
              ) : null}
              {showCaseDetail ? (
                <div className={styles.split}>
                  <article className={styles.box}>
                    <h2>CSE-0090 — Suspected PI exfiltration</h2>
                    <p className={styles.muted}>Case details</p>
                    <ul className={styles.list}>
                      <li>Status: Open</li>
                      <li>Owner: IT Head</li>
                      <li>Created: 14 Apr 2026</li>
                    </ul>
                  </article>
                  <article className={styles.box}>
                    <h2>Actions</h2>
                    <Link href="/admin/compliance-center?tab=cases&frame=detail&modal=legal-hold" className={styles.neutral}>Legal Hold</Link>
                    <Link href="/admin/audit-log" className={styles.goodBtn}>Approve Case</Link>
                    <Link href="/admin/compliance-center?tab=cases" className={styles.danger}>Close Case</Link>
                    <Link href="/admin/compliance-center?tab=cases&frame=detail&modal=legal-hold" className={styles.danger}>Disable Legal Hold</Link>
                  </article>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      {showLegalHoldModal ? (
        <>
          <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.overlay} />
          <div className={styles.modal}>
            <h3>Disable Legal Hold?</h3>
            <p>Disabling the legal hold will enable this case record for deletion.</p>
            <div className={styles.modalActions}>
              <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.neutral}>Cancel</Link>
              <Link href="/admin/compliance-center?tab=cases&frame=detail" className={styles.danger}>Disable Legal Hold</Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
