import Link from "next/link";
import styles from "./page.module.css";

const adminNav = [
  {
    section: "Administration",
    items: [
      { label: "Dashboard", href: "#", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Users", href: "/admin/users", icon: "M9 8a3 3 0 1 0 0-.01M3.5 18a6 6 0 0 1 11 0M16 8h5" },
      { label: "Access Governance", href: "/admin/access-governance", icon: "M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" },
      { label: "Data Sources", href: "/admin/data-sources", icon: "M4 5h16v14H4zM4 10h16M9 5v14" },
      { label: "Action Templates", href: "/admin/action-templates", icon: "M7 4h10v16H7zM10 8h4M10 12h4M10 16h4" },
      { label: "Execution Center", href: "/admin/execution-center", icon: "M12 4v16M7 8h10M7 16h10" },
      { label: "Pipeline Monitor", href: "/admin/pipeline-monitor", icon: "M4 19h16M7 16V8M12 16V5M17 16v-6", active: true },
      { label: "Interpreter Config", href: "/admin/interpreter-config", icon: "M12 3v18M7 8h10M7 16h10" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Integrations", href: "#", icon: "M10 13a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1 1M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7l1-1" },
      { label: "Settings", href: "/settings", icon: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm7.2 3.2-.09-1.09 1.68-1.3-1.6-2.77-2 .8a7.15 7.15 0 0 0-1.9-1.1l-.31-2.12h-3.2l-.31 2.12a7.15 7.15 0 0 0-1.9 1.1l-2-.8-1.6 2.77 1.68 1.3a7.2 7.2 0 0 0 0 2.18l-1.68 1.3 1.6 2.77 2-.8a7.15 7.15 0 0 0 1.9 1.1l.31 2.12h3.2l.31-2.12a7.15 7.15 0 0 0 1.9-1.1l2 .8 1.6-2.77-1.68-1.3c.06-.36.09-.72.09-1.09Z" },
    ],
  },
];

const pipelines = [
  { id: "pl_9f4ca7a1d2c3", persona: "IT Head", start: "00:15:02", stage: "Interpreting", faded: false },
  { id: "pl_44ba11a8e901", persona: "Faculty", start: "00:14:41", stage: "Fetching", faded: false },
  { id: "pl_0f8819dd2219", persona: "Student", start: "00:14:12", stage: "Done", faded: true },
  { id: "pl_772ea1b4c299", persona: "Dept Head", start: "00:13:54", stage: "Error", faded: true },
];

export default function PipelineMonitorPage() {
  const selected = pipelines[0];
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.adminBrand}>
          <span className={styles.brandShield}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 6 6v5c0 4.2 2.5 7 6 8 3.5-1 6-3.8 6-8V6z" /></svg></span>
          <span className={styles.brandText}>ZTA Admin</span>
        </div>
        {adminNav.map((group) => (
          <section key={group.section} className={styles.navGroup}>
            <p className={styles.groupTitle}>{group.section}</p>
            <nav className={styles.nav}>
              {group.items.map((item) => (
                <Link key={item.label} href={item.href} className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}>
                  <span className={styles.navIcon}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon} /></svg></span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              ))}
            </nav>
          </section>
        ))}
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Pipeline Monitor</h1>
          <div className={styles.topBar}>
            <span className={styles.connected}><span /> Connected</span>
            <select><option>All tenants</option><option>acme.edu</option><option>globex.edu</option></select>
            <button type="button" className={styles.clearBtn}>Clear Feed</button>
          </div>
        </header>
        <section className={styles.layout}>
          <article className={styles.left}>
            <h2>Active Pipelines</h2>
            <ul>
              {pipelines.map((p, i) => (
                <li key={p.id} className={`${i === 0 ? styles.selected : ""} ${p.faded ? styles.faded : ""}`}>
                  <div className={styles.mono}>{p.id.slice(0, 12)}...</div>
                  <div className={styles.row}><span className={styles.persona}>{p.persona}</span><span>{p.start}</span></div>
                  <span className={`${styles.stage} ${styles[`stage${p.stage}`]}`}>{p.stage}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.right}>
            <div className={styles.pipelineHead}>
              <h2>{selected.id}</h2>
              <span className={styles.persona}>{selected.persona}</span>
            </div>
            <div className={styles.timeline}>
              <div className={styles.node}><strong>Interpreting</strong><span>00:15:02</span><em>42ms</em><code>{`{"intent":"revoke_session","confidence":0.98}`}</code></div>
              <div className={styles.node}><strong>Compiling</strong><span>00:15:02</span><em>23ms</em><code>{`{"template":"revoke_session","approval":"required"}`}</code></div>
              <div className={styles.node}><strong>Fetching</strong><span>00:15:03</span><em>71ms</em><code>{`{"source":"session_store","records":1}`}</code></div>
              <div className={styles.node}><strong>Rendering</strong><span>00:15:03</span><em>18ms</em><code>{`{"view":"execution_prompt"}`}</code></div>
              <div className={`${styles.node} ${styles.error}`}><strong>Error</strong><span>00:15:04</span><em>11ms</em><code>{`{"error":"approval token expired","code":"EXC_401"}`}</code></div>
            </div>
            <h3>Stage Event Stream</h3>
            <div className={styles.stream}>
              00:15:02.104 STAGE_INTERPRETING START{"\n"}
              00:15:02.146 STAGE_INTERPRETING DONE 42ms{"\n"}
              00:15:02.202 STAGE_COMPILING DONE 23ms{"\n"}
              00:15:03.011 STAGE_FETCHING DONE 71ms{"\n"}
              00:15:04.002 STAGE_ERROR approval token expired
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
