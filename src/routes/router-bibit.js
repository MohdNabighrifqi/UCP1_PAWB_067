const router = require('express').Router();
const bibitController = require('../controllers').bibit;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, bibitController.getbibit);
router.get('/bibit/add', verifyUser.isLogin, bibitController.formbibit);
router.post('/bibit/save', verifyUser.isLogin, bibitController.savebibit);
router.get('/bibit/edit/:id', verifyUser.isLogin, bibitController.editbibit);
router.post('/bibit/update/:id', verifyUser.isLogin, bibitController.updatebibit);
router.get('/bibit/delete/:id', verifyUser.isLogin, bibitController.deletebibit);

module.exports = router;