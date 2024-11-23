const router = require('express').Router();
const loginController = require('../controllers').login;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, loginController.login);
router.post('/', loginController.loginAuth)
router.get('/logout', loginController.logout);


module.exports = router;