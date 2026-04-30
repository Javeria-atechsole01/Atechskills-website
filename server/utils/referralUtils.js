import Affiliate from '../models/sms/Affiliate.js';

export const generateReferralCode = async (name) => {
  const base = name.toLowerCase().replace(/\s+/g, '').slice(0, 8);
  let code = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Ensure uniqueness
  let exists = await Affiliate.findOne({ referralCode: code });
  while (exists) {
    code = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
    exists = await Affiliate.findOne({ referralCode: code });
  }
  
  return code;
};
