import database from "../database/db.js";

export async function createProductReviewsTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        product_id UUID NOT NULL,
        user_id UUID NOT NULL,
        review TEXT NOT NULL,
        rating DECIMAL(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    await database.query(query);
    console.log("✅ Product reviews table created successfully");
  } catch (error) {
    console.error("❌ Failed To Create Product Reviews Table", error);
    process.exit(1);
  }
}
