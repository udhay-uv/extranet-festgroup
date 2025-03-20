function doPost(e) {
   const params = JSON.parse(e.postData.contents);
   const action = params.action;




   if (action === "register") return register_User(params);
   if (action === "login") return login_User(params);

   if (action === "get_user_info") return get_User_Info(params);
   if (action === "get_address") return get_Address(params);

   if (action === "update_address") return update_Address(params);
   if (action === "add_address") return add_Address(params);

   if (action === "get_orders") return get_Orders(params);
   if (action === "get_products") return get_Active_Products(params);

   if (action === "place_order") return place_Order(params);

   return ContentService.createTextOutput(
      JSON.stringify({ error: "Invalid action" }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function place_Order(params) {
   // Logger.log(params)
    const orderSheet = getOrderSheet();
    const orderDetailSheet = getOrderDetailSheet();
    const userSheet = getSheet();
 
    const lastRow = orderSheet.getLastRow();
   //  Logger.log(lastRow)
    const newOrderId = "ORD-" + (parseInt(lastRow)+1000 );
 
   //  Logger.log(newOrderId)
 
    orderSheet.appendRow([
        newOrderId,            
        params.gstin,          
        params.type,
        params.orderTime,           
        params.orderDate,
        params.totalPrice,     
        0,
        "",
        "",             
        params.company         
    ]);
 
    params.products.forEach(product => {
       Logger.log(product)
        orderDetailSheet.appendRow([ 
         orderDetailSheet.getLastRow(),
            newOrderId,                         
            product.product.modelNumber,                
            parseInt(product.quantity),                   
            "₹" + parseInt(product.unitPrice),            
            "₹" + (product.quantity * product.unitPrice) 
        ]);
    });
 
    return ContentService.createTextOutput(
        JSON.stringify({
            success: true,
            message: "Order placed successfully",
            orderId: newOrderId
        })
    ).setMimeType(ContentService.MimeType.JSON);
 }
function get_Active_Products(params) {
  Logger.log("hello");
    const productSheet = getProductSheet();
    const productData = productSheet.getDataRange().getValues();
    let products = [];

    for (let i = 1; i < productData.length; i++) {
     
        let company = productData[i][1];  
        let mn = productData[i][3];       
        let active = productData[i][7];   
        if (active  && mn.length!="" && company === params.company) {
            products.push({
                brand: productData[i][0],    
                company: company,               
                modelNumber: mn,                
                type: productData[i][4],        
                power: productData[i][5],       
                description: productData[i][6], 
            });
        }
    }
    Logger.log(products);

    return ContentService.createTextOutput(
        JSON.stringify({ success: true, products: products }),
    ).setMimeType(ContentService.MimeType.JSON);
}

function get_Orders(params) {
   const orderSheet = getOrderSheet();
   const orderDetailSheet = getOrderDetailSheet();
   const addressSheet = getAddressSheet();

   const orderData = orderSheet.getDataRange().getValues();
   const orderDetailData = orderDetailSheet.getDataRange().getValues();
   const addressData = addressSheet.getDataRange().getValues();

   let orders = [];

   for (let i = 1; i < orderData.length; i++) {
      if (
         orderData[i][1] === params.gstin &&
         orderData[i][6] === params.company
      ) {
         let orderId = orderData[i][0];
         let orderType = orderData[i][2];
         let products = [];
         let shippingAddress = "";

         for (let k = 1; k < addressData.length; k++) {
            if (
               addressData[k][1] === params.gstin &&
               addressData[k][2] === orderType &&
               addressData[k][7] === params.company
            ) {
               shippingAddress = addressData[k][3];
               break;
            }
         }

         for (let j = 1; j < orderDetailData.length; j++) {
            if (orderDetailData[j][1] === orderId) {
               products.push({
                  modelNumber: orderDetailData[j][2],
                  quantity: orderDetailData[j][3],
                  unitPrice: orderDetailData[j][4],
                  totalPrice: orderDetailData[j][5],
               });
            }
         }

         orders.push({
            orderId: orderId,
            gstin: orderData[i][1],
            type: orderType,
            timestamp:orderData[i][3],
            orderDate: orderData[i][4],
            totalPrice: orderData[i][5],
            status: orderData[i][6],
            paymentFile:orderData[i][7],
            vehilceRegistrationNo:orderData[i][8],
            company: orderData[i][9],
            shippingAddress: shippingAddress,
            products: products,
         });
      }
   }

   return ContentService.createTextOutput(
      JSON.stringify({ success: true, orders: orders }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function add_Address(params) {
   const sheet = getAddressSheet();
   const data = sheet.getDataRange().getValues();

   sheet.appendRow([
      sheet.getLastRow(),
      params.gstin,
      params.type,
      params.shippingAddress,
      params.phone,
      params.contactName,
      params.company,
   ]);

   const addedAddress=sheet.getDataRange().getValues()[sheet.getLastRow()];


   return ContentService.createTextOutput(
      JSON.stringify({
         success: true,
         message: "Address added successfully",
         address:addedAddress,
         check:"hellos"
      }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function get_Address(params) {
   const sheet = getAddressSheet();
   const data = sheet.getDataRange().getValues();
   let addresses = [];

   for (let i = 1; i < data.length; i++) {
      if (data[i][1] === params.gstin && data[i][6] === params.company) {
         addresses.push({
            id: data[i][0],
            gstin: data[i][1],
            type: data[i][2],
            shippingAddress: data[i][3],
            phone: data[i][4],
            contactName: data[i][5],
            company: data[i][6],
         });
      }
   }

   return ContentService.createTextOutput(
      JSON.stringify({ success: true, addresses: addresses }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function update_Address(params) {
   const sheet = getAddressSheet();
   const data = sheet.getDataRange().getValues();

   for (let i = 1; i < data.length; i++) {
      if (
         data[i][0]===params.id
      ) {
         sheet.getRange(i+1,3).setValue(params.type);
         sheet.getRange(i + 1, 4).setValue(params.shippingAddress);
         sheet.getRange(i + 1, 5).setValue(params.phone);
         sheet.getRange(i + 1, 6).setValue(params.contactName);

         return ContentService.createTextOutput(
            JSON.stringify({
               success: true,
               message: "Address updated successfully",
            }),
         ).setMimeType(ContentService.MimeType.JSON);
      }
   }

   return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "Address not found" }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function get_User_Info(params) {
   const sheet = getSheet();
   const data = sheet.getDataRange().getValues();
   let userInfo = [];

   for (let i = 1; i < data.length; i++) {
      if (data[i][1] === params.gstin && data[i][4] === params.company) {
         userInfo.push({
            gstin: data[i][1],
            name: data[i][3],
            company: data[i][4],
            sales: data[i][5],
            email: data[i][6],
            contactno: data[i][7],
            billingAddress: data[i][8],
            
         });
      }
   }
   return ContentService.createTextOutput(
      JSON.stringify({
         success: true,
         message: "User info fetched successfully",
         user: userInfo,
      }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function register_User(params) {
   const sheet = getSheet();
   const data = sheet.getDataRange().getValues();

   for (let i = 1; i < data.length; i++) {
      if (
         data[i][1] === params.gstin &&
         data[i][2] === params.company &&
         data[i][7] === params.contactno
      ) {
         return ContentService.createTextOutput(
            JSON.stringify({
               success: false,
               message: "GSTIN already exists",
            }),
         ).setMimeType(ContentService.MimeType.JSON);
      }
   }

   sheet.appendRow([
      getSheet().getLastRow(),
      params.gstin,
      params.password,
      params.name,
      params.company,
      params.trigram,
      params.email,
      params.contactno,
      params.billingAddress
   ]);

   return ContentService.createTextOutput(
      JSON.stringify({
         success: true,
         message: "User registered successfully",
      }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function login_User(params) {
   const sheet = getSheet();
   const data = sheet.getDataRange().getValues();

   for (let i = 1; i < data.length; i++) {
      if (
         data[i][1] === params.gstin &&
         data[i][2] === params.password &&
         data[i][4] === params.company
      ) {
         return ContentService.createTextOutput(
            JSON.stringify({
               success: true,
               message: "Login successful",
               user: {
                  gstin: data[i][1],
                  name: data[i][3],
                  company: data[i][4],
                  sales: data[i][5],
               },
            }),
         ).setMimeType(ContentService.MimeType.JSON);
      }
   }

   return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: "GSTIN not found" }),
   ).setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
   const sheet = SpreadsheetApp.openById(
      "1Pr3i3YhVO4QaXpz8baa4BkHA-Z5m1VR49k66Dauzhh4",
   ).getSheetByName("VGROUP_G_EXTRANET_USER");
   return sheet;
}

function getAddressSheet() {
   const sheet = SpreadsheetApp.openById(
      "1Pr3i3YhVO4QaXpz8baa4BkHA-Z5m1VR49k66Dauzhh4",
   ).getSheetByName("TGROUP_9_ADDRESS");
   return sheet;
}

function getOrderSheet() {
   return SpreadsheetApp.openById(
      "1Pr3i3YhVO4QaXpz8baa4BkHA-Z5m1VR49k66Dauzhh4",
   ).getSheetByName("VGROUP_G_EXTRANET_ORDER");
}

function getOrderDetailSheet() {
   return SpreadsheetApp.openById(
      "1Pr3i3YhVO4QaXpz8baa4BkHA-Z5m1VR49k66Dauzhh4",
   ).getSheetByName("VGROUP_G_EXTRANET_ORDER_DETAIL");
}

function getProductSheet() {
    return SpreadsheetApp.openById(
        "1Pr3i3YhVO4QaXpz8baa4BkHA-Z5m1VR49k66Dauzhh4",
    ).getSheetByName("VGROUP_MN");
}
