import { pool } from "../config/database.js";

export const getOrderByIdUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await pool.query(
      `
      SELECT o.id, u.username, p.series_name, p.imageurl, p.price,o.total_product,o.shipping_name, o.shipping_address, o.shipping_phone, o.total_price, o.payment
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      WHERE o.user_id = $1
    `,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const addOrderUser = async (req, res) => {
  const {
    user_id,
    items,
    total_price,
    total_product,
    shipping_name,
    shipping_address,
    shipping_phone,
    payment
  } = req.body;

  try {
    if (items?.length > 1) {
      for (const order of items) {
        const { id_product, total_product, price } = order;
        await pool.query(
          "INSERT INTO orders (user_id, product_id, total_price, total_product, shipping_name, shipping_address, shipping_phone,payment) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
          [
            user_id,
            id_product,
            price * total_product,
            total_product,
            shipping_name,
            shipping_address,
            shipping_phone,
            payment
          ]
        );

        // Corrected DELETE and UPDATE queries
        await pool.query(
          "DELETE FROM carts WHERE id_user = $1 AND id_product = $2",
          [user_id, id_product]
        );

        await pool.query(
          "UPDATE products SET stock = (stock - $1) WHERE id = $2",
          [total_product, id_product]
        );
      }
    } else if (items?.length === 1) {
      // Handle single item order
      const order = items[0];
      const { id_product, total_product } = order;

      await pool.query(
        "INSERT INTO orders (user_id, product_id, total_price,total_product, shipping_name, shipping_address, shipping_phone,payment) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
        [
          user_id,
          id_product,
          total_price,
          total_product,
          shipping_name,
          shipping_address,
          shipping_phone,
          payment
        ]
      );

      await pool.query(
        "DELETE FROM carts WHERE id_user = $1 AND id_product = $2",
        [user_id, id_product]
      );

      await pool.query(
        "UPDATE products SET stock = (stock - $1) WHERE id = $2",
        [total_product, id_product]
      );
    }

    res.json({ msg: "Pesanan telah berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    res.json({
      orders: result.rows,
      message: "Orders retrieved successfully.",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
