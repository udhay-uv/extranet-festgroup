import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.a_User.createMany({
    data: [
      {
        id: 1,
        gstin: "07AGJPA0894M1Z5",
        password: "laFraise",
        name: "Infosys Private Limited",
        sales: "ARE",
        email: "test2@gmail.com",
        contactNo: "1234567892",
      },
      {
        id: 2,
        gstin: "06AACCO8878P1ZH",
        password: "laFraise",
        name: "Tata Consultancy Services LLP",
        sales: "ETT",
        email: "test3@gmail.com",
        contactNo: "1234567893",
      },
      {
        id: 3,
        gstin: "07AUMPA9482A1ZO",
        password: "laFraise",
        name: "Wipro Technologies Pvt Ltd",
        sales: "LEK",
        email: "test4@gmail.com",
        contactNo: "1234567894",
      },
      {
        id: 4,
        gstin: "05AAACR5364D1ZO",
        password: "laFraise",
        name: "Mahindra & Mahindra Limited",
        sales: "JAN",
        email: "test5@gmail.com",
        contactNo: "1234567895",
      },
      {
        id: 5,
        gstin: "29XYZAB2345G9Z8",
        password: "spark123",
        name: "Spark",
        sales: "AAA",
        email: "spark@gmail.com",
        contactNo: "1212121212",
      },
      {
        id: 6,
        gstin: "39ZXYWV6543U1Z7",
        password: "laFraise",
        name: "Infosys Private Limited",
        sales: "JAN",
        email: "test6@gmail.com",
        contactNo: "1234567892",
      },
    ],
    skipDuplicates: true, // Optional: avoid inserting if GSTIN already exists
  });

  console.log("✅ A_User data inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });