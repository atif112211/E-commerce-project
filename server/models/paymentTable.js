import database from "../database/db.js";

export async function createPaymentTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS payments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id UUID NOT NULL,
        payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('COD', 'Online')),
        amount DECIMAL(10, 2) NOT NULL,
        payment_status VARCHAR(50) NOT NULL CHECK (payment_status IN ('Pending', 'Success', 'Failed')),
        payment_intent_id VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `;

    await database.query(query);
    console.log("✅ Payment table created successfully");
  } catch (error) {
    console.error("❌ Failed To Create Payment Table", error);
    process.exit(1);
  }
}

