const router = require("express").Router()
const YourtreatsCtrl = require("./treatsController")

router.get("/Yourtreats", YourtreatsCtrl.getYourtreats)
router.post("/Yourtreats", YourtreatsCtrl.createYourtreats)

module.exports = router