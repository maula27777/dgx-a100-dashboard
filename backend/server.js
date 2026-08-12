const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);

app.use(express.json());

/* =========================
   TEST SERVER
========================= */

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend DGX A100 berjalan.",
  });
});

/* =========================
   LOGIN
========================= */

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dan password wajib diisi.",
      });
    }

    const [users] = await db.query(
      "SELECT id, username, email, password, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Email atau password salah.",
      });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email atau password salah.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      message: "Login berhasil.",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
});

/* =========================
   VERIFY TOKEN
========================= */

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token tidak ditemukan.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token tidak valid atau sudah kedaluwarsa.",
    });
  }
}

/* =========================
   CEK USER LOGIN
========================= */

app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, username, email, role FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    res.json({
      user: users[0],
    });
  } catch (error) {
    console.error("ME ERROR:", error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server.",
    });
  }
});

/* =========================
   ADMIN - LIHAT USER
========================= */

app.get(
  "/api/users",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Akses hanya untuk admin.",
        });
      }

      const [users] = await db.query(
        "SELECT id, username, email, role, created_at FROM users ORDER BY id DESC"
      );

      res.json({
        users,
      });
    } catch (error) {
      console.error("GET USERS ERROR:", error);

      res.status(500).json({
        message: "Gagal mengambil data user.",
      });
    }
  }
);

/* =========================
   ADMIN - TAMBAH USER
========================= */

app.post(
  "/api/users",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Akses hanya untuk admin.",
        });
      }

      const {
        username,
        email,
        password,
        role,
      } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          message:
            "Username, email, dan password wajib diisi.",
        });
      }

      const userRole =
        role === "admin" ? "admin" : "user";

      const hashedPassword =
        await bcrypt.hash(password, 10);

      await db.query(
        `INSERT INTO users
        (username, email, password, role)
        VALUES (?, ?, ?, ?)`,
        [
          username,
          email,
          hashedPassword,
          userRole,
        ]
      );

      res.status(201).json({
        message: "User berhasil ditambahkan.",
      });
    } catch (error) {
      console.error("CREATE USER ERROR:", error);

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message:
            "Username atau email sudah digunakan.",
        });
      }

      res.status(500).json({
        message: "Gagal menambahkan user.",
      });
    }
  }
);

/* =========================
   ADMIN - HAPUS USER
========================= */

app.delete(
  "/api/users/:id",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Akses hanya untuk admin.",
        });
      }

      const userId = Number(req.params.id);

      if (userId === req.user.id) {
        return res.status(400).json({
          message: "Admin tidak dapat menghapus akun sendiri.",
        });
      }

      const [result] = await db.query(
        "DELETE FROM users WHERE id = ?",
        [userId]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "User tidak ditemukan.",
        });
      }

      res.json({
        message: "User berhasil dihapus.",
      });
    } catch (error) {
      console.error("DELETE USER ERROR:", error);

      res.status(500).json({
        message: "Gagal menghapus user.",
      });
    }
  }
);

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Backend berjalan di http://localhost:${PORT}`
  );
});