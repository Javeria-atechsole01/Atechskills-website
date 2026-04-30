import ReferralClick from '../models/sms/ReferralClick.js';
import Affiliate from '../models/sms/Affiliate.js';

/**
 * Referral Tracking Middleware
 * Captures ?ref=CODE from URL and stores it in a cookie
 */
const referralMiddleware = (req, res, next) => {
  const { ref } = req.query;
  
  if (ref) {
    // Store referral code in cookie for 30 days
    res.cookie('atech_ref', ref, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Asynchronously log the click
    (async () => {
      try {
        const affiliate = await Affiliate.findOne({ referralCode: ref });
        if (affiliate) {
          // Anti-cheat: Check if same IP clicked in last 24 hours (optional but good)
          const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          const recentClick = await ReferralClick.findOne({
            ipAddress: req.ip,
            referralCode: ref,
            clickedAt: { $gt: twentyFourHoursAgo }
          });

          if (!recentClick) {
            await new ReferralClick({
              affiliateId: affiliate._id,
              referralCode: ref,
              ipAddress: req.ip,
              userAgent: req.headers['user-agent'],
              landingPage: req.originalUrl
            }).save();

            // Increment total clicks
            affiliate.totalClicks += 1;
            await affiliate.save();
          }
        }
      } catch (err) {
        console.error('Referral tracking error:', err);
      }
    })();
  }
  
  next();
};

export default referralMiddleware;
