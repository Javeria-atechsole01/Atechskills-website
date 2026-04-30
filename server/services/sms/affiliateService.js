import Affiliate from '../../models/sms/Affiliate.js';
import Commission from '../../models/sms/Commission.js';
import ReferralClick from '../../models/sms/ReferralClick.js';
import WalletTransaction from '../../models/sms/WalletTransaction.js';
import Student from '../../models/sms/Student.js';

export const triggerCommission = async (feeRecord) => {
  try {
    const student = await Student.findById(feeRecord.studentId);
    if (!student || !student.referredBy) return;

    // Check if commission already exists for this record
    const existing = await Commission.findOne({ orderId: feeRecord._id });
    if (existing) return;

    const referrer = await Student.findById(student.referredBy);
    if (!referrer) return;

    const affiliate = await Affiliate.findOne({ userId: referrer._id });
    if (!affiliate) return;

    const commissionRate = 0.10; // 10%
    const commissionAmount = feeRecord.amount * commissionRate;

    // 1. Create Commission Record
    const commission = new Commission({
      affiliateId: affiliate._id,
      referredUserId: student._id,
      orderId: feeRecord._id,
      coursePrice: feeRecord.amount,
      commissionRate,
      commissionAmount,
      status: 'approved',
      approvalDate: new Date()
    });
    await commission.save();

    // 2. Update Affiliate Stats
    affiliate.totalEarned += commissionAmount;
    affiliate.approvedBalance += commissionAmount;
    await affiliate.save();

    // 3. Mark ReferralClick as convertedToOrder
    // Find the latest signup click for this student and referrer
    const click = await ReferralClick.findOne({ 
      affiliateId: affiliate._id, 
      ipAddress: student.ipAddress || { $exists: true } // student.ipAddress might not be set, fallback
    }).sort({ clickedAt: -1 });
    
    if (click) {
      click.convertedToOrder = true;
      await click.save();
    }

    // 4. Create Wallet Transaction for the referrer
    await new WalletTransaction({
      userId: referrer._id,
      amount: commissionAmount,
      type: 'credit',
      source: 'referral',
      description: `Commission from ${student.name}'s enrollment`
    }).save();

    // 5. Update Student Wallet (legacy support if needed)
    referrer.wallet.balance += commissionAmount;
    await referrer.save();

  } catch (err) {
    console.error('Error triggering commission:', err.message);
  }
};
