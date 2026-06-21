export const LOGIN_API_URL =
  'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin';

export const REFERRALS_API_URL =
  'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals';

export function getReferrals(data) {
  return data?.referrals || data?.referralList || data?.referral_list || [];
}

export function getServiceSummary(data) {
  return data?.serviceSummary || data?.service_summary || data?.services || [];
}

export function getReferralLink(data) {
  return data?.referralLink || data?.referral_link || data?.shareReferral?.link || '';
}

export function getReferralCode(data) {
  return data?.referralCode || data?.referral_code || data?.shareReferral?.code || '';
}
