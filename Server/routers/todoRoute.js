const todoController = require("../controllers/todoController");
const router = require("express").Router();

router.get("/", todoController.getTodo);
router.post("/", todoController.addTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
