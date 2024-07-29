const express = require("express");
const router = express.Router();
const variationController = require("../controllers/productVariation");

router.post("/", variationController.create);
router.get("/", variationController.getVariations);
router.get("/search", variationController.searchVariations);
router.put("/:id", variationController.update);
router.delete("/:id", variationController.delete);
router.post("/types", variationController.createVariationType);
router.get("/types", variationController.getVariationType);
router.get("/types/search", variationController.searchVariationType);
router.put("/types/:id", variationController.updateVariationType);
router.delete("/types/:id", variationController.deleteVariationType);

module.exports = router;
