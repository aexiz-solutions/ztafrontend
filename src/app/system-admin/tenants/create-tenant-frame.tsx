"use client";

import { type FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./create-tenant-frame.module.css";

const topNavLinks = [
  { label: "Tenants", href: "/system-admin/tenants", active: true },
  { label: "Audit", href: "/admin/audit-log" },
  { label: "Settings", href: "/settings" },
];

const planOptions = [
  {
    id: "starter",
    name: "Starter",
    description: "Small tenant setup for pilots and evaluation environments.",
  },
  {
    id: "growth",
    name: "Growth",
    description: "Balanced default for active academic or operational tenants.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Full-scale configuration for production and multi-department use.",
  },
] as const;

const personaSeeds = [
  { persona: "Student", email: "student@sample.edu" },
  { persona: "Faculty", email: "faculty@sample.edu" },
  { persona: "Dept Head", email: "dept.head@sample.edu" },
  { persona: "IT Head", email: "it.head@sample.edu" },
] as const;

const planMetrics = {
  starter: { graphNodes: 12, users: 4, claims: 12 },
  growth: { graphNodes: 18, users: 6, claims: 24 },
  enterprise: { graphNodes: 26, users: 8, claims: 36 },
} as const;

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CreateTenantFrame() {
  const [tenantName, setTenantName] = useState("Acme University");
  const [emailDomain, setEmailDomain] = useState("university.edu.in");
  const [subdomain, setSubdomain] = useState("");
  const [planTier, setPlanTier] = useState<keyof typeof planMetrics>("growth");
  const [seedMockUsers, setSeedMockUsers] = useState(true);
  const [seedMockClaims, setSeedMockClaims] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const generatedSubdomain = useMemo(() => subdomain.trim() || slugify(tenantName) || "new-tenant", [subdomain, tenantName]);
  const metrics = planMetrics[planTier];
  const seededEmails = seedMockUsers
    ? personaSeeds.slice(0, metrics.users).map((entry, index) => ({
        persona: entry.persona,
        email: `${slugify(tenantName) || "tenant"}.${index + 1}@${emailDomain.trim() || "university.edu.in"}`,
      }))
    : [];
  const warnings = useMemo(() => {
    const notes: string[] = [];
    if (!subdomain.trim()) {
      notes.push("Subdomain will be auto-generated from the tenant name.");
    }
    if (!seedMockUsers) {
      notes.push("Mock users were not seeded for this tenant.");
    }
    if (!seedMockClaims) {
      notes.push("Mock claims were not seeded for this tenant.");
    }
    return notes;
  }, [seedMockClaims, seedMockUsers, subdomain]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setTenantName("Acme University");
    setEmailDomain("university.edu.in");
    setSubdomain("");
    setPlanTier("growth");
    setSeedMockUsers(true);
    setSeedMockClaims(true);
    setSubmitted(false);
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
            {topNavLinks.map((item) => (
              <Link key={item.label} href={item.href} className={`${styles.navLink} ${item.active ? styles.navLinkActive : ""}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/settings" className={styles.avatar} aria-label="User profile">
            SA
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        {!submitted ? (
          <section className={styles.shell}>
            <div className={styles.head}>
              <div>
                <p className={styles.eyebrow}>System Admin / Tenants</p>
                <h1>Create Tenant</h1>
                <p className={styles.subhead}>Light-weight provisioning shell for tenant setup and seeded test data.</p>
              </div>
              <Link href="/system-admin/tenants" className={styles.backLink}>
                Back to tenants
              </Link>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="tenant-name">Tenant Name</label>
                <input id="tenant-name" type="text" value={tenantName} onChange={(event) => setTenantName(event.target.value)} />
              </div>

              <div className={styles.field}>
                <label htmlFor="email-domain">Email Domain</label>
                <input
                  id="email-domain"
                  type="text"
                  placeholder="university.edu.in"
                  value={emailDomain}
                  onChange={(event) => setEmailDomain(event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="subdomain">Subdomain</label>
                <input
                  id="subdomain"
                  type="text"
                  placeholder="auto-generated if empty"
                  value={subdomain}
                  onChange={(event) => setSubdomain(event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Plan Tier</label>
                <div className={styles.planGrid} role="radiogroup" aria-label="Plan tier">
                  {planOptions.map((option) => (
                    <label key={option.id} className={`${styles.planCard} ${planTier === option.id ? styles.planCardActive : ""}`}>
                      <input
                        type="radio"
                        name="plan-tier"
                        value={option.id}
                        checked={planTier === option.id}
                        onChange={() => setPlanTier(option.id)}
                      />
                      <span className={styles.planTitle}>{option.name}</span>
                      <span className={styles.planDesc}>{option.description}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className={styles.checkRow}>
                <input type="checkbox" checked={seedMockUsers} onChange={(event) => setSeedMockUsers(event.target.checked)} />
                <span>
                  <strong>Seed Mock Users</strong>
                  <small>Creates sample users for each persona type</small>
                </span>
              </label>

              <label className={styles.checkRow}>
                <input type="checkbox" checked={seedMockClaims} onChange={(event) => setSeedMockClaims(event.target.checked)} />
                <span>
                  <strong>Seed Mock Claims</strong>
                  <small>Populates sample data claims for testing</small>
                </span>
              </label>

              <div className={styles.actions}>
                <button type="submit" className={styles.createCta}>
                  Create Tenant
                </button>
                <button type="button" className={styles.resetLink} onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className={styles.shell}>
            <div className={styles.successBanner}>Tenant created successfully</div>

            <div className={styles.resultHead}>
              <div>
                <p className={styles.eyebrow}>Provisioned tenant</p>
                <h1>{tenantName}</h1>
                <p className={styles.subhead}>{generatedSubdomain} · {emailDomain}</p>
              </div>
              <div className={styles.resultActions}>
                <Link href={`/system-admin/tenants/${generatedSubdomain}`} className={styles.createCta}>
                  Open Tenant
                </Link>
                <button type="button" className={styles.resetLink} onClick={handleReset}>
                  Create Another
                </button>
              </div>
            </div>

            <div className={styles.summaryGrid}>
              <article className={styles.summaryCard}>
                <span>Graph node count</span>
                <strong>{metrics.graphNodes}</strong>
              </article>
              <article className={styles.summaryCard}>
                <span>Users seeded</span>
                <strong>{seedMockUsers ? metrics.users : 0}</strong>
              </article>
              <article className={styles.summaryCard}>
                <span>Claims seeded</span>
                <strong>{seedMockClaims ? metrics.claims : 0}</strong>
              </article>
            </div>

            <section className={styles.tableCard}>
              <h2>Seeded Emails</h2>
              {seededEmails.length > 0 ? (
                <table className={styles.emailTable}>
                  <thead>
                    <tr>
                      <th>Persona</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seededEmails.map((item) => (
                      <tr key={item.persona}>
                        <td>{item.persona}</td>
                        <td><span>{item.email}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className={styles.emptyState}>No seeded users were requested for this tenant.</p>
              )}
            </section>

            {warnings.length > 0 ? <div className={styles.warningBanner}>{warnings.join(" ")}</div> : null}
          </section>
        )}
      </main>
    </div>
  );
}
