const Inquiry = require('../models/inquiry');

exports.createReply = async (inquiryId, replyData) => {
  const { answer } = replyData;
  try {
    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      throw new Error('Inquiry not found');
    }
    inquiry.answer = answer;
    inquiry.answeredAt = Date.now();
    inquiry.isAnswered = true;
    await inquiry.save();

    return {
      success: true,
      message: 'Reply created successfully',
    };
  } catch (err) {
    console.error('Error creating reply:', err.message);
    throw new Error('Failed to create reply');
  }
};
