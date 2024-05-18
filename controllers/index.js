const router = require("express").Router()
const YourtreatsCtrl = require("./treatsController")

router.get("/Yourtreats", YourtreatsCtrl.getYourtreats)

module.exports = router