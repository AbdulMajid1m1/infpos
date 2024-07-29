const express = require("express")
const router = express.Router();
const adjustmentsController = require("../controllers/adjustments");

router.get("/", adjustmentsController.getAdjustments);
router.post("/", adjustmentsController.createAdjustment);
router.get("/search", adjustmentsController.searchAdjustment);
router.get("/:id", adjustmentsController.getOneAdjustment);
router.delete("/:id", adjustmentsController.deleteAdjustment);

module.exports = router;
