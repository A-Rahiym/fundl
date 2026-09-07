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
      phone: "+2348011000001",
      location: "Ikeja, Lagos",
      rating: 4.8,
      reviews: 46,
    },
    {
      name: "Ngozi Eze",
      email: "demo.artisan2@fundi.ng",
      categoryKey: "plumbing",
      bio: "Plumbing repairs, fittings and installations.",
      rate: 3000,
      phone: "+2348011000002",
      location: "Yaba, Lagos",
      rating: 4.9,
      reviews: 58,
    },
    {
      name: "Tunde Ade",
      email: "demo.artisan3@fundi.ng",
      categoryKey: "electrical",
      bio: "Licensed electrician, residential and commercial.",
      rate: 3500,
      phone: "+2348011000003",
      location: "Surulere, Lagos",
      rating: 4.7,
      reviews: 39,
    },
    {
      name: "Chinedu Okafor",
      email: "demo.artisan4@fundi.ng",
      categoryKey: "carpentry",
      bio: "Custom wardrobes, doors and sturdy furniture for modern homes.",
      rate: 3200,
      phone: "+2348011000004",
      location: "Lekki, Lagos",
      rating: 4.9,
      reviews: 72,
    },
    {
      name: "Amina Yusuf",
      email: "demo.artisan5@fundi.ng",
      categoryKey: "carpentry",
      bio: "Precise furniture repairs and space-saving shelving installations.",
      rate: 2800,
      phone: "+2348011000005",
      location: "Abuja, FCT",
      rating: 4.6,
      reviews: 31,
    },
    {
      name: "Bola Akinyemi",
      email: "demo.artisan6@fundi.ng",
      categoryKey: "carpentry",
      bio: "Kitchen cabinet specialist with clean finishes and reliable delivery.",
      rate: 3800,
      phone: "+2348011000006",
      location: "Ibadan, Oyo",
      rating: 4.8,
      reviews: 64,
    },
    {
      name: "Ifeanyi Nwosu",
      email: "demo.artisan7@fundi.ng",
      categoryKey: "plumbing",
      bio: "Fast leak detection, bathroom fittings and water-pump installations.",
      rate: 3200,
      phone: "+2348011000007",
      location: "Enugu, Enugu",
      rating: 4.7,
      reviews: 44,
    },
    {
      name: "Fatima Garba",
      email: "demo.artisan8@fundi.ng",
      categoryKey: "plumbing",
      bio: "Neat plumbing installations for homes, shops and small offices.",
      rate: 2900,
      phone: "+2348011000008",
      location: "Kano, Kano",
      rating: 4.8,
      reviews: 52,
    },
    {
      name: "Emeka Ude",
      email: "demo.artisan9@fundi.ng",
      categoryKey: "plumbing",
      bio: "Experienced in borehole plumbing, drainage and pipe replacement.",
      rate: 3600,
      phone: "+2348011000009",
      location: "Port Harcourt, Rivers",
      rating: 4.5,
      reviews: 27,
    },
    {
      name: "Seyi Balogun",
      email: "demo.artisan10@fundi.ng",
      categoryKey: "electrical",
      bio: "Safe home wiring, inverter setup and electrical fault repairs.",
      rate: 4000,
      phone: "+2348011000010",
      location: "Ojodu, Lagos",
      rating: 4.9,
      reviews: 81,
    },
    {
      name: "Blessing Ojo",
      email: "demo.artisan11@fundi.ng",
      categoryKey: "electrical",
      bio: "Solar, CCTV and electrical installations for homes and businesses.",
      rate: 4500,
      phone: "+2348011000011",
      location: "Akure, Ondo",
      rating: 4.8,
      reviews: 49,
    },
    {
      name: "Zainab Ibrahim",
      email: "demo.artisan12@fundi.ng",
      categoryKey: "tailoring",
      bio: "Custom native wear, alterations and made-to-measure dresses.",
      rate: 2500,
      phone: "+2348011000012",
      location: "Wuse, Abuja",
      rating: 4.9,
      reviews: 67,
    },
    {
      name: "Kelechi Nnamdi",
      email: "demo.artisan13@fundi.ng",
      categoryKey: "tailoring",
      bio: "Sharp traditional outfits and dependable clothing repairs.",
      rate: 2200,
      phone: "+2348011000013",
      location: "Owerri, Imo",
      rating: 4.6,
      reviews: 35,
    },
    {
      name: "Hauwa Sani",
      email: "demo.artisan14@fundi.ng",
      categoryKey: "tailoring",
      bio: "Bridal wear, school uniforms and quality finishing for every fit.",
      rate: 3000,
      phone: "+2348011000014",
      location: "Kaduna, Kaduna",
      rating: 4.7,
      reviews: 43,
    },
    {
      name: "David Ekanem",
      email: "demo.artisan15@fundi.ng",
      categoryKey: "painting",
      bio: "Interior and exterior painting with crisp lines and tidy cleanup.",
      rate: 2600,
      phone: "+2348011000015",
      location: "Victoria Island, Lagos",
      rating: 4.8,
      reviews: 56,
    },
    {
      name: "Rukayat Musa",
      email: "demo.artisan16@fundi.ng",
      categoryKey: "painting",
      bio: "Colour consultation, wall treatment and durable residential painting.",
      rate: 2800,
      phone: "+2348011000016",
      location: "Ilorin, Kwara",
      rating: 4.5,
      reviews: 24,
    },
    {
      name: "Kingsley Obasi",
      email: "demo.artisan17@fundi.ng",
      categoryKey: "painting",
      bio: "Commercial painting and protective coatings for lasting results.",
      rate: 3500,
      phone: "+2348011000017",
      location: "Benin City, Edo",
      rating: 4.7,
      reviews: 38,
    },
    {
      name: "Yusuf Abdullahi",
      email: "demo.artisan18@fundi.ng",
      categoryKey: "masonry",
      bio: "Blockwork, tiling and concrete repairs built to last.",
      rate: 3300,
      phone: "+2348011000018",
      location: "Maitama, Abuja",
      rating: 4.8,
      reviews: 61,
    },
    {
      name: "Precious Adebayo",
      email: "demo.artisan19@fundi.ng",
      categoryKey: "masonry",
      bio: "Detailed floor and wall tiling for kitchens, bathrooms and shops.",
      rate: 3100,
      phone: "+2348011000019",
      location: "Abeokuta, Ogun",
      rating: 4.6,
      reviews: 33,
    },
    {
      name: "Samuel Bassey",
      email: "demo.artisan20@fundi.ng",
      categoryKey: "masonry",
      bio: "Reliable foundation, plastering and renovation work for any space.",
      rate: 3700,
      phone: "+2348011000020",
      location: "Uyo, Akwa Ibom",
      rating: 4.7,
      reviews: 47,
    },
  ];

  for (const a of artisans) {
    const user = await prisma.user.upsert({
      where: { email: a.email },
      update: {
        name: a.name,
        passwordHash: demoPassword,
        role: "artisan",
        phone: a.phone,
        locationText: a.location,
        artisanProfile: {
          upsert: {
            update: {
              categoryId: categories.get(a.categoryKey)!.id,
              bio: a.bio,
              rateType: "hourly",
              rateAmount: a.rate,
              isAvailable: true,
              isVerified: true,
              avgRating: a.rating,
              reviewCount: a.reviews,
            },
            create: {
              categoryId: categories.get(a.categoryKey)!.id,
              bio: a.bio,
              rateType: "hourly",
              rateAmount: a.rate,
              isAvailable: true,
              isVerified: true,
              avgRating: a.rating,
              reviewCount: a.reviews,
            },
          },
        },
      },
      create: {
        name: a.name,
        email: a.email,
        passwordHash: demoPassword,
        role: "artisan",
        locale: "en",
        phone: a.phone,
        locationText: a.location,
        artisanProfile: {
          create: {
            categoryId: categories.get(a.categoryKey)!.id,
            bio: a.bio,
            rateType: "hourly",
            rateAmount: a.rate,
            isAvailable: true,
            isVerified: true,
            avgRating: a.rating,
            reviewCount: a.reviews,
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

  console.log("Seed complete. Worker logins: demo.artisan1@fundi.ng through demo.artisan20@fundi.ng / Password123!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());