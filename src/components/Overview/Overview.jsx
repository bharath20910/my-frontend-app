import './Overview.css';

function Overview({ metrics = [] }) {
  if (!metrics.length) {
    return null;
  }

  return (
    <section className="overview" aria-label="Overview">
      {metrics.map((metric) => (
        <article className="overview__card" key={metric.label}>
          <p className="overview__label">{metric.label}</p>
          <p className="overview__value">{metric.value}</p>
        </article>
      ))}
    </section>
  );
}

export default Overview;
