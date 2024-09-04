import { pool } from "../config/database.js";

export const getAllProduct = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const tambahProduk = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO products (id_series, price, description, ram_storage, imageurl, id_color, brand_name, series_name, color_name,stock) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        req.body.id_series,
        req.body.price,
        req.body.description,
        req.body.ram_storage,
        req.body.imageurl,
        req.body.id_color,
        req.body.brand_name,
        req.body.series_name,
        req.body.color_name,
        req.body.stock,
      ]
    );
    res.json({
      product: result.rows[0],
      message: "Produk berhasil ditambahkan.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    await pool.query(
      "UPDATE products SET id_series = $1, brand_name = $2, description = $3, price = $4, id_color = $5,  ram_storage= $6, imageurl =$7,series_name = $8, color_name = $9, stock = $10 WHERE id = $11",
      [
        req.body.id_series,
        req.body.brand_name,
        req.body.description,
        req.body.price,
        req.body.id_color,
        req.body.ram_storage,
        req.body.imageurl,
        req.body.series_name,
        req.body.color_name,
        req.body.stock,
        req.params.id,
      ]
    );
    res.status(200).json({
      message: "Produk berhasil diubah.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    res.send("Produk berhasil dihapus.");
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
