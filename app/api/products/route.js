// app/api/products/route.js
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    // Create a connection to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Execute the SQL query
    const query = `
      SELECT 
        p.product_id AS id,
        p.product_name AS product_name,
        p.product_brand AS product_brand,
        o.owner_name AS product_owner
      FROM products p
      LEFT JOIN products_owners po ON p.product_id = po.products_id
      LEFT JOIN owners o ON po.owners_id = o.id
    `;
    const [rows] = await connection.execute(query);

    // Close the connection
    await connection.end();

    // Return the results as JSON
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    if (connection) await connection.end();
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
