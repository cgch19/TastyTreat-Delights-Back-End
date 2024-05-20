const router = require("express").Router()
const YourtreatsCtrl = require("./treatsController")

router.get("/Treats", YourtreatsCtrl.getYourtreats)
router.post("/Treats", YourtreatsCtrl.createYourtreats)

module.exports = router