import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

const CATEGORIES = [
  { key: "carpentry", icon: "hammer", sortOrder: 1 },
  { key: "plumbing", icon: "wrench", sortOrder: 2 },
  { key: "electrical", icon: "bolt", sortOrder: 3 },
  { key: "tailoring", icon: "needle", sortOrder: 4 },
  { key: "painting", icon: "roller", sortOrder: 5 },
  { key: "masonry", icon: "trowel", sortOrder: 6 },
];

const DEMO_PASSWORD = "Password123!";

async function main() {
  const categories = new Map<string, { id: number }>();

  for (const c of CATEGORIES) {
    const category = await prisma.category.upsert({
      where: { key: c.key },
      update: { icon: c.icon, sortOrder: c.sortOrder },
      create: c,
    });
    categories.set(c.key, category);
    console.log(`category: ${c.key}`);
  }

  const demoPassword = await hashPassword(DEMO_PASSWORD);

  const client = await prisma.user.upsert({
    where: { email: "demo.client@fundi.ng" },
    update: {},
    create: {
      name: "Ada Obi",
      email: "demo.client@fundi.ng",
      passwordHash: demoPassword,
      role: "client",
      locale: "en",
      phone: "+2348012345678",
      locationText: "Ikeja, Lagos",
    },
  });
  console.log(`user: ${client.email} (client)`);

  const artisans = [
    {
      name: "Musa Bello",
      email: "demo.artisan1@fundi.ng",
      categoryKey: "carpentry",
      bio: "Cabinet maker with 12 years of experience.",
      rate: 2500,
    },
    {
      name: "Ngozi Eze",
      email: "demo.artisan2@fundi.ng",
      categoryKey: "plumbing",
      bio: "Plumbing repairs, fittings and installations.",
      rate: 3000,
    },
    {
      name: "Tunde Ade",
      email: "demo.artisan3@fundi.ng",
      categoryKey: "electrical",
      bio: "Licensed electrician, residential and commercial.",
      rate: 3500,
    },
  ];

  for (const a of artisans) {
    const user = await prisma.user.upsert({
      where: { email: a.email },
      update: {},
      create: {
        name: a.name,
        email: a.email,
        passwordHash: demoPassword,
        role: "artisan",
        locale: "en",
        artisanProfile: {
          create: {
            categoryId: categories.get(a.categoryKey)!.id,
            bio: a.bio,
            rateType: "hourly",
            rateAmount: a.rate,
          },
        },
      },
    });
    console.log(`user: ${user.email} (artisan)`);
  }

  const existingJobs = await prisma.job.count();
  if (existingJobs === 0) {
    await prisma.job.createMany({
      data: [
        {
          clientId: client.id,
          categoryId: categories.get("carpentry")!.id,
          title: "Fix kitchen cabinet door",
          description: "The hinge on one cabinet door is broken and the door won't close properly.",
          locationText: "Ikeja, Lagos",
          budgetMin: 5000,
          budgetMax: 12000,
        },
        {
          clientId: client.id,
          categoryId: categories.get("plumbing")!.id,
          title: "Leaking bathroom tap",
          description: "Hot water tap in the bathroom leaks constantly, needs a new washer or cartridge.",
          locationText: "Yaba, Lagos",
          budgetMin: 3000,
          budgetMax: 8000,
        },
        {
          clientId: client.id,
          categoryId: categories.get("electrical")!.id,
          title: "Rewire two sockets in living room",
          description: "Two wall sockets are sparking intermittently and need replacement wiring.",
          locationText: "Surulere, Lagos",
          budgetMin: 15000,
          budgetMax: 25000,
        },
      ],
    });
    console.log("jobs: created 3 demo jobs");
  }

  console.log("Seed complete. Demo login: demo.client@fundi.ng / Password123!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
