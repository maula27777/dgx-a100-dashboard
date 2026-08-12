const db = require("./db");

async function testDatabase() {
  try {
    const [rows] = await db.query("SELECT 1 AS test");

    console.log("✅ MySQL berhasil terhubung!");
    console.log(rows);

    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal konek MySQL:");
    console.error(error.message);

    process.exit(1);
  }
}

testDatabase();