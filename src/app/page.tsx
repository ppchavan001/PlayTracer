export default function Home()
{
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        height: "100vh",
      }}
    >
      <aside
        style={{
          borderRight: "1px solid #333",
          padding: "1rem",
        }}
      >
        Filters
      </aside>

      <section
        style={{
          position: "relative",
        }}
      >
        Minimap
      </section>
    </main>
  );
}
