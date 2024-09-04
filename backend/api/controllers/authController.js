import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

export const registerAccount = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const result = await pool.query(
      "INSERT INTO users (fullname, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [fullname, username, email, hashPassword]
    );
    res.status(201).json({ msg: "Pendaftaran berhasil", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addAccount = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;
  try {
    const hashPassword = await argon2.hash(password);
    const result = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [fullname, username, email, hashPassword, role]
    );
    res.status(201).json({
      msg: "Pendaftaran akun melalui admin telah berhasil",
      data: result.rows[0],
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error });
  }
};

export const loginAccount = async (req, res) => {
  const { usernameoremail, password } = req.body;
  try {
    // Mencari data user berdasarkan username atau email
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [usernameoremail, usernameoremail]
    );

    if (result.rows[0]) {
      const isPasswordValid = await argon2.verify(
        result.rows[0].password,
        password
      );

      if (isPasswordValid) {
        const token = jwt.sign(result.rows[0], process.env.SECRET_KEY);

        // Set cookie
        res.cookie("token", token, {
          httpOnly: true,
        });

        res.status(200).json({
          token,
          message: "Login berhasil !!!",
        });
      } else {
        return res.status(401).json({ msg: "Password salah !!!" });
      }
    } else {
      return res.status(404).json({ msg: "User tidak ditemukan !!!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller untuk mendapatkan user yang sedang login
export const getCurrentUser = async (req, res) => {
  try {
    return res.json({
      status: "Berhasil",
      msg: `${req.user.fullname} sedang login`,
      data: req.user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve current user data. User is not logged in",
    });
  }
};

// Controller untuk logout account
export const logoutAccount = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout berhasil" });
};

export const updateAccount = async (req, res) => {
  const { fullname, username, role, email } = req.body;
  try {
    if (req.params.id === "1") {
      res.status(200).json({
        msg: "Data admin utama tidak bisa diubah.",
      });
    } else {
      await pool.query(
        "UPDATE users SET fullname = $1, username = $2, email = $3, role= $4 WHERE id = $5",
        [fullname, username, email, role, req.params.id]
      );
      res.status(200).json({
        msg: "Data berhasil diubah.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    if (req.params.id == 1) {
      res.send("Role admin utama tidak bisa diubah");
    } else {
      await pool.query("UPDATE users SET role = $1 WHERE id = $2", [
        req.body.role,
        req.params.id,
      ]);

      res.status(200).json({
        message: "Role berhasil diubah.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    if (req.params.id === "1") {
      res.status(200).json({
        msg: "Data admin utama tidak bisa dihapus.",
      });
    } else {
      await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
      res.status(200).json({ msg: "User berhasil dihapus." });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllUser = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO contacts (id_user, name, subject, message) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.body.id_user,req.body.name, req.body.subject, req.body.message]
    );
    res.json({
      name: result.rows[0],
      message: "Pesan berhasil dikirim.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};