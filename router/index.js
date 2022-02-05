const router = require('express').Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const { denyAccessToLoggedUsers } = require('../middleware/denyAccessToLoggedUsers');
const { authenticateToken } = require('../middleware/authenticateToken');
const { adminRoleRequired } = require('../middleware/adminRoleRequired');

router.get('/', function (_, res) { res.status(200).send('login-system live demo') })

router.post('/signup', denyAccessToLoggedUsers, authController.signUp)
router.post('/login', denyAccessToLoggedUsers, authController.signIn)
router.delete('/logout', authController.signOut)

router.get('/profile/:id', authenticateToken, userController.getOneUser)

router.get('/pending-subscriptions', authenticateToken, adminRoleRequired, userController.getAllPendingSubscriptions)
router.put('/validate-sub/:id', authenticateToken, adminRoleRequired, userController.validateSubscription)
router.put('/refuse-sub/:id', authenticateToken, adminRoleRequired, userController.refuseSubscription)

router.use((_, res) => {
  res.sendStatus(404);
});

module.exports = router;