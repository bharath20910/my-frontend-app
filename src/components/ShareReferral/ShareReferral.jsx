import './ShareReferral.css';

function ShareReferral({ referralLink = '', referralCode = '' }) {
  if (!referralLink && !referralCode) {
    return null;
  }

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <section className="share-referral" aria-label="Share referral">
      <h2>Share Referral</h2>

      <div className="share-referral__grid">
        <div className="share-referral__field">
          <label htmlFor="referral-link">Referral Link</label>
          <div className="share-referral__control">
            <input id="referral-link" type="text" value={referralLink} readOnly />
            <button type="button" onClick={() => copyToClipboard(referralLink)}>
              Copy
            </button>
          </div>
        </div>

        <div className="share-referral__field">
          <label htmlFor="referral-code">Referral Code</label>
          <div className="share-referral__control">
            <input id="referral-code" type="text" value={referralCode} readOnly />
            <button type="button" onClick={() => copyToClipboard(referralCode)}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShareReferral;
