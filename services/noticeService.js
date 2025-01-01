const Notice = require('../models/Notice');

exports.getNotices = async () => {
  try {
    const notices = await Notice.find({});
    const result = notices.map((notice) => {
      const { _id: noticeId, title, content, createdAt, updatedAt } = notice;
      return {
        noticeId,
        title,
        content,
        createdAt: createdAt.toISOString().split('T')[0],
        updatedAt: updatedAt.toISOString().split('T')[0],
      };
    });
    return {
      success: true,
      result,
    };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch notices');
  }
};

exports.getNotice = async (noticeId) => {
  try {
    const notice = await Notice.findById(noticeId);
    const { _id, title, content, createdAt, updatedAt } = notice;
    const result = {
      noticeId: _id,
      title,
      content,
      createdAt: createdAt.toISOString().split('T')[0],
      updatedAt: updatedAt.toISOString().split('T')[0],
    };

    return {
      success: true,
      result,
    };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch notice');
  }
};

exports.createNotice = async (noticeData) => {
  const { title, content } = noticeData;
  try {
    const newNotice = new Notice({
      title,
      content,
    });
    await newNotice.save();

    return { success: true, msg: 'Notice created successfully' };
  } catch (err) {
    console.log(err);
    throw new Error('Failed to create notice');
  }
};

exports.updateNotice = async (noticeId, updateNoticeData) => {
  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      throw new Error('Notice not found');
    }

    const { title, content } = updateNoticeData;

    if (title !== undefined) {
      notice.title = title;
    }
    if (content !== undefined) {
      notice.content = content;
    }
    await notice.save();

    return {
      success: true,
      message: 'Notice updated successfully',
    };
  } catch (err) {
    console.error('Error updating notice:', err.message);
    throw new Error('Failed to update notice');
  }
};

exports.deleteNotice = async (noticeId) => {
  try {
    const result = await Notice.findByIdAndDelete(noticeId);
    if (!result) {
      throw new Error('Notice not found');
    }
    return {
      success: true,
      message: 'Notice deleted successfully',
    };
  } catch (err) {
    console.error('Error deleting notice:', err.message);
    throw new Error('Failed to delete notice');
  }
};
