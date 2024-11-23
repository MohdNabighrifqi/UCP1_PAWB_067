const router = require('express').Router();
const pupukController = require('../controllers').pupuk;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, pupukController.getpupuk);
router.get('/pupuk/add', verifyUser.isLogin, pupukController.formpupuk);
router.post('/pupuk/save', verifyUser.isLogin, pupukController.savepupuk);
router.get('/pupuk/edit/:id', verifyUser.isLogin, pupukController.editpupuk);
router.post('/pupuk/update/:id', verifyUser.isLogin, pupukController.updatepupuk);
router.get('/pupuk/delete/:id', verifyUser.isLogin, pupukController.deletepupuk);

module.exports = router;