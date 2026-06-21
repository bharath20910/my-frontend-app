import './ServiceSummary.css';

function ServiceSummary({ services = [] }) {
  if (!services.length) {
    return null;
  }

  return (
    <section className="service-summary" aria-label="Service summary">
      <div className="service-summary__header">
        <h2>Service Summary</h2>
      </div>

      <div className="service-summary__table">
        <div className="service-summary__row service-summary__row--head">
          <span>Service</span>
          <span>Your Referrals</span>
          <span>Active Referrals</span>
          <span>Total Ref Earnings</span>
        </div>

        {services.map((service) => (
          <div
            className="service-summary__row"
            key={service.service || service.service_name}
          >
            <span className="service-summary__service">
              {service.service || service.service_name}
            </span>
            <span>{service.yourReferrals ?? service.your_referrals}</span>
            <span>{service.activeReferrals ?? service.active_referrals}</span>
            <span>{service.totalRefEarnings ?? service.total_ref_earnings}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceSummary;
