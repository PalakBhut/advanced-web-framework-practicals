function Spinner() {
  return (
    <main className="page-content" style={{ padding: "4rem 1.5rem", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="state-card loading-card" role="status" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="spinner" aria-hidden="true" />
        <h3>Loading page...</h3>
        <p>Please wait while the page component is loading.</p>
      </div>
    </main>
  );
}

export default Spinner;