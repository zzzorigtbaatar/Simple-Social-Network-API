const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/studentController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:studentId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/friends
router.route('/:studentId/friends').post(addFriend);

// /api/students/:studentId/friends/:friendId
router.route('/:studentId/friends/:friendId').delete(removeFriend);

module.exports = router;
