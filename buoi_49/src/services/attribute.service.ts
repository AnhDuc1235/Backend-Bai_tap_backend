import { Request } from "express";
import { prisma } from "../utils/prisma";
import { Decimal } from "../generated/prisma/internal/prismaNamespace";

export const attributeService = {
  async getAttribute() {
    return await prisma.attribute.findMany()
  },
  async getAttributeById(id: number) {
    const attribute = await prisma.attribute.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        attribute_values: {
          select: {
            value: true
          }
        }
      }
    });
    return attribute;
  },
  async createAttribute(body: { name: string}) {
    const attribute = await prisma.attribute.create({
      data: {
        name: body.name,
      },
    });
    return attribute;
  },
  async updateAttribute(body: { name: string}, id: number,) {
    return await prisma.attribute.update({
      where: {
        id: id
      },
      data: body
    });
  },
  async deleteAttribute(id: number) {
    return await prisma.attribute.delete({
      where: {
        id: id
      }
    })
  },
  async createAttributeValue(body: { value: string }, id: number) {
    const attributevalue = await prisma.attribute_value.create({
      data: {
        value: body.value,
        attribute: {
          connect: { id }
        }
      },
    });
    return attributevalue;
  },
  async deleteAttributeValue(id: number, valueId: number) {
    return await prisma.attribute_value.delete({
      where: {
        id: valueId,
        attributeId: id
      }
    })
  }
};
