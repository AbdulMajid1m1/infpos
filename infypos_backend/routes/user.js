const { Router } = require("express");
const router = Router();

const controller = require("../controllers/user");

router.post("/", controller.create);
router.post("/admin-login", controller.loginAdmin);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.get("/", controller.getUsers);
router.get("/search", controller.searchUsers);

module.exports = router;
