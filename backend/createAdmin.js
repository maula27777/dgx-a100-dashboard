const bcrypt = require("bcryptjs");
const db = require("./db");

async function createAdmin() {
  try {
    const username = "admin";
    const email = "admin@gmail.com";
    const password = "admin123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users (username, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, "admin"]
    );

    console.log("✅ Admin berhasil dibuat!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal membuat admin:");
    console.error(error.message);

    process.exit(1);
  }
}

createAdmin();