import { pool } from "../config/database.js";
export const addWarna = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO colors (name) VALUES ($1) RETURNING *",
      [req.body.name]
    );
    res.json({
      name: result.rows[0],
      message: "Warna Baru berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk mendapatkan semua data ukuran
export const getAllWarna = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colors");
    res.json(result.rows);
    // console.log(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateColor = async (req, res) => {
  try {
    await pool.query("UPDATE colors SET name= $1 WHERE id = $2", [
      req.body.name,
      req.params.id,
    ]);
    res.status(200).json({
      message: "Warna berhasil diubah.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteColor = async (req, res) => {
  try {
    await pool.query("DELETE FROM colors WHERE id = $1", [req.params.id]);
    res.send("Warna berhasil dihapus.");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
