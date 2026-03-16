import { prisma } from "../utils/prisma";

export const userService = {
  async getAll() {
    return await prisma.user.findMany()
  },
  async find(username: string) {
    return await prisma.user.findMany({
      where: { username },
    })
  },
  async create(body: { fullname: string; username: string; bio: string, phone: string }) {
    return await prisma.user.create({
      data: body
    })
  },
  async update(body: { name: string; email: string }, id: number) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: body
    })
  },
  async delete(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      }
    })
  }
};
