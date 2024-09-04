import { pool } from "../config/database.js";

// Controller untuk menambahkan stok produk
export const addSeries = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO series (series_name, description, brand_id,brand_name) VALUES ($1, $2, $3,$4) RETURNING *",
      [req.body.series_name, req.body.description, req.body.brand_id, req.body.brand_name]
    );
    res.json({
      seri: result.rows[0],
      message: "seri baru berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk mendapatkan semua data stok
export const getAllSeries = async (_req, res) => {
  try {
    // const result = await pool.query(
    //   `SELECT st.id, p.name_product, s.name_size, st.quantity
    //   FROM stocks st
    //   JOIN products p ON st.id_product = p.id
    //   JOIN sizes s ON st.id_size = s.id`
    // );
    const result = await pool.query("SELECT * FROM series");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBrandByIdBrand = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.series_name, s.description, s.brand_id, s.brand_name
      FROM series s
      JOIN brands b ON s.brand_id = b.id where s.brand_id = $1`,
      [req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk mengubah data stok berdasarkan id
export const updateSeries = async (req, res) => {
  try {
    await pool.query(
      "UPDATE series SET series_name = $1, description = $2, brand_id = $3, brand_name = $4 WHERE id = $5",
      [req.body.series_name, req.body.description, req.body.brand_id,req.body.brand_name, req.params.id]
    );
    res.status(200).json({
      message: "Series berhasil diubah.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Controller untuk menghapus data stok berdasarkan id
export const deleteSeries = async (req, res) => {
  try {
    await pool.query("DELETE FROM series WHERE id = $1", [req.params.id]);
    res.json({ message: "Series berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};