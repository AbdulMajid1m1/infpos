const { Router } = require("express");
const router = Router();

const productCategoryController = require("../controllers/productCategory");
const productController = require("../controllers/product");
const productVariationController = require("../controllers/productVariations");
const productBrandController = require("../controllers/productBrand");

// Category routes
router.post("/category", productCategoryController.create);
router.get("/category", productCategoryController.getCategories);
router.get("/category/search", productCategoryController.searchCategories);
router.put("/category/:id", productCategoryController.update);
router.delete("/category/:id", productCategoryController.delete);

router.get("/brand/search", productBrandController.searchBrands);
router.put("/brand/:id", productBrandController.update);
router.delete("/brand/:id", productBrandController.delete);
router.get("/brand", productBrandController.getBrands);
router.post("/brand", productBrandController.create);

// Product routes
router.post("/", productController.create);
router.put("/:id", productController.update);
router.get("/:id", productController.getOneProducts);
router.delete("/:id", productController.delete);
router.get("/", productController.getProducts);
router.get("/search", productController.searchProducts);

// Variation routes
router.post("/variation", productVariationController.createProductVariation);

module.exports = router;
