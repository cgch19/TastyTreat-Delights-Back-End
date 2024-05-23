const router = require("express").Router();
const YourtreatsCtrl = require("./treatsController");

router.get("/Treats", YourtreatsCtrl.getYourtreats);
router.post("/Treats", YourtreatsCtrl.createYourtreats);
router.put("/Treats/:id", YourtreatsCtrl.updateYourtreats); 
router.delete("/Treats/:id", YourtreatsCtrl.deleteYourtreats); 

module.exports = router;
