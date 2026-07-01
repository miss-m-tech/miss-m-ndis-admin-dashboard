export default function Invoices() {
  return (
    <main className="page">
      <h1>Invoice Health Check</h1>

      <p>
        Upload or enter NDIS invoices here to check for maths errors,
        duplicate claims, budget impact, and possible red flags.
      </p>

      <section className="card">
        <h2>Coming next</h2>
        <ul>
          <li>Manual invoice entry</li>
          <li>Budget checks</li>
          <li>Duplicate claim detection</li>
          <li>NDIS price guide checks</li>
        </ul>
      </section>
    </main>
  );
}
