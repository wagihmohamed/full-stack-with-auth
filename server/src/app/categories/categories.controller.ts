import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllCategories = async (req: Request, res: Response) => {
  const { user } = req.body;
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });
  res.status(200).json(categories);
};

const addCategory = async (req: Request, res: Response) => {
  const { name, user } = req.body;

  const newCategory = await prisma.category.create({
    data: {
      name,
      user: { connect: { id: user.id } },
    },
  });
  res.status(201).json(newCategory);
};

export const categoryController = {
  getAllCategories,
  addCategory,
};
