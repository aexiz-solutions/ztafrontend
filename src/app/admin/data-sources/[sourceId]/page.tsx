type Props = {
  params: Promise<{ sourceId: string }>;
};

export default async function SourceDetailPage({ params }: Props) {
  const { sourceId } = await params;
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle at top, #232329, #151518 55%)",
        color: "#efefef",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <section
        style={{
          border: "1px solid #2a2a2e",
          borderRadius: "12px",
          padding: "20px",
          background: "#17171a",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.1rem" }}>Data source detail</h1>
        <p style={{ marginTop: "8px", color: "#a2a2ab" }}>
          Source ID: <code>{sourceId}</code>
        </p>
      </section>
    </main>
  );
}
