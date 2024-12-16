import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllTodos = async (req: Request, res: Response) => {
  const { user } = req.body;
  const todos = await prisma.todo.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    where: { userId: user.id },
  });

  res.status(200).json(todos);
};

const addTodo = async (req: Request, res: Response) => {
  const { title, categoryId, user } = req.body;

  const newTodo = await prisma.todo.create({
    data: {
      completed: false,
      title,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      user: { connect: { id: user.id } },
      category: { connect: { id: categoryId } },
    },
  });
  res.status(201).json(newTodo);
};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.todo.delete({
    where: { id },
  });

  res.status(204).end();
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, title } = req.body;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed, title },
  });

  res.status(200).json(updatedTodo);
};

export const todoController = {
  getAllTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};
