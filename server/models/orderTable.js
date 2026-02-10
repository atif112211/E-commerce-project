import database from "../database/db.js";

export async function createOrdersTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS orders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        buyer_id UUID NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
        shipping_amount DECIMAL(10, 2) NOT NULL CHECK (shipping_amount >= 0),
        order_status VARCHAR(50) DEFAULT 'Pending' CHECK (order_status IN ('Pending', 'Shipped', 'Delivered', 'Cancelled')),
        paid_at TIMESTAMP CHECK(paid_at IS NULL OR paid_at <= CURRENT_TIMESTAMP),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    await database.query(query);
    console.log("✅ Orders table created successfully");
  } catch (error) {
    console.error("❌ Failed To Create Orders Table", error);
    process.exit(1);
  }
}
