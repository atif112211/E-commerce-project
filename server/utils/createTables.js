import{createUserTable} from '../models/userTable.js';
import{createOrderItemsTable} from '../models/orderItemsTable.js';
import{createOrdersTable} from '../models/orderTable.js';
import{createPaymentTable} from '../models/paymentTable.js';
import{createProductReviewsTable} from '../models/productReviewsTable.js';
import{createProductsTable} from '../models/productTable.js';
import{createShippingInfoTable} from '../models/shippingInfoTable.js';



export const createTables = async () => {
  try {
    await createUserTable();             // 1. users
    await createProductsTable();         // 2. products
    await createOrdersTable();           // 3. orders
    await createOrderItemsTable();       // 4. order_items
    await createPaymentTable();          // 5. payments
    await createProductReviewsTable();   // 6. reviews
    await createShippingInfoTable();     // 7. shipping_info

    console.log("✅ All tables created successfully");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    process.exit(1);
  }
};
