"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import styles from "./page.module.css";

const tenantDirectory = {
  acme: {
    name: "Acme University",
    domain: "@acme.edu",
    status: "Active",
    plan: "Enterprise",
    users: 1284,
    claims: 64219,
    created: "2025-02-11 09:12 UTC",
    lastActivity: "2026-04-15 09:42 UTC",
    createdBy: "Global Admin",
  },
  northwind: {
    name: "Northwind Labs",
    domain: "@northwind.ai",
    status: "Paused",
    plan: "Growth",
    users: 342,
    claims: 12941,
    created: "2025-04-29 13:24 UTC",
    lastActivity: "2026-04-13 17:08 UTC",
    createdBy: "Global Admin",
  },
  globex: {
    name: "Globex Institute",
    domain: "@globex.edu",
    status: "Active",
    plan: "Growth",
    users: 577,
    claims: 28103,
    created: "2025-01-08 08:15 UTC",
    lastActivity: "2026-04-14 18:31 UTC",
    createdBy: "Global Admin",
  },
  riverview: {
    name: "Riverview College",
    domain: "@riverview.edu",
    status: "Suspended",
    plan: "Starter",
    users: 91,
    claims: 3488,
    created: "2024-11-22 06:05 UTC",
    lastActivity: "2026-04-10 11:12 UTC",
    createdBy: "Global Admin",
  },
  helios: {
    name: "Helios Medical",
    domain: "@helios.health",
    status: "Active",
    plan: "Enterprise",
    users: 963,
    claims: 44102,
    created: "2025-03-17 15:40 UTC",
    lastActivity: "2026-04-15 08:27 UTC",
    createdBy: "Global Admin",
  },
} as const;

const statusOptions = ["Active", "Paused", "Suspended"] as const;
const planOptions = ["Starter", "Growth", "Enterprise"] as const;

type Status = (typeof statusOptions)[number];
type Plan = (typeof planOptions)[number];

const statusTone: Record<Status, string> = {
  Active: "#dff4e8",
  Paused: "#f6ead6",
  Suspended: "#fbe2e1",
};

const statusBorder: Record<Status, string> = {
  Active: "#9ad4b0",
  Paused: "#edc171",
  Suspended: "#eea09c",
};

const statusText: Record<Status, string> = {
  Active: "#2d7a4a",
  Paused: "#9c6b0a",
  Suspended: "#b85753",
};

const planDescriptions: Record<Plan, string> = {
  Starter: "Foundational tenant plan for pilot deployments.",
  Growth: "Operational default for active institutions.",
  Enterprise: "Expanded tenant for production-scale usage.",
};

