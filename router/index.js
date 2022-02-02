const router = require('express').Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const { adminRoleRequired } = require('../middleware/adminRoleRequired');
const { authenticateToken } = require('../middleware/authenticateToken');

router.get('/', function (_, res) { res.status(200).send('login-system live demo') })

router.post('/signup', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.signOut)

router.get('/profile/:id', authenticateToken, userController.getOneUser)

router.get('/pending-subscriptions', authenticateToken, adminRoleRequired, userController.getAllPendingSubscriptions)
router.get('/validate-sub/:id', authenticateToken, adminRoleRequired, userController.validateSubscription)
router.get('/refuse-sub/:id', authenticateToken, adminRoleRequired, userController.refuseSubscription)

router.use((_, res) => {
  res.sendStatus(404);
});

module.exports = router;