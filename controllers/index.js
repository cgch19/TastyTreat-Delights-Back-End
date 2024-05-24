const router = require("express").Router();
const YourtreatsCtrl = require("./treatsController");

router.get("/Treats", YourtreatsCtrl.getYourtreats);
router.post("/Treats", YourtreatsCtrl.createYourtreats);
router.put("/Treats/:id", YourtreatsCtrl.updateYourtreats);
router.delete("/Treats/:id", YourtreatsCtrl.deleteYourtreats);
router.post("/Treats/sell", YourtreatsCtrl.sellYourtreats);
router.get("/Catalog", YourtreatsCtrl.getCatalog); 
router.delete('/Catalog/:id', YourtreatsCtrl.deleteCatalogItem); 

module.exports = router;
