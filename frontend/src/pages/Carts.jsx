import { useContext, useEffect, useState } from "react";
import { AllContext } from "../App";
import { useNavigate } from "react-router-dom";
import cartImage from "../assets/cart.png";
import { api } from "../utils";
import {
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";

export default function Carts() {
  const { cart, setCart } = useContext(AllContext);
  const { products, setProducts } = useContext(AllContext);
  const [subTotal, setSubTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/out");
    }
  }, [navigate]);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, curr) =>
        selectedItems.includes(curr.id)
          ? acc + parseInt(curr.price) * parseInt(curr.total_product)
          : acc,
      0
    );
    setSubTotal(sum);
  }, [cart, selectedItems]);

  return (
    <Box
      sx={{
        py: 5,
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 3,
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            backgroundColor: "#ffeb3b",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 3,
          }}
        >
          <ShoppingCartIcon color="action" />
        </Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          color="textSecondary"
        >
          Your Items
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box>
          {cart.length > 0 ? (
            <Box>
              {cart.map((c) => (
                <Paper
                  key={c.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "12px",
                    boxShadow: 2,
                    backgroundColor: "#fafafa",
                  }}
                >
                  <Box
                    component="img"
                    src={c.imageurl}
                    alt={c.series_name}
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "1.5rem", mb: 1 }}
                    >
                      {c.series_name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" color="textSecondary">
                          Rp. {formatPrice(c.price)}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          Stock: {c.stock}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            onClick={() => {
                              if (c.total_product > 1) {
                                api
                                  .put(`/cart/update/${c.id}`, {
                                    total_product: parseInt(c.total_product) - 1,
                                  })
                                  .then(() =>
                                    setCart((prev) =>
                                      prev.map((item) =>
                                        item.id === c.id
                                          ? {
                                              ...item,
                                              total_product:
                                                parseInt(item.total_product) - 1,
                                            }
                                          : item
                                      )
                                    )
                                  );
                              } else {
                                alert("Quantity cannot be less than 1");
                              }
                            }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ mx: 2 }}>
                            {c.total_product}
                          </Typography>
                          <IconButton
                            onClick={() => {
                              if (c.total_product < c.stock) {
                                api
                                  .put(`/cart/update/${c.id}`, {
                                    total_product: parseInt(c.total_product) + 1,
                                  })
                                  .then(() =>
                                    setCart((prev) =>
                                      prev.map((item) =>
                                        item.id === c.id
                                          ? {
                                              ...item,
                                              total_product:
                                                parseInt(item.total_product) + 1,
                                            }
                                          : item
                                      )
                                    )
                                  );
                              } else {
                                alert("Cannot exceed available stock");
                              }
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ ml: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedItems.includes(c.id)}
                              onChange={() =>
                                setSelectedItems((prev) =>
                                  prev.includes(c.id)
                                    ? prev.filter((item) => item !== c.id)
                                    : [...prev, c.id]
                                )
                              }
                            />
                          }
                          label="Select"
                        />
                        <IconButton
                          color="error"
                          onClick={() => {
                            api.delete(`/cart/delete/${c.id}`).then(() => {
                              setCart((prev) =>
                                prev.filter((item) => item.id !== c.id)
                              );
                            });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
              }}
            >
              <img src={cartImage} alt="Empty Cart" style={{ width: "150px", marginBottom: "20px" }} />
              <Typography variant="h5" color="textSecondary">
                Your cart is empty
              </Typography>
            </Box>
          )}
        </Box>
        {selectedItems.length > 0 && (
          <Box
            sx={{
              p: 3,
              backgroundColor: "#e3f2fd",
              borderRadius: "12px",
              mt: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="textPrimary"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              Order Summary
            </Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: 1,
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Subtotal</span>
                  <span>Rp{subTotal.toLocaleString("id-ID")}</span>
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Total</span>
                <span>Rp{subTotal.toLocaleString("id-ID")}</span>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() =>
                  navigate("/detail-product", {
                    state: {
                      items: cart.filter((item) =>
                        selectedItems.includes(item.id)
                      ),
                    },
                  })
                }
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
