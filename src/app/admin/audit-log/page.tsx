import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";


type Props = {
  searchParams?: Promise<{
    frame?: string;
  }>;
};

export default async function AuditLogPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const showDashboard = resolvedSearchParams?.frame === "dashboard";
  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Audit Log" />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Audit Log</strong></div>
          <div className={styles.headerUser}>IT Head</div>
        </header>

        {!showDashboard ? (
          <section className={styles.content}>
            <div className={styles.pageTop}>
              <h1>Audit Log</h1>
              <div className={styles.topActions}>
                <Link href="/admin/audit-log" className={styles.primaryBtn}>Apply Filters</Link>
                <Link href="/admin/compliance-center?tab=forensic-export" className={styles.neutralBtn}>Export</Link>
                <Link href="/admin/audit-log?frame=dashboard" className={styles.neutralBtn}>Open Dashboard</Link>
              </div>
            </div>

            <div className={styles.filterBar}>
              <input placeholder="Search user..." />
              <select defaultValue="All departments">
                <option>All departments</option>
                <option>Admissions</option>
                <option>Finance</option>
                <option>Library</option>
              </select>
              <input type="date" />
              <input type="date" />
              <Link href="/admin/audit-log?filter=blocked" className={styles.blockedToggle}>Blocked only</Link>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Query Text</th>
                    <th>Intent Hash</th>
                    <th>Domains Accessed</th>
                    <th>Blocked</th>
                    <th>Block Reason</th>
                    <th className={styles.right}>Latency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.mono}>2026-04-14 22:12:45</td>
                    <td>Riya Sharma <span className={`${styles.chip} ${styles.persona}`}>Student</span></td>
                    <td className={styles.query}>Show my pending fee details for semester 6...</td>
                    <td className={styles.mono}>A3F90C2D</td>
                    <td><span className={styles.pill}>Finance</span><span className={styles.pill}>Admissions</span></td>
                    <td />
                    <td />
                    <td className={styles.right}>224ms</td>
                  </tr>
                  <tr className={styles.blockedRow}>
                    <td className={styles.mono}>2026-04-14 22:10:01</td>
                    <td>Karan Mehta <span className={`${styles.chip} ${styles.persona}`}>Faculty</span></td>
                    <td className={styles.query}>Dump all student PII including phone and address...</td>
                    <td className={styles.mono}>F0B11E44</td>
                    <td><span className={styles.pill}>Admissions</span></td>
                    <td><span className={`${styles.chip} ${styles.blocked}`}>Blocked</span></td>
                    <td className={styles.muted}>PII policy violation</td>
                    <td className={styles.right}>118ms</td>
                  </tr>
                  <tr className={styles.expanded}>
                    <td colSpan={8}>
                      <strong>Full query:</strong> Dump all student PII including phone and address by department.
                      <br />
                      <span className={styles.muted}>Response summary: Request blocked by policy engine due to restricted fields.</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.mono}>2026-04-14 21:54:13</td>
                    <td>Aditi Nair <span className={`${styles.chip} ${styles.persona}`}>Dept Head</span></td>
                    <td className={styles.query}>Give timetable overlap report for CSE section B...</td>
                    <td className={styles.mono}>11BD92A1</td>
                    <td><span className={styles.pill}>Academics</span></td>
                    <td />
                    <td />
                    <td className={styles.right}>341ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.pagination}>
              <span>Showing 1–50</span>
              <div>
                <Link href="/admin/audit-log?page=1" className={styles.neutralBtn}>Prev</Link>
                <Link href="/admin/audit-log?page=2" className={styles.neutralBtn}>Next</Link>
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.content}>
            <div className={styles.pageTop}>
              <h1>Audit Dashboard</h1>
              <Link href="/admin/audit-log" className={styles.neutralBtn}>Open Explorer</Link>
            </div>
            <div className={styles.kpis}>
              <article className={styles.kpi}><p>Total Queries</p><h2>24,680</h2></article>
              <article className={styles.kpi}><p>Blocked Queries</p><h2>1,243</h2></article>
              <article className={styles.kpi}><p>Unique Users</p><h2>892</h2></article>
              <article className={styles.kpi}><p>Avg Latency</p><h2>286ms</h2></article>
            </div>
            <div className={styles.chart}>
              <h3>Daily Query Volume</h3>
              <div className={styles.chartMock}>
                <div className={styles.coralLine} />
                <div className={styles.redArea} />
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th>Intent Hash</th><th>Count</th><th>Last Seen</th></tr>
                </thead>
                <tbody>
                  <tr><td className={styles.mono}>A3F90C2D</td><td>2,140</td><td>2 mins ago</td></tr>
                  <tr><td className={styles.mono}>11BD92A1</td><td>1,872</td><td>5 mins ago</td></tr>
                  <tr><td className={styles.mono}>F0B11E44</td><td>1,043</td><td>7 mins ago</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
