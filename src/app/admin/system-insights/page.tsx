import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";

const tabs = [
  "Fleet Health",
  "Deep Dive",
  "Churn Risk",
  "LLM Costs",
  "SLO Compliance",
  "Capacity",
  "Degradation",
  "Regression",
  "Alerts",
] as const;


const fleetKpis = [
  { label: "Total Tenants", value: "248", spark: [12, 18, 16, 21, 24, 28, 31] },
  { label: "Active Tenants", value: "231", spark: [18, 20, 23, 22, 25, 27, 29] },
  { label: "Degraded Sources", value: "14", spark: [10, 12, 9, 15, 13, 16, 14] },
  { label: "Avg Response Time", value: "286 ms", spark: [320, 314, 302, 294, 289, 287, 286] },
] as const;

const connectorRows = [
  { name: "Admissions ERP", type: "ERPNext", status: "healthy", sync: "2m ago", latency: "128 ms" },
  { name: "HR Core", type: "PostgreSQL", status: "degraded", sync: "11m ago", latency: "421 ms" },
  { name: "Library Drive", type: "Google Drive", status: "healthy", sync: "5m ago", latency: "174 ms" },
  { name: "Finance Claims", type: "MySQL", status: "down", sync: "26m ago", latency: "--" },
] as const;

const llmTenantBars = [
  { tenant: "Acme University", cost: 88 },
  { tenant: "Northwind Labs", cost: 66 },
  { tenant: "Globex Institute", cost: 52 },
  { tenant: "Riverview College", cost: 34 },
  { tenant: "Helios Medical", cost: 29 },
] as const;

const llmSeries = [
  [18, 22, 19, 28, 31, 34, 29, 36, 41, 39, 44, 47, 52, 49],
  [12, 15, 14, 16, 19, 21, 20, 22, 25, 27, 29, 30, 31, 33],
] as const;

const alerts = [
  { severity: "Critical", title: "Tenant graph ingestion stalled", component: "Admissions ERP", timestamp: "2 min ago" },
  { severity: "High", title: "Policy lookup latency elevated", component: "Access Governance", timestamp: "11 min ago" },
  { severity: "Medium", title: "Model spend nearing daily threshold", component: "LLM Gateway", timestamp: "32 min ago" },
  { severity: "Low", title: "Capacity forecast drift detected", component: "Analytics Cache", timestamp: "1 hr ago" },
] as const;

const severityTone = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
} as const;

function Sparkline({ points }: { points: readonly number[] }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - ((point - min) / range) * 100;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className={styles.sparkline} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function buildLinePath(points: readonly number[]) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 100 - ((point - min) / range) * 100;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function FrameHeader({ title }: { title: string }) {
  return (
    <div className={styles.frameHeader}>
      <div>
        <p className={styles.frameEyebrow}>System Insights</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.frameActions}>
        <button type="button" className={styles.ghostButton}>
          Refresh
        </button>
        <button type="button" className={styles.primaryButton}>
          Apply Parameters
        </button>
      </div>
    </div>
  );
}

