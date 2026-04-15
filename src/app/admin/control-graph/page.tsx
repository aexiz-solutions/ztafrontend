"use client";

import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

const tabs = ["Role Map", "Data Lineage", "Template Governance", "Recent Proofs"] as const;

const summaryCards = [
  { label: "Total Nodes", value: "186" },
  { label: "Total Edges", value: "428" },
  { label: "Last Rebuilt", value: "12 minutes ago" },
  { label: "Proof Count", value: "1,284" },
] as const;

const proofs = [
  { id: "PRF-2418", type: "Role Map", timestamp: "2 min ago", status: "Valid" },
  { id: "PRF-2407", type: "Template", timestamp: "11 min ago", status: "Valid" },
  { id: "PRF-2391", type: "Lineage", timestamp: "24 min ago", status: "Invalid" },
  { id: "PRF-2388", type: "Graph Rebuild", timestamp: "1 hr ago", status: "Valid" },
] as const;

const graphNodes = [
  { id: "role", label: "Roles", x: 14, y: 42, tone: "role" },
  { id: "policy", label: "Policies", x: 34, y: 25, tone: "policy" },
  { id: "tenant", label: "Tenants", x: 33, y: 62, tone: "tenant" },
  { id: "source", label: "Sources", x: 58, y: 25, tone: "source" },
  { id: "template", label: "Templates", x: 58, y: 63, tone: "template" },
  { id: "proof", label: "Proofs", x: 79, y: 44, tone: "proof" },
] as const;

const graphEdges = [
  [14, 42, 34, 25],
  [14, 42, 33, 62],
  [34, 25, 58, 25],
  [33, 62, 58, 63],
  [58, 25, 79, 44],
  [58, 63, 79, 44],
] as const;

const placeholderTabs = new Set(["Deep Dive", "Churn Risk", "SLO Compliance", "Capacity", "Degradation", "Regression"]);

function StatusChip({ status }: { status: string }) {
  const tone = status === "Valid" ? styles.validChip : styles.invalidChip;
  return <span className={`${styles.statusChip} ${tone}`}>{status}</span>;
}

export default function ControlGraphPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Role Map");
  const [showModal, setShowModal] = useState(false);

  const placeholderFrame = useMemo(() => placeholderTabs.has(activeTab), [activeTab]);

  return (
    <div className={styles.page}>
      <AdminSidebar />

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Operational graph</p>
            <h1>Control Graph</h1>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.outlineButton} onClick={() => setShowModal(true)}>
              Rebuild Graph
            </button>
            <button type="button" className={styles.iconButton} aria-label="Refresh graph">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 12a8 8 0 0 1-14.8 4H9m-5 0H4v-5m0 0a8 8 0 0 1 14.8-4H15m5 0v5" />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.summaryRow}>
          {summaryCards.map((card) => (
            <article key={card.label} className={styles.metricCard}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
        </div>

        <div className={styles.tabStrip} role="tablist" aria-label="Control graph sections">
          {tabs.map((tab) => (
            <button key={tab} type="button" className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <section className={styles.graphShell}>
          {activeTab === "Role Map" ? (
            <>
              <div className={styles.graphHeader}>
                <div>
                  <p className={styles.sectionLabel}>Role Map</p>
                  <h2>Graph visualization</h2>
                </div>
                <div className={styles.legendPanel}>
                  <div><span className={styles.roleDot} /> Role</div>
                  <div><span className={styles.policyDot} /> Policy</div>
                  <div><span className={styles.sourceDot} /> Source</div>
                  <div><span className={styles.templateDot} /> Template</div>
                </div>
              </div>
              <div className={styles.graphCard}>
                <svg viewBox="0 0 100 100" className={styles.graphViz} aria-hidden="true">
                  {graphEdges.map(([x1, y1, x2, y2], index) => (
                    <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
                  ))}
                  {graphNodes.map((node) => (
                    <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                      <circle className={`${styles[node.tone]}`} r="6" />
                      <text x="0" y="12">{node.label}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </>
          ) : null}

          {activeTab === "Data Lineage" ? (
            <div className={styles.placeholderCard}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={styles.sectionLabel}>Data Lineage</p>
                  <h2>Wireframe frame</h2>
                </div>
                <button type="button" className={styles.primaryButton}>
                  Apply Parameters
                </button>
              </div>
              <div className={styles.placeholderGrid}>
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
              </div>
              <div className={styles.placeholderChart} />
              <div className={styles.placeholderTable} />
            </div>
          ) : null}

          {activeTab === "Template Governance" ? (
            <div className={styles.placeholderCard}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={styles.sectionLabel}>Template Governance</p>
                  <h2>Wireframe frame</h2>
                </div>
                <button type="button" className={styles.primaryButton}>
                  Apply Parameters
                </button>
              </div>
              <div className={styles.placeholderGrid}>
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
              </div>
              <div className={styles.placeholderChart} />
              <div className={styles.placeholderTable} />
            </div>
          ) : null}

          {activeTab === "Recent Proofs" ? (
            <div className={styles.tableCard}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={styles.sectionLabel}>Recent Proofs</p>
                  <h2>Verification records</h2>
                </div>
                <button type="button" className={styles.primaryButton}>
                  Apply Parameters
                </button>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Proof ID</th>
                    <th>Type</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {proofs.map((proof) => (
                    <tr key={proof.id}>
                      <td>{proof.id}</td>
                      <td>{proof.type}</td>
                      <td>{proof.timestamp}</td>
                      <td><StatusChip status={proof.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {placeholderFrame ? (
            <div className={styles.placeholderCard}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <p className={styles.sectionLabel}>{activeTab}</p>
                  <h2>Wireframe frame</h2>
                </div>
                <button type="button" className={styles.primaryButton}>
                  Apply Parameters
                </button>
              </div>
              <div className={styles.placeholderGrid}>
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
                <div className={styles.placeholderKpi} />
              </div>
              <div className={styles.placeholderChart} />
              <div className={styles.placeholderTable} />
            </div>
          ) : null}
        </section>
      </main>

      {showModal ? (
        <div className={styles.modalLayer} role="dialog" aria-modal="true" aria-labelledby="rebuild-title">
          <div className={styles.modalOverlay} onClick={() => setShowModal(false)} />
          <section className={styles.modalCard}>
            <h2 id="rebuild-title">Confirm rebuild</h2>
            <p>
              Rebuilding the control graph may take several minutes and will temporarily affect query validation. Continue?
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.modalCancel} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="button" className={styles.primaryButton} onClick={() => setShowModal(false)}>
                Rebuild
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
