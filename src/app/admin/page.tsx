import Link from "next/link";
import { AdminSidebar } from "./admin-sidebar";
import styles from "./page.module.css";

const quickLinks = [
  { label: "Access Governance", href: "/admin/access-governance" },
  { label: "Control Graph", href: "/admin/control-graph" },
  { label: "System Insights", href: "/admin/system-insights" },
  { label: "Users", href: "/admin/users" },
  { label: "Audit Log", href: "/admin/audit-log" },
  { label: "Compliance Center", href: "/admin/compliance-center" },
  { label: "Data Sources", href: "/admin/data-sources" },
  { label: "Execution Center", href: "/admin/execution-center" },
];


export default function AdminHomePage() {
  return (
    <main className={styles.page}>
      <AdminSidebar />

      <section className={styles.shell}>
        <p className={styles.eyebrow}>Tenant / Admin</p>
        <h1>IT Head View</h1>
        <p className={styles.subhead}>
          Operational surface for tenant management, policy review, and execution oversight.
        </p>

        <div className={styles.cardGrid}>
          {quickLinks.map((item) => (
            <Link key={item.label} href={item.href} className={styles.cardLink}>
              <span>{item.label}</span>
              <strong>Open</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
