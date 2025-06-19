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
    ],
    skipDuplicates: true, // Optional: avoid inserting if GSTIN already exists
  });



  console.log("✅ A_User data inserted.");

  await prisma.s_User.createMany({
    data: [
      {
        id: 1,
        gstin: "07AAACN2427K1ZJ",
        password: "leCurry",
        name: "Bajaj Finserv Limited",
        sales: "ETT",
        email: "test10@gmail.com",
        contactNo: "1234567890",
      },
      {
        id: 2,
        gstin: "10UVWXY9876T5Z1",
        password: "123random",
        name: "Marico LLP",
        sales: "DDD",
        email: "test21@gmail.com",
        contactNo: "5656457777",
      },
    ],
    skipDuplicates: true, // Prevent inserting duplicates if any
  });

  await prisma.s_Address.createMany({
    data: [
      {
        id: 1,
        gstin: "07AAACN2427K1ZJ",
        bs: "Shipping",
        type: "Home",
        address: "Summa St, Delhi, India-110001",
        phone: "6666666666",
        contactName: "Rahul Sharma",
      },
      {
        id: 2,
        gstin: "07AAACN2427K1ZJ",
        bs: "Billing",
        type: "Corporate Office",
        address: "Cyber Tower, Noida, UP-201301",
        phone: "7777777777",
        contactName: "Amit Kumar",
      },
    ],
    skipDuplicates: true, // avoids conflict on rerun
  });

  console.log("✅ S_Address data inserted.");

  await prisma.s_Order.createMany({
    data: [
      {
        id: 1,
        orderNo: "ORD-5001",
        gstin: "07AAACN2427K1ZJ",
        billingAddressId: 1,
        shippingAddressId: 2,
        timeStamp: "10:30:00",
        orderDate: "2024-03-01",
        totalPrice: 75000,
        status: 2,
        paymentFile: "proof_5001.pdf",
        vehicleRegNo: null,
      },
      {
        id: 2,
        orderNo: "ORD-5002",
        gstin: "07AAACN2427K1ZJ",
        billingAddressId: 1,
        shippingAddressId: 2,
        timeStamp: "12:15:00",
        orderDate: "2024-03-02",
        totalPrice: 95000,
        status: 4,
        paymentFile: "proof_5002.pdf",
        vehicleRegNo: null,
      },
      {
        id: 3,
        orderNo: "ORD-5003",
        gstin: "07AAACN2427K1ZJ",
        billingAddressId: 1,
        shippingAddressId: 2,
        timeStamp: "15:45:00",
        orderDate: "2024-03-03",
        totalPrice: 125000,
        status: 6,
        paymentFile: "proof_5003.pdf",
        vehicleRegNo: "MH12AB1234",
      },
      {
        id: 4,
        orderNo: "ORD-5004",
        gstin: "07AAACN2427K1ZJ",
        billingAddressId: 1,
        shippingAddressId: 2,
        timeStamp: "17:20:00",
        orderDate: "2024-03-04",
        totalPrice: 180000,
        status: 8,
        paymentFile: "proof_5004.pdf",
        vehicleRegNo: "DL10XYZ5678",
      },
      {
        id: 5,
        orderNo: "ORD-5005",
        gstin: "07AAACN2427K1ZJ",
        billingAddressId: 1,
        shippingAddressId: 2,
        timeStamp: "19:10:00",
        orderDate: "2024-03-05",
        totalPrice: 220000,
        status: 10,
        paymentFile: "proof_5005.pdf",
        vehicleRegNo: "KA05MN7890",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.s_OrderDetails.createMany({
    data: [
      {
        id: 1,
        orderId: "ORD-001", // corresponds to ORD-5001
        modelNumber: "SUN-3K-G03",
        quantity: 2,
        unitPrice: 25000,
        netPrice: 50000,
        cgst: 2500,
        sgst: 2500,
        totalAmount: 55000,
      },
      {
        id: 2,
        orderId: "ORD-002", // corresponds to ORD-5002
        modelNumber: "SUN-5K-G03",
        quantity: 3,
        unitPrice: 30000,
        netPrice: 90000,
        cgst: 4500,
        sgst: 4500,
        totalAmount: 99000,
      },
      {
        id: 3,
        orderId: "ORD-003", // corresponds to ORD-5003
        modelNumber: "SUN-8K-G03",
        quantity: 1,
        unitPrice: 80000,
        netPrice: 80000,
        cgst: 4000,
        sgst: 4000,
        totalAmount: 88000,
      },
      {
        id: 4,
        orderId: "ORD-004", // corresponds to ORD-5004
        modelNumber: "SUN-10K-G03",
        quantity: 2,
        unitPrice: 90000,
        netPrice: 180000,
        cgst: 9000,
        sgst: 9000,
        totalAmount: 198000,
      },
      {
        id: 5,
        orderId: "ORD-005", // corresponds to ORD-5005
        modelNumber: "SUN-12K-G03",
        quantity: 2,
        unitPrice: 110000,
        netPrice: 220000,
        cgst: 11000,
        sgst: 11000,
        totalAmount: 242000,
      },
    ],
    skipDuplicates: true,
  });
   console.log("✅ S_OrderDetails data inserted.");

  await prisma.t_User.createMany({
    data: [
      {
        id: 1,
        gstin: "07AAACN2427K1ZJ",
        password: "laFraise",
        name: "Reliance Industries LP",
        sales: "GCP",
        email: "test1@gmail.com",
        contactNo: "1234567891",
      },
      {
        id: 2,
        gstin: "39ZXYWV6543U1Z7",
        password: "123random",
        name: "Dr. Reddy's Laboratories Pvt Ltd",
        sales: "UUU",
        email: "test40@gmail.com",
        contactNo: "2323232323",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ T_User data inserted.");

 

  console.log("✅ S_Order data inserted.");

  await prisma.t_Address.createMany({
    data: [
      {
        id: 1,
        gstin: "39ZXYWV6543U1Z7",
        bs: "Shipping",
        type: "Home",
        address: "MG Road, Pune, Maharashtra-411001",
        phone: "1234587698",
        contactName: "Adam Smith",
      },
      {
        id: 2,
        gstin: "39ZXYWV6543U1Z7",
        bs: "Shipping",
        type: "Home",
        address: "Electronic City, Bangalore, Karnataka-560100",
        phone: "2345623456",
        contactName: "Vinay Raj",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ T_Address data inserted.");
  await prisma.a_Address.createMany({
    data: [
      {
        id: 4,
        gstin: "07AUMPA9482A1ZO",
        bs: "Billing",
        type: "Headquarter 2",
        address: "45 Corporate Rd, Mumbai, Maharashtra-400001",
        phone: "1212121212",
        contactName: "New Contact",
      },
      {
        id: 5,
        gstin: "07AUMPA9482A1ZO",
        bs: "Billing",
        type: "Coimbatore",
        address: "98 Industrial Ave, Coimbatore, Tamil Nadu-641001",
        phone: "2323232323",
        contactName: "John Doe",
      },
      {
        id: 6,
        gstin: "07AUMPA9482A1ZO",
        bs: "Shipping",
        type: "Factory2",
        address: "67 Solar Park, Bangalore, Karnataka-560001",
        phone: "9999999999",
        contactName: "John Test",
      },
      {
        id: 7,
        gstin: "07AUMPA9482A1ZO",
        bs: "Billing",
        type: "Chennai",
        address: "123",
        phone: "22222222",
        contactName: "asas",
      },
      {
        id: 8,
        gstin: "07AUMPA9482A1ZO",
        bs: "Shipping",
        type: "Factory6",
        address: "Street2",
        phone: "1111111",
        contactName: "John",
      },
      {
        id: 9,
        gstin: "29XYZAB2345G9Z8",
        bs: "Billing",
        type: "Work",
        address: "nehru nagar,karnataka",
        phone: "1212121212",
        contactName: "John Arun",
      },
      {
        id: 10,
        gstin: "29XYZAB2345G9Z8",
        bs: "Shipping",
        type: "Factory",
        address: "gandhi nagar,Karnataka",
        phone: "1212121212",
        contactName: "Arun",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ A_Address data inserted successfully.");

  await prisma.a_Order.createMany({
    data: [
      {
        id: 1,
        orderNo: "ORD-1001",
        gstin: "07AUMPA9482A1ZO",
        billingAddressId: 4,
        shippingAddressId: 6,
        timeStamp: "6:31:54",
        orderDate: "2025-03-20",
        totalPrice: 250000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 2,
        orderNo: "ORD-1002",
        gstin: "07AUMPA9482A1ZO",
        billingAddressId: 5,
        shippingAddressId: 6,
        timeStamp: "7:55:54",
        orderDate: "2025-03-20",
        totalPrice: 100000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 3,
        orderNo: "ORD-1003",
        gstin: "29XYZAB2345G9Z8",
        billingAddressId: 9,
        shippingAddressId: 10,
        timeStamp: "17:30:32",
        orderDate: "2025-03-20",
        totalPrice: 50000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 4,
        orderNo: "ORD-1004",
        gstin: "29XYZAB2345G9Z8",
        billingAddressId: 9,
        shippingAddressId: 10,
        timeStamp: "17:36:39",
        orderDate: "2025-03-20",
        totalPrice: 50000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 5,
        orderNo: "ORD-1005",
        gstin: "29XYZAB2345G9Z8",
        billingAddressId: 9,
        shippingAddressId: 10,
        timeStamp: "17:36:59",
        orderDate: "2025-03-20",
        totalPrice: 100000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 6,
        orderNo: "ORD-1006",
        gstin: "29XYZAB2345G9Z8",
        billingAddressId: 9,
        shippingAddressId: 10,
        timeStamp: "17:37:53",
        orderDate: "2025-03-20",
        totalPrice: 150000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 7,
        orderNo: "ORD-1007",
        gstin: "29XYZAB2345G9Z8",
        billingAddressId: 9,
        shippingAddressId: 10,
        timeStamp: "17:38:19",
        orderDate: "2025-03-20",
        totalPrice: 50000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
      {
        id: 8,
        orderNo: "ORD-1008",
        gstin: "29XYZAB2345G9Z8",
        billingAddressId: 9,
        shippingAddressId: 10,
        timeStamp: "17:38:55",
        orderDate: "2025-03-20",
        totalPrice: 75000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ A_Order data inserted.");
  await prisma.a_OrderDetails.createMany({
    data: [
      {
        id: 1,
        orderId: "ORD-1001",
        modelNumber: "SUN-5K-G03",
        quantity: 2,
        unitPrice: 50000,
        netPrice: 100000,
        cgst: 6,
        sgst: 6,
        totalAmount: 112000,
      },
      {
        id: 2,
        orderId: "ORD-1001",
        modelNumber: "SUN-10K-G03",
        quantity: 1,
        unitPrice: 150000,
        netPrice: 150000,
        cgst: 6,
        sgst: 6,
        totalAmount: 168000,
      },
      {
        id: 3,
        orderId: "ORD-1002",
        modelNumber: "SUN-4K-G03",
        quantity: 3,
        unitPrice: 25000,
        netPrice: 75000,
        cgst: 6,
        sgst: 6,
        totalAmount: 84000,
      },
      {
        id: 4,
        orderId: "ORD-1002",
        modelNumber: "SUN-1.5K-G03",
        quantity: 1,
        unitPrice: 25000,
        netPrice: 25000,
        cgst: 6,
        sgst: 6,
        totalAmount: 28000,
      },
      {
        id: 5,
        orderId: "ORD-1003",
        modelNumber: "SUN-4K-G03",
        quantity: 2,
        unitPrice: 25000,
        netPrice: 50000,
        cgst: 6,
        sgst: 6,
        totalAmount: 56000,
      },
      {
        id: 6,
        orderId: "ORD-1004",
        modelNumber: "SUN-5K-G03",
        quantity: 2,
        unitPrice: 25000,
        netPrice: 50000,
        cgst: 6,
        sgst: 6,
        totalAmount: 56000,
      },
      {
        id: 7,
        orderId: "ORD-1005",
        modelNumber: "SUN-20K-G05",
        quantity: 4,
        unitPrice: 25000,
        netPrice: 100000,
        cgst: 6,
        sgst: 6,
        totalAmount: 112000,
      },
      {
        id: 8,
        orderId: "ORD-1006",
        modelNumber: "SUN-20K-G05",
        quantity: 6,
        unitPrice: 25000,
        netPrice: 150000,
        cgst: 6,
        sgst: 6,
        totalAmount: 168000,
      },
      {
        id: 9,
        orderId: "ORD-1007",
        modelNumber: "SUN-40K-G03",
        quantity: 2,
        unitPrice: 25000,
        netPrice: 50000,
        cgst: 6,
        sgst: 6,
        totalAmount: 56000,
      },
      {
        id: 10,
        orderId: "ORD-1008",
        modelNumber: "0.54",
        quantity: 3,
        unitPrice: 25000,
        netPrice: 75000,
        cgst: 6,
        sgst: 6,
        totalAmount: 84000,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ A_OrderDetails data inserted successfully.");

  await prisma.product.createMany({
    data: [
      {
        brand: "ADANI",
        company: "A",
        igst: 12,
        mn: "ASB-M10-144-535#36Nos",
        pn: "#36Nos",
        mn_pn: "ASB-M10-144-535",
        family: "MODULES",
        power: 0.535,
        description: "Bifacial 535Wp Topcon DCR Module",
        active: true,
        type: "DCR",
        group: "36",
        desc_offcial: "#36Nos - ADANI Bifacial 535Wp Topcon DCR Module | FULL Pallet",
        brand_short: "ADANI"
      },
      {
        brand: "ADANI",
        company: "A",
        igst: 12,
        mn: "ASB-M10-144-535",
        pn: "",
        mn_pn: "ASB-M10-144-535",
        family: "MODULES",
        power: 0.535,
        description: "Bifacial 535Wp Topcon DCR Module",
        active: true,
        type: "DCR",
        group: "1",
        desc_offcial: "ADANI Bifacial 535Wp Topcon DCR Module | 1 Pc Only",
        brand_short: "ADANI"
      },
      {
        brand: "ADANI",
        company: "A",
        igst: 12,
        mn: "ASB-M10-144-540#36Nos",
        pn: "#36Nos",
        mn_pn: "ASB-M10-144-540",
        family: "MODULES",
        power: 0.54,
        description: "Bifacial 540Wp DCR Module",
        active: true,
        type: "DCR",
        group: "36",
        desc_offcial: "#36Nos - ADANI Bifacial 540Wp DCR Module | FULL Pallet",
        brand_short: "ADANI"
      },
      {
        brand: "ADANI",
        company: "A",
        igst: 12,
        mn: "ASB-M10-144-540",
        pn: "",
        mn_pn: "ASB-M10-144-540",
        family: "MODULES",
        power: 0.54,
        description: "Bifacial 540Wp DCR Module",
        active: true,
        type: "DCR",
        group: "1",
        desc_offcial: "ADANI Bifacial 540Wp DCR Module | 1 Pc Only",
        brand_short: "ADANI"
      },
       {
        brand: "ADANI",
        company: "A",
        igst: 12,
        mn: "ASB-M10-144-535#36Nos",
        pn: "#36Nos",
        mn_pn: "ASB-M10-144-535",
        family: "MODULES",
        power: 0.535,
        description: "Bifacial 535Wp Topcon DCR Module",
        active: true,
        type: "DCR",
        group: "36",
        desc_offcial: "#36Nos - ADANI Bifacial 535Wp Topcon DCR Module | FULL Pallet",
        brand_short: "ADANI"
      },
      {
        brand: "ADANI",
        company: "A",
        igst: 12,
        mn: "ASB-M10-144-535",
        pn: "",
        mn_pn: "ASB-M10-144-535",
        family: "MODULES",
        power: 0.535,
        description: "Bifacial 535Wp Topcon DCR Module",
        active: true,
        type: "DCR",
        group: "1",
        desc_offcial: "ADANI Bifacial 535Wp Topcon DCR Module | 1 Pc Only",
        brand_short: "ADANI"
      },
    ],
    skipDuplicates: true // prevents error if the 'mn' unique key already exists
  });

  console.log("✅ Product data seeded");

  console.log("✅ Product data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



