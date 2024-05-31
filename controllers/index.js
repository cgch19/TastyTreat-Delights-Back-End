const router = require('express').Router();
const YourtreatsCtrl = require('./treatsController');
const { verifyToken } = require('../middleware/verifyToken');
const userCtrl = require('./userController');
const blogCtrl = require("./blogController")

// Authentication routes
router.post('/auth/signup', userCtrl.signup);
router.post('/auth/login', userCtrl.login);

router.get('/Catalog', YourtreatsCtrl.getCatalog);

// Protected routes (require authentication)
router.use(verifyToken);

router.get('/Treats', YourtreatsCtrl.getYourtreats);
router.post('/Treats', YourtreatsCtrl.createYourtreats);
router.put('/Treats/:id', YourtreatsCtrl.updateYourtreats);
router.delete('/Treats/:id', YourtreatsCtrl.deleteYourtreats);
router.post('/Treats/sell', YourtreatsCtrl.sellYourtreats);

router.delete('/Catalog/:id', YourtreatsCtrl.deleteCatalogItem);

// Blog routes
router.get('/blogs', blogCtrl.getAllBlogs);
router.post('/blogs', blogCtrl.createBlog);
router.put('/blogs/:id', blogCtrl.updateBlog);
router.delete('/blogs/:id', blogCtrl.deleteBlog);

module.exports = router;