export default function TenantDetailPage() {
  const params = useParams<{ subdomain: string }>();
  const searchParams = useSearchParams();
  const subdomain = params.subdomain;
  const tenant = tenantDirectory[subdomain as keyof typeof tenantDirectory] ?? {
    name: "Tenant profile",
    domain: `@${subdomain}.example`,
    status: "Active" as Status,
    plan: "Growth" as Plan,
    users: 0,
    claims: 0,
    created: "Unknown",
    lastActivity: "Unknown",
    createdBy: "Unavailable",
  };

  const frame = searchParams.get("frame") ?? "idle";
  const isEditFrame = frame === "edit";

  const [draftName, setDraftName] = useState<string>(tenant.name);
  const [draftStatus, setDraftStatus] = useState<Status>(tenant.status as Status);
  const [draftPlan, setDraftPlan] = useState<Plan>(tenant.plan as Plan);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const planHasChanged = draftPlan !== tenant.plan;
  const selectedPlanDescription = useMemo(() => planDescriptions[draftPlan], [draftPlan]);

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (planHasChanged) {
      setShowPlanModal(true);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.topNav}>
        <div className={styles.brandCluster}>
          <span className={styles.wordmark}>zta</span>
          <span className={styles.systemBadge}>System Admin</span>
        </div>
        <div className={styles.navRight}>
          <nav className={styles.navLinks} aria-label="System admin navigation">
            <Link href="/system-admin/tenants" className={styles.navLink}>
              Tenants
            </Link>
            <Link href="/admin/audit-log" className={styles.navLink}>
              Audit
            </Link>
            <Link href="/settings" className={styles.navLink}>
              Settings
            </Link>
          </nav>
          <Link href="/settings" className={styles.avatar} aria-label="User profile">
            SA
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/system-admin/tenants">Tenants</Link>
          <span>›</span>
          <strong>{tenant.name}</strong>
        </div>

        <section className={styles.layout}>
          <div className={styles.leftColumn}>
            <section className={styles.card}>
              <div className={styles.headRow}>
                <div>
                  <p className={styles.eyebrow}>Tenant Overview</p>
                  <h1>{tenant.name}</h1>
                  <p className={styles.subhead}>{subdomain} • {tenant.domain}</p>
                </div>
                <Link href={`/system-admin/tenants?frame=${isEditFrame ? "edit" : "idle"}`} className={styles.primaryGhost}>
                  {isEditFrame ? "Editing" : "Detail"}
                </Link>
              </div>

              <div className={styles.summaryRow}>
                <article className={styles.summaryBadge}>
                  <span>Status</span>
                  <strong style={{ background: statusTone[draftStatus], borderColor: statusBorder[draftStatus], color: statusText[draftStatus] }}>{draftStatus}</strong>
                </article>
                <article className={styles.summaryBadge}>
                  <span>Plan Tier</span>
                  <strong>{draftPlan}</strong>
                </article>
                <article className={styles.summaryBadge}>
                  <span>Users Count</span>
                  <strong>{tenant.users.toLocaleString()}</strong>
                </article>
                <article className={styles.summaryBadge}>
                  <span>Claims Count</span>
                  <strong>{tenant.claims.toLocaleString()}</strong>
                </article>
              </div>

              <form className={styles.form} onSubmit={handleSave}>
                <div className={styles.field}>
                  <label htmlFor="tenant-name">Tenant Name</label>
                  <input id="tenant-name" type="text" value={draftName} onChange={(event) => setDraftName(event.target.value)} readOnly={!isEditFrame} />
                </div>

                <div className={styles.splitFields}>
                  <div className={styles.field}>
                    <label htmlFor="status">Status</label>
                    <select id="status" value={draftStatus} onChange={(event) => setDraftStatus(event.target.value as Status)} disabled={!isEditFrame}>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="plan">Plan Tier</label>
                    <select id="plan" value={draftPlan} onChange={(event) => setDraftPlan(event.target.value as Plan)} disabled={!isEditFrame}>
                      {planOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <small className={styles.helper}>{selectedPlanDescription}</small>
                  </div>
                </div>

                <div className={styles.readonlyGrid}>
                  <div className={styles.field}>
                    <label>Email Domain</label>
                    <input value={tenant.domain} readOnly />
                  </div>
                  <div className={styles.field}>
                    <label>Subdomain</label>
                    <input value={subdomain} readOnly />
                  </div>
                  <div className={styles.field}>
                    <label>Created At</label>
                    <input value={tenant.created} readOnly />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.primaryCta}>
                    Save Changes
                  </button>
                  <Link href="/system-admin/tenants" className={styles.cancelLink}>
                    Cancel
                  </Link>
                </div>
              </form>
            </section>
          </div>

          <aside className={styles.rightColumn}>
            <section className={styles.statsCard}>
              <p className={styles.eyebrow}>Quick Stats</p>
              <div className={styles.statBlock}>
                <span>Created by</span>
                <strong>{tenant.createdBy}</strong>
              </div>
              <div className={styles.statBlock}>
                <span>Created date</span>
                <strong>{tenant.created}</strong>
              </div>
              <div className={styles.statBlock}>
                <span>Last activity</span>
                <strong>{tenant.lastActivity}</strong>
              </div>
              <div className={styles.metricStack}>
                <article>
                  <span>users_count</span>
                  <strong>{tenant.users.toLocaleString()}</strong>
                </article>
                <article>
                  <span>claims_count</span>
                  <strong>{tenant.claims.toLocaleString()}</strong>
                </article>
              </div>
              <Link href="/admin" className={styles.secondaryLink}>
                Open in IT Head View
              </Link>
            </section>
          </aside>
        </section>
      </main>

      {showPlanModal ? (
        <div className={styles.modalLayer} role="dialog" aria-modal="true" aria-labelledby="plan-change-title">
          <div className={styles.modalOverlay} onClick={() => setShowPlanModal(false)} />
          <section className={styles.modalCard}>
            <h2 id="plan-change-title">Confirm plan change</h2>
            <p>
              You are changing {tenant.name}&apos;s plan from {tenant.plan} to {draftPlan}. This may affect feature access immediately.
            </p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.modalSecondary} onClick={() => setShowPlanModal(false)}>
                Cancel
              </button>
              <button type="button" className={styles.primaryCta} onClick={() => setShowPlanModal(false)}>
                Confirm Change
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
