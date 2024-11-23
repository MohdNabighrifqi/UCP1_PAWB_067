const router = require('express').Router();
const homeController = require('../controllers').home;
const verifyUser = require('../configs/verify');
const controllerBibit = require('../controllers/controller-bibit');
const controllerpupuk = require('../controllers/controller-pupuk');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/pupuk', verifyUser.isLogin, controllerpupuk.getpupuk);
router.get('/bibit', verifyUser.isLogin, controllerBibit.getbibit);


module.exports = router;