import Affiliate from '../../models/sms/Affiliate.js';
import Commission from '../../models/sms/Commission.js';
import Enrollment from '../../models/sms/Enrollment.js';
import WalletTransaction from '../../models/sms/WalletTransaction.js';
import Student from '../../models/sms/Student.js';
import Course from '../../models/sms/Course.js';
import Instructor from '../../models/sms/Instructor.js';

export const processRevenueDistribution = async (feeRecord) => {
  try {
    const student = await Student.findById(feeRecord.studentId);
    const course = await Course.findById(feeRecord.courseId);
    if (!student || !course) return;

    const totalAmount = feeRecord.amount;
    let remainingAmount = totalAmount;

    // 1. Handle Affiliate (10%)
    if (student.referredBy && student.referredBy.toString() !== course.instructorId?.toString()) {
        const referralRate = 0.10;
        const affiliateCommission = totalAmount * referralRate;
        
        const affiliate = await Affiliate.findOne({ userId: student.referredBy });
        if (affiliate) {
            // Create Commission
            await new Commission({
                affiliateId: affiliate._id,
                referredUserId: student._id,
                orderId: feeRecord._id,
                coursePrice: totalAmount,
                commissionRate: referralRate,
                commissionAmount: affiliateCommission,
                status: 'approved'
            }).save();

            // Update Affiliate Profile
            affiliate.totalEarned += affiliateCommission;
            affiliate.approvedBalance += affiliateCommission;
            await affiliate.save();

            // Update Referrer Student Balance (legacy)
            await Student.findByIdAndUpdate(student.referredBy, {
                $inc: { 'wallet.balance': affiliateCommission }
            });

            // Log Transaction
            await new WalletTransaction({
                userId: student.referredBy,
                amount: affiliateCommission,
                type: 'credit',
                source: 'referral',
                referenceId: feeRecord._id,
                description: `Affiliate commission from ${student.name}'s enrollment in ${course.name}`
            }).save();

            remainingAmount -= affiliateCommission;
        }
    }

    // 2. Handle Instructor (70% of remaining 90%)
    // The user said "Remaining 90%: 70% -> instructor, 30% -> platform"
    // So instructor gets 0.7 * 0.9 = 63% of total? 
    // Or 70% of whatever is left? 
    // "Remaining 90%" implies if there's no referral, instructor gets 70% of 100%? 
    // Let's stick to the prompt's exact words: "Remaining 90% -> 70% to instructor"
    // Usually this means if referral exists, instructor gets 70% of the non-referral part.
    // If no referral, they get 70% of total.
    
    if (course.instructorId) {
        const instructor = await Instructor.findById(course.instructorId);
        if (instructor) {
            const instructorShareRate = 0.70;
            const instructorEarnings = remainingAmount * instructorShareRate;

            // Update Instructor's User Wallet
            await Student.findByIdAndUpdate(instructor.userId, {
                $inc: { 'wallet.balance': instructorEarnings }
            });

            // Log Transaction
            await new WalletTransaction({
                userId: instructor.userId,
                amount: instructorEarnings,
                type: 'credit',
                source: 'instructor',
                referenceId: feeRecord._id,
                description: `Instructor share from ${student.name}'s enrollment in ${course.name}`
            }).save();
        }
    }

    // 3. Create Enrollment Record
    const enrollment = new Enrollment({
        studentId: student._id,
        courseId: course._id,
        feeRecordId: feeRecord._id,
        referralId: student.referredBy,
        instructorId: course.instructorId,
        pricePaid: totalAmount
    });
    await enrollment.save();

  } catch (err) {
    console.error('Error in revenue distribution:', err);
  }
};
