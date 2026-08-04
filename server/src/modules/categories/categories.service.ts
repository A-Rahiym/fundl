import { prisma } from "@/lib/prisma";

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { key: "asc" }],
    select: {
      id: true,
      key: true,
      icon: true,
      sortOrder: true,
    },
  });
}
