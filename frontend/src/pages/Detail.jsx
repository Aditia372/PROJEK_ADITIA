import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import { AllContext } from "../App";
import { api } from "../utils";
import { Box, Typography, Paper, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import gopay from "../assets/gopay.png";
import dana from "../assets/dana.png";
import ovo from "../assets/ovo.png";
import shopee from "../assets/shope.png";


export default function Detail() {
  const { products, setOrders, cart } = useContext(AllContext);
  const [shipping_name, setShipping_name] = useState("");
  const [shipping_address, setShipping_address] = useState("");
  const [shipping_phone, setShipping_phone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user] = useOutletContext();
  const [showPayment, setShowPayment] = useState(false); // State for managing payment visibility
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const { items } = location.state || {};

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Items:", items);
  }, [items]);

  const handleSubmit = async () => {
    if (!shipping_name || !shipping_address || !shipping_phone || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if all items have stock
    for (const item of cart) {
      if (item.stock <= 0) {
        alert(`Item ${item.series_name} is out of stock and cannot be ordered.`);
        return;
      }
    }

    const total_price = calculateTotalPrice(items);

    try {
      const response = await api.post("/order/add", {
        user_id: user?.id,
        items: items,
        total_price: total_price.toFixed(2),
        shipping_name,
        shipping_address,
        shipping_phone,
        payment: paymentMethod,
      });

      console.log("Response data:", response.data);
      alert("Order placed successfully!");

      navigate("/out2", { replace: true });
      setOpenModal(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const calculateTotalPrice = (items) => {
    if (!Array.isArray(items)) {
      return 0;
    }
    return items.reduce(
      (acc, item) =>
        acc + parseFloat(item.price) * parseInt(item.total_product, 10),
      0
    );
  };

  if (!localStorage.getItem("id")) {
    setTimeout(() => {
      navigate("/login");
    }, 500);
    return null;
  }

  useEffect(() => {
    setOrders({
      id_user: localStorage.getItem("id"),
      items: cart,
      total_price: calculateTotalPrice(cart).toFixed(2),
      shipping_name,
      shipping_address,
      shipping_phone,
    });
  }, [cart, shipping_name, shipping_address, shipping_phone, setOrders]);

  const totalPrice = calculateTotalPrice(items);

  const handleNextClick = () => {
    if (shipping_name && shipping_address && shipping_phone) {
      setShowPayment(true); // Show the payment section
    } else {
      alert("Please fill in all shipping details before proceeding.");
    }
  };

  const handleBackClick = () => {
    // Navigate to home or previous page
    navigate(-1);
  };

  return (
    <div className="py-6 px-7 font-KumbhSans bg-gray-100">
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        color="textSecondary"
      >
        Your Order
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box>
        {items?.length > 0 ? (
          items.map((item) => (
            <Paper
              key={item.id}
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
                src={item.imageurl}
                alt={item.series_name}
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
                  {item.series_name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" color="textSecondary">
                    Price: Rp{item.price?.toLocaleString("id-ID")}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Quantity: {item.total_product}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body1">No items selected.</Typography>
        )}
      </Box>
      <Box
        sx={{
          p: 2,
          mt: 3,
          mb: 5,
          backgroundColor: "#e3f2fd",
          borderRadius: "12px",
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Total</span>
          <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
        </Typography>
      </Box>

      {!showPayment ? (
        <div className="py-6 px-7 font-KumbhSans bg-gray-100">
          <h2 className="text-5xl font-bold mb-4 font-dm-serif text-center">
            Shipping Details
          </h2>
          <form className="flex flex-col gap-4">
            <div className="mb-4 mt-5">
              <label
                htmlFor="shipping_name"
                className="block text-black font-bold mb-2"
              >
                Receiver Name
              </label>
              <input
                type="text"
                id="shipping_name"
                value={shipping_name}
                onChange={(e) => setShipping_name(e.target.value)}
                required
                className="w-full border border-gray-400 px-2 py-2 focus:outline-none focus:border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="shipping_address"
                className="block text-black font-bold mb-2"
              >
                Address
              </label>
              <textarea
                id="shipping_address"
                value={shipping_address}
                onChange={(e) => setShipping_address(e.target.value)}
                required
                className="w-full border border-gray-400 px-2 py-2 focus:outline-none focus:border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="shipping_phone"
                className="block text-black font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="shipping_phone"
                value={shipping_phone}
                onChange={(e) => setShipping_phone(e.target.value)}
                required
                className="w-full border border-gray-400 px-2 py-2 focus:outline-none focus:border-gray-600"
              />
            </div>

            <button
              type="button"
              onClick={handleNextClick}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Next
            </button>
          </form>
        </div>
      ) : (
        <div className="py-6 px-7 font-KumbhSans bg-gray-100">
          <h2 className="text-5xl font-bold mb-4 font-dm-serif text-center">
            Payment Orders
          </h2>
          <form className="flex flex-col gap-4">
            <div className="mb-4">
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="GoPay"
                    checked={paymentMethod === "GoPay"}
                    onChange={() => setPaymentMethod("GoPay")}
                  />
                  <img src={gopay} alt="GoPay" className="w-36" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Dana"
                    checked={paymentMethod === "Dana"}
                    onChange={() => setPaymentMethod("Dana")}
                  />
                  <img src={dana} alt="Dana" className="w-36" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ShopeePay"
                    checked={paymentMethod === "ShopeePay"}
                    onChange={() => setPaymentMethod("ShopeePay")}
                  />
                  <img src={shopee} alt="ShopeePay" className="w-28" />
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="OVO"
                    checked={paymentMethod === "OVO"}
                    onChange={() => setPaymentMethod("OVO")}
                  />
                  <img src={ovo} alt="OVO" className="w-14" />
                </label>
              </div>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button onClick={handleBackClick} variant="contained" color="primary">
                Back
              </Button>
              <Button onClick={() => setOpenModal(true)} variant="contained" color="secondary">
                Buy 
              </Button>
            </Box>
          </form>
        </div>
      )}

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle><span className="font-oleo text-xl font-bold">Tolong Periksa Data Transaksi ini ya...</span></DialogTitle>
        <DialogContent>
          <Typography>
            <span className="font-valera font-bold">Total Price: Rp{calculateTotalPrice(items).toLocaleString("id-ID")}</span>
          </Typography>
          <Typography><span className="font-valera font-bold">Payment Method: {paymentMethod}</span></Typography>
          <Typography><span className="font-valera font-bold">Shipping Name: {shipping_name}</span></Typography>
          <Typography><span className="font-valera font-bold">Shipping Address: {shipping_address}</span></Typography>
          <Typography><span className="font-valera font-bold">Shipping Phone: {shipping_phone}</span></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
