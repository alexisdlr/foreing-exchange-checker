import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prismaC = new PrismaClient({ adapter });

declare global {
  var prisma: typeof prismaC | undefined;
}

export const Prisma = global.prisma || prismaC;

if (process.env.NODE_ENV !== "production") {
  global.prisma = Prisma;
}
