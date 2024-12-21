const userService = require('../services/userService');

// 전체 회원 조회 및 필터링
exports.getUsers = async (req, res) => {
  try {
    const { status, page, limit } = req.query;
    const { users, total } = await userService.getUsers(status, page, limit);

    res.status(200).json({
      success: true,
      data: users,
      meta: {
        total,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Internal server error', error: err.message });
  }
};

// 회원 강제 탈퇴
exports.banUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.banUser(userId);

    if (result.success) {
      res.status(200).json({ success: true, msg: result.msg });
    } else {
      res.status(400).json({ success: false, msg: result.msg });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Internal server error', error: err.message });
  }
};