export default function SystemInsightsPage() {
  return (
    <div className={styles.page}>
      <AdminSidebar />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <div>
            <p className={styles.eyebrow}>Analytics hub</p>
            <h1>System Insights</h1>
          </div>
          <div className={styles.topActions}>
            <button type="button" className={styles.ghostButton}>
              Refresh
            </button>
            <button type="button" className={styles.primaryButton}>
              Apply Parameters
            </button>
          </div>
        </header>

        <div className={styles.tabStrip} role="tablist" aria-label="System insights tabs">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" className={`${styles.tab} ${index === 0 ? styles.tabActive : ""}`} role="tab" aria-selected={index === 0}>
              {tab}
            </button>
          ))}
        </div>

        <section className={styles.frameGrid}>
          <article className={styles.frameCard}>
            <FrameHeader title="Fleet Health" />
            <div className={styles.kpiRow}>
              {fleetKpis.map((kpi) => (
                <article key={kpi.label} className={styles.kpiCard}>
                  <span>{kpi.label}</span>
                  <strong>{kpi.value}</strong>
                  <Sparkline points={kpi.spark} />
                </article>
              ))}
            </div>

            <div className={styles.tableCard}>
              <div className={styles.tableHead}>
                <h3>Connector Health</h3>
                <span>7-day operational snapshot</span>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Source Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Last Sync</th>
                    <th>Latency</th>
                  </tr>
                </thead>
                <tbody>
                  {connectorRows.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[row.status]}`}>{row.status}</span>
                      </td>
                      <td>{row.sync}</td>
                      <td>{row.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className={styles.frameCard}>
            <FrameHeader title="LLM Costs" />
            <div className={styles.filterBar}>
              <label>
                Date range
                <select defaultValue="30d">
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </label>
              <label>
                Model
                <select defaultValue="gpt-5.4-mini">
                  <option value="gpt-5.4-mini">GPT-5.4 mini</option>
                  <option value="gpt-5.4">GPT-5.4</option>
                  <option value="gpt-4.1">GPT-4.1</option>
                </select>
              </label>
            </div>

            <div className={styles.kpiRowThree}>
              <article className={styles.kpiCard}>
                <span>Total Tokens</span>
                <strong>18.4M</strong>
              </article>
              <article className={styles.kpiCard}>
                <span>Estimated Cost</span>
                <strong>$12,480</strong>
              </article>
              <article className={styles.kpiCard}>
                <span>Avg Cost per Query</span>
                <strong>$0.18</strong>
              </article>
            </div>

            <div className={styles.chartGrid}>
              <section className={styles.chartCard}>
                <div className={styles.tableHead}>
                  <h3>Cost by Tenant</h3>
                  <span>Horizontal bars, coral accent</span>
                </div>
                <div className={styles.barList}>
                  {llmTenantBars.map((item) => (
                    <div key={item.tenant} className={styles.barRow}>
                      <span>{item.tenant}</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${item.cost}%` }} />
                      </div>
                      <strong>${item.cost.toFixed(0)}k</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.chartCard}>
                <div className={styles.tableHead}>
                  <h3>Daily Token Usage</h3>
                  <span>Selected period</span>
                </div>
                <div className={styles.lineChart}>
                  <svg viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
                    <path className={styles.lineBack} d={buildLinePath(llmSeries[1])} />
                    <path className={styles.lineFront} d={buildLinePath(llmSeries[0])} />
                  </svg>
                  <div className={styles.lineLabels}>
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                  </div>
                </div>
              </section>
            </div>
          </article>

          <article className={styles.frameCard}>
            <FrameHeader title="Alerts" />
            <div className={styles.severityTabs} role="tablist" aria-label="Alert severity filters">
              {["All", "Critical", "High", "Medium", "Low"].map((item, index) => (
                <button key={item} type="button" className={`${styles.severityTab} ${index === 0 ? styles.severityActive : ""}`}>
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.alertList}>
              {alerts.map((item) => (
                <div key={item.title} className={styles.alertItem}>
                  <span className={`${styles.alertBadge} ${styles[severityTone[item.severity]]}`}>{item.severity}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.component}</p>
                  </div>
                  <div className={styles.alertMeta}>
                    <span>{item.timestamp}</span>
                    <button type="button" className={styles.ghostButtonSmall}>
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.emptyState}>
              <span className={styles.checkMark}>✓</span>
              <div>
                <strong>All clear — no active alerts</strong>
                <p>The alert stream is empty for the selected scope.</p>
              </div>
            </div>
          </article>

          <article className={styles.frameCard}>
            <FrameHeader title="Deep Dive" />
            <div className={styles.placeholderShell}>
              <div className={styles.placeholderGrid}>
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
              </div>
              <div className={styles.placeholderChart} />
              <div className={styles.placeholderTable} />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
