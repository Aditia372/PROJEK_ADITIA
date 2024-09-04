import { pool } from "../config/database.js";

export const addBrand = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO brands (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    res.json({
      name: result.rows[0],
      message: "Brand Baru berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk mendapatkan semua data ukuran
export const getAllBrand = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM brands");
    res.json(result.rows);
    // console.log(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    await pool.query("UPDATE brands SET name= $1 WHERE id = $2", [
      req.body.name,
      req.params.id,
    ]);
    res.status(200).json({
      message: "Brand berhasil diubah.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    await pool.query("DELETE FROM brands WHERE id = $1", [req.params.id]);
    res.send("Brand berhasil dihapus.");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
