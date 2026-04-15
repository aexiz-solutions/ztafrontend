import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import { Fragment } from "react";
import styles from "./page.module.css";

type Source = {
  id: string;
  name: string;
  type: "ERPNext" | "PostgreSQL" | "MySQL" | "Google Sheets" | "Google Drive";
  readiness: "Ready" | "Incomplete" | "Error";
  ingested: "Yes" | "No";
  domains: string[];
  status: "Connected" | "Disconnected" | "Error" | "Paused";
  lastSync: string;
  error?: string;
  showActions?: boolean;
};

const sources: Source[] = [
  {
    id: "finance-erpnext",
    name: "Finance ERP",
    type: "ERPNext",
    readiness: "Ready",
    ingested: "Yes",
    domains: ["Finance", "Audit"],
    status: "Connected",
    lastSync: "2 hours ago",
    showActions: true,
  },
  {
    id: "hr-postgres",
    name: "HR Core DB",
    type: "PostgreSQL",
    readiness: "Incomplete",
    ingested: "No",
    domains: ["HR", "PeopleOps"],
    status: "Paused",
    lastSync: "5 days ago",
  },
  {
    id: "sales-sheet",
    name: "Sales Ops Sheet",
    type: "Google Sheets",
    readiness: "Ready",
    ingested: "Yes",
    domains: ["Sales", "Forecasting"],
    status: "Disconnected",
    lastSync: "30 minutes ago",
  },
  {
    id: "drive-contracts",
    name: "Contracts Drive",
    type: "Google Drive",
    readiness: "Error",
    ingested: "No",
    domains: ["Legal", "Compliance"],
    status: "Error",
    lastSync: "just now",
    error: "OAuth token expired. Reconnect source and re-run health check.",
  },
];


function ActionIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function DataSourcesPage() {
  return (
    <div className={styles.page}>
      <AdminSidebar activeLabel="Data Sources" />

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Admin / <strong>Data Sources</strong></div>
          <div className={styles.headerUser}>IT Head</div>
          <button type="button" className={styles.createButton}>
            Create Source
          </button>
        </header>

        <section className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Readiness</th>
                <th>Graph Ingested</th>
                <th>Binding Domains</th>
                <th>Status</th>
                <th>Last Sync</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <Fragment key={source.id}>
                  <tr
                    className={`${source.status === "Error" ? styles.rowError : ""} ${source.showActions ? styles.showActions : ""}`}
                  >
                    <td>
                      <Link href={`/admin/data-sources/${source.id}`} className={styles.nameLink}>
                        {source.name}
                      </Link>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`type${source.type.replace(" ", "")}`]}`}>
                        {source.type}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`ready${source.readiness}`]}`}>
                        {source.readiness}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`ingest${source.ingested}`]}`}>
                        {source.ingested}
                      </span>
                    </td>
                    <td>
                      <div className={styles.pills}>
                        {source.domains.map((domain) => (
                          <span key={domain} className={styles.pill}>
                            {domain}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.chip} ${styles[`status${source.status}`]}`}>
                        {source.status}
                      </span>
                    </td>
                    <td>{source.lastSync}</td>
                    <td>
                      <div className={styles.actions}>
                        <button type="button" aria-label="Edit">
                          <ActionIcon d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" />
                        </button>
                        <button type="button" aria-label="Test">
                          <ActionIcon d="M9 3v7a3 3 0 0 0 6 0V6h3v4a6 6 0 0 1-12 0V3z" />
                        </button>
                        <button type="button" aria-label="Health">
                          <ActionIcon d="M12 20s-7-4.7-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.3-7 10-7 10Z" />
                        </button>
                        <button type="button" aria-label="Sync">
                          <ActionIcon d="M20 7v5h-5M4 17v-5h5M6 9a7 7 0 0 1 12-2M18 15a7 7 0 0 1-12 2" />
                        </button>
                        <button type="button" aria-label="Resync">
                          <ActionIcon d="M21 8v4h-4M17 4v4h-4M3 16v-4h4M7 20v-4h4" />
                        </button>
                        <button type="button" aria-label="Enable or disable">
                          <ActionIcon d="M4 12a8 8 0 0 0 16 0 8 8 0 1 0-16 0Zm8-5v10" />
                        </button>
                        <button type="button" aria-label="Schema">
                          <ActionIcon d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
                        </button>
                        <button type="button" aria-label="History">
                          <ActionIcon d="M12 6v6l4 2M4 12a8 8 0 1 0 2.3-5.7M4 4v4h4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {source.error ? (
                    <tr>
                      <td colSpan={8} className={styles.errorCell}>
                        <details className={styles.errorDetails} open>
                          <summary>Source error details</summary>
                          <p>{source.error}</p>
                        </details>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
