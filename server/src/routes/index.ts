import { Router } from "express";
import todosRouter from "../app/todos/todo.routes.js";
import categoriesRouter from "../app/categories/categories.routes.js";

const router = Router();

router.use("/", todosRouter);
router.use("/", categoriesRouter);

export default router;
