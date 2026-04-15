import Link from "next/link";
import styles from "./page.module.css";
import { CreateTenantFrame } from "./create-tenant-frame";

const topNavLinks = [
  { label: "Tenants", href: "/system-admin/tenants", active: true },
  { label: "Audit", href: "/admin/audit-log" },
  { label: "Settings", href: "/settings" },
];

const tabs = ["All", "Active", "Paused", "Suspended"] as const;

const tenants = [
  { name: "Acme University", domain: "@acme.edu", subdomain: "acme", status: "Active", plan: "Enterprise", users: 1284, claims: 64219, created: "2025-02-11" },
  { name: "Northwind Labs", domain: "@northwind.ai", subdomain: "northwind", status: "Paused", plan: "Growth", users: 342, claims: 12941, created: "2025-04-29" },
  { name: "Globex Institute", domain: "@globex.edu", subdomain: "globex", status: "Active", plan: "Growth", users: 577, claims: 28103, created: "2025-01-08" },
  { name: "Riverview College", domain: "@riverview.edu", subdomain: "riverview", status: "Suspended", plan: "Starter", users: 91, claims: 3488, created: "2024-11-22" },
  { name: "Helios Medical", domain: "@helios.health", subdomain: "helios", status: "Active", plan: "Enterprise", users: 963, claims: 44102, created: "2025-03-17" },
] as const;

type Props = {
  searchParams?: Promise<{ frame?: string }>;
};

export default async function TenantListPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  if (params?.frame === "create") {
    return <CreateTenantFrame />;
  }

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
        <CreateTenantFrame />
        <section className={styles.contentCard}>
          <div className={styles.head}>
            <div>
              <h1>Tenants</h1>
              <div className={styles.tabs} role="tablist" aria-label="Tenant status filter">
                {tabs.map((tab) => (
                  <button key={tab} type="button" className={`${styles.tab} ${tab === "Active" ? styles.tabActive : ""}`} role="tab" aria-selected={tab === "Active"}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <Link href="/system-admin/tenants?frame=create" className={styles.createBtn}>Create Tenant</Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Domain</th>
                  <th>Subdomain</th>
                  <th>Status</th>
                  <th>Plan</th>
                  <th className={styles.alignRight}>Users Count</th>
                  <th className={styles.alignRight}>Claims Count</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant.subdomain} className={styles.tableRow}>
                    <td className={styles.nameCell}>{tenant.name}</td>
                    <td className={styles.monoCell}>{tenant.domain}</td>
                    <td className={styles.monoCell}>{tenant.subdomain}</td>
                    <td><span className={`${styles.chip} ${styles[`status${tenant.status}`]}`}>{tenant.status}</span></td>
                    <td><span className={`${styles.chip} ${styles[`plan${tenant.plan}`]}`}>{tenant.plan}</span></td>
                    <td className={`${styles.alignRight} ${styles.numberCell}`}>{tenant.users.toLocaleString()}</td>
                    <td className={`${styles.alignRight} ${styles.numberCell}`}>{tenant.claims.toLocaleString()}</td>
                    <td className={styles.createdCell}>{tenant.created}</td>
                    <td>
                      <Link href={`/system-admin/tenants/${tenant.subdomain}`} className={styles.openLink}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
