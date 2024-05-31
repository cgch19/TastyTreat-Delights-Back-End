const router = require('express').Router();
const YourtreatsCtrl = require('../controllers/treatsController');
const { verifyToken } = require('../middleware/verifyToken');
const userCtrl = require('../controllers/userController');

// Authentication routes
router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);  // Ensure this route is defined

// Protected routes (require authentication)
router.use(verifyToken);

router.get('/Treats', YourtreatsCtrl.getYourtreats);
router.post('/Treats', YourtreatsCtrl.createYourtreats);
router.put('/Treats/:id', YourtreatsCtrl.updateYourtreats);
router.delete('/Treats/:id', YourtreatsCtrl.deleteYourtreats);
router.post('/Treats/sell', YourtreatsCtrl.sellYourtreats);
router.get('/Catalog', YourtreatsCtrl.getCatalog);
router.delete('/Catalog/:id', YourtreatsCtrl.deleteCatalogItem);

module.exports = router;
