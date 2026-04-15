import Link from "next/link";
import { AdminSidebar } from "../admin-sidebar";
import styles from "./page.module.css";


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
      <AdminSidebar activeLabel="Pipeline Monitor" />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Pipeline Monitor</h1>
          <div className={styles.topBar}>
            <span className={styles.connected}><span /> Connected</span>
            <select><option>All tenants</option><option>acme.edu</option><option>globex.edu</option></select>
            <Link href="/admin/execution-center" className={styles.clearBtn}>Clear Feed</Link>
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
