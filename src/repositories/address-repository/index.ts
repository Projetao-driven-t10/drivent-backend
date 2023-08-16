import { prisma } from "@/config";
import { Address, PrismaClient, Prisma } from "@prisma/client";

type PrismaTransaction = Omit<PrismaClient<Prisma.PrismaClientOptions, never>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

async function upsert(enrollmentId: number, createdAddress: CreateAddressParams, updatedAddress: UpdateAddressParams, tx?: PrismaTransaction) {
  if (tx) {
    return tx.address.upsert({
      where: {
        enrollmentId,
      },
      create: {
        ...createdAddress,
        Enrollment: { connect: { id: enrollmentId } },
      },
      update: updatedAddress,
    });
  }
  return prisma.address.upsert({
    where: {
      enrollmentId,
    },
    create: {
      ...createdAddress,
      Enrollment: { connect: { id: enrollmentId } },
    },
    update: updatedAddress,
  });
}

export type CreateAddressParams = Omit<Address, "id" | "createdAt" | "updatedAt" | "enrollmentId">;
export type UpdateAddressParams = CreateAddressParams;

const addressRepository = {
  upsert,
};

export default addressRepository;
