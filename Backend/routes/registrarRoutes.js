const express = require('express')
const router = express.Router()

const { protect } = require('../middleware/authMiddleware')
const checkAdminPrivileges = require('../middleware/rolePrivilegeMiddleware')

const {
  createRegistrar,
  generateRegistrarToken,
  getRegistrarActivation,
  createRegistrarPassword,
  getRegistrar,
  getRegistrars,
  deleteRegistrar,
  toggleRegistrarActivation,
} = require('../controllers/RegistrarController')

router
  .route('/')
  .post(protect, checkAdminPrivileges, createRegistrar)
  .get(protect, checkAdminPrivileges, getRegistrars)

router
  .route('/:id')
  .get(protect, getRegistrar)
  // .patch(protect, createRegistrarPassword)
  .delete(protect, deleteRegistrar)

router
  .route('/:id/generate')
  .get(protect, checkAdminPrivileges, generateRegistrarToken)

router.route('/:token/activation').get(getRegistrarActivation)

router.route('/:id/activation').patch(protect, toggleRegistrarActivation)
// set header for this
router.route('/:id/auth/create').patch(createRegistrarPassword)

module.exports = router
