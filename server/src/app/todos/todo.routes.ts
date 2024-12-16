import { Router } from "express";
import { todoController } from "./todo.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/todos",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  todoController.getAllTodos
);
router.post(
  "/todos",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  todoController.addTodo
);
router.delete(
  "/todos/:id",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  todoController.deleteTodo
);
router.patch(
  "/todos/:id",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  todoController.updateTodo
);

export default router;
