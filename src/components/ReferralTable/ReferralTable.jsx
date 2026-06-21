import { useNavigate } from 'react-router-dom';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import './ReferralTable.css';

function ReferralTable({ referrals = [] }) {
  const navigate = useNavigate();

  if (!referrals.length) {
    return null;
  }

  return (
    <section className="referral-table" aria-label="Referrals">
      <div className="referral-table__header">
        <h2>Referrals</h2>
      </div>

      <div className="referral-table__content">
        <div className="referral-table__row referral-table__row--head">
          <span>Name</span>
          <span>Service</span>
          <span>Date</span>
          <span>Profit</span>
        </div>

        {referrals.map((referral) => {
          const id = referral.id || referral.referral_id;
          const name = referral.name || referral.customer_name;
          const service = referral.service || referral.service_name;
          const date = referral.date || referral.created_at;
          const profit = referral.profit ?? referral.ref_profit;

          return (
            <button
              className="referral-table__row referral-table__row--button"
              key={id}
              type="button"
              onClick={() => navigate(`/referral/${id}`)}
            >
              <span className="referral-table__name">{name}</span>
              <span>{service}</span>
              <span>{formatDate(date)}</span>
              <span>{formatCurrency(profit)}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ReferralTable;
