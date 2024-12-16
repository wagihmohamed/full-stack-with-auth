import { Router } from "express";
import { categoryController } from "./categories.controller.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/categories",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  categoryController.getAllCategories
);
router.post(
  "/categories",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  categoryController.addCategory
);

export default router;
