"use client";

import { useState } from "react";
import styles from "./sign-in.module.css";

export default function SignInPage() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [showError, setShowError] = useState(true);

  return (
    <main className={styles.screen}>
      <section className={styles.card}>
        <div className={styles.brandWrap}>
          <span className={styles.logo} aria-hidden="true" />
          <span className={styles.wordmark}>zta</span>
        </div>

        <h1 className={styles.title}>Sign in to ZTA</h1>

        <div className={styles.providerStack}>
          <button type="button" className={styles.providerBtn}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M21.8 12.23c0-.7-.06-1.38-.17-2.03H12v3.84h5.5a4.7 4.7 0 0 1-2.04 3.09v2.57h3.3c1.93-1.77 3.04-4.4 3.04-7.47Z" />
              <path fill="currentColor" d="M12 22c2.76 0 5.08-.92 6.77-2.5l-3.3-2.57c-.92.62-2.1.99-3.47.99-2.67 0-4.93-1.8-5.73-4.21H2.86v2.66A10 10 0 0 0 12 22Z" />
              <path fill="currentColor" d="M6.27 13.7A5.98 5.98 0 0 1 6 12c0-.59.1-1.16.27-1.7V7.64H2.86A10 10 0 0 0 2 12c0 1.62.39 3.15 1.08 4.36L6.27 13.7Z" />
              <path fill="currentColor" d="M12 6.08c1.5 0 2.85.52 3.9 1.53l2.92-2.92C17.07 3.06 14.75 2 12 2A10 10 0 0 0 2.86 7.64l3.41 2.66C7.07 7.88 9.33 6.08 12 6.08Z" />
            </svg>
            Continue with Google
          </button>

          <button type="button" className={styles.providerBtn}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 11V8a5 5 0 1 1 10 0v3" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            Continue with OIDC
          </button>
        </div>

        <div className={styles.divider}>or</div>

        <section className={styles.adminBlock}>
          <button type="button" className={styles.adminToggle} onClick={() => setAdminOpen((v) => !v)}>
            System Admin (Dev Only)
          </button>
          {adminOpen ? (
            <div className={styles.adminBody}>
              <input className={styles.input} placeholder="Username" />
              <input className={styles.input} type="password" placeholder="Password" />
              <button type="button" className={styles.mockButton}>
                Mock Login
              </button>
            </div>
          ) : null}
        </section>

        {showError ? (
          <div className={styles.errorPanel} role="alert">
            <span>Login failed. Please verify your credentials and try again.</span>
            <button type="button" className={styles.dismiss} onClick={() => setShowError(false)}>
              Dismiss
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
