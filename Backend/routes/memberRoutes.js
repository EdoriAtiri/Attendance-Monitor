const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')

const {
  registerMember,
  updateMember,
  deleteMember,
  getMembers,
  getMember,
} = require('../controllers/memberController')

router.route('/').post(protect, registerMember)
router.route('/').get(protect, getMembers)

router
  .route('/:id')
  .get(protect, getMember)
  .patch(protect, updateMember)
  .delete(protect, deleteMember)

router.route('/:id/update').post(protect, updateMember)

module.exports = router
