import { Request } from "express";
import { prisma } from "../utils/prisma";
import { Decimal } from "../generated/prisma/internal/prismaNamespace";

export const productService = {
  async getProduct() {
    return await prisma.product.findMany()
  },
  async getProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        Products_attribute_value: {
          select: {
            attributeValue: {
              select: {
                value: true,
                attribute: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return product;
  },
  async createProduct(body: { name: string; description: string; price: Decimal; stock: number }) {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock,

      },
    });
    return product;
  },
  async updateProduct(body: { name: string; email: string; phone: string }, id: number,) {
    return await prisma.product.update({
      where: {
        id: id
      },
      data: body
    });
  },
  async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: {
        id: id
      }
    })
  }
};
