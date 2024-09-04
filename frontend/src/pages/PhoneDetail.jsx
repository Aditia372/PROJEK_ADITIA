import { useContext, useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { AllContext } from "../App";
import { Box, Typography, Button, Container } from "@mui/material";
import { api } from "../utils";
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
  const { products } = useContext(AllContext);
  const { ids } = useParams();
  const [user] = useOutletContext();
  const navigate = useNavigate();
  const [cartProduct, setCartProduct] = useState({});

  const productIds = ids ? ids.split(",").map((id) => id) : [];
  const seriesProducts = products.filter((product) =>
    productIds.includes(product.id)
  );

  const [selectedProduct, setSelectedProduct] = useState(seriesProducts[0]);
  const [selectedRam, setSelectedRam] = useState(
    seriesProducts[0]?.ram_storage
  );
  const [selectedColor, setSelectedColor] = useState(
    seriesProducts[0]?.color_name
  );

  useEffect(() => {
    if (selectedProduct) {
      setCartProduct({
        id_user: localStorage.getItem("id"),
        id_product: selectedProduct.id,
        total_product: 1,
      });
    }
  }, [selectedProduct]);

  if (seriesProducts.length === 0) {
    return (
      <Box p={3} bgcolor="#f5f5f5" textAlign="center">
        <Typography variant="h5" color="#333">
          No Product Found
        </Typography>
      </Box>
    );
  }

  const handleRamChange = (ram) => {
    setSelectedRam(ram);
    const matchingProduct = seriesProducts.find(
      (product) =>
        product.ram_storage === ram && product.color_name === selectedColor
    );
    if (matchingProduct) {
      setSelectedProduct(matchingProduct);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const matchingProduct = seriesProducts.find(
      (product) =>
        product.color_name === color && product.ram_storage === selectedRam
    );
    if (matchingProduct) {
      setSelectedProduct(matchingProduct);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const availableRams = [
    ...new Set(seriesProducts.map((product) => product.ram_storage)),
  ];
  const availableColors = [
    ...new Set(
      seriesProducts
        .filter((product) => product.ram_storage === selectedRam)
        .map((product) => product.color_name)
    ),
  ];

  const handleAddToCart = () => {
    if (localStorage.getItem("id")) {
      if (selectedProduct?.stock > 0) {
        api.post("/cart/add", cartProduct).then((res) => {
          alert("Berhasil Masuk Keranjang");
          navigate("/cart");
          window.location.reload();
        });
      } else {
        alert("Maaf Stock Kosong Eung.");
      }
    } else {
      navigate("/out");
    }
  };

  return (
    <div>
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowLeft />}
        sx={{
          margin: 2,
          textTransform: "capitalize",
          color: "black",
          fontSize: "14px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        Back to Catalog
      </Button>
      <Container maxWidth="lg" sx={{ mt: 4, minHeight: "80vh" }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          {/* Image Section */}
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#ffffff"
            p={2}
            borderRadius={2}
            boxShadow={3}
            sx={{ height: "100%" }}
          >
            <img
              src={selectedProduct?.imageurl}
              alt={selectedProduct?.series_name}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Box>

          {/* Details Section */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={2}
            bgcolor="#fafafa"
            sx={{ height: "100%" }}
          >
            <Box mb={2}>
              <Typography variant="h4" color="#222" mb={2}>
                <span className="font-bold font-dm-serif">
                  {" "}
                  {selectedProduct?.series_name || "Product Details"}
                </span>
              </Typography>

              <Typography variant="h5" color="#000" mb={2}>
                <span className="font-bold font-dm-serif">
                  {formatPrice(selectedProduct?.price || 0)}
                </span>
              </Typography>

              <hr className="border-gray-300 mb-5" />
              {/* RAM Selection */}
              <Box mb={1}>
                <Box>
                  {availableRams.map((ram) => (
                    <Button
                      key={ram}
                      variant={ram === selectedRam ? "contained" : "outlined"}
                      color="default"
                      onClick={() => handleRamChange(ram)}
                      sx={{
                        marginRight: 1,
                        marginBottom: 1,
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        borderColor:
                          ram === selectedRam ? "#000" : "rgba(0, 0, 0, 0.23)",
                        color: ram === selectedRam ? "#fff" : "#000",
                        backgroundColor: ram === selectedRam ? "#000" : "#fff",
                      }}
                    >
                      <span className="font-bold font-valera">{ram}</span>
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Color Selection */}
              <Box mb={2}>
                <Box>
                  {availableColors.map((color) => (
                    <Button
                      key={color}
                      variant={
                        color === selectedColor ? "contained" : "outlined"
                      }
                      color="default"
                      onClick={() => handleColorChange(color)}
                      sx={{
                        marginRight: 1,
                        marginBottom: 1,
                        textTransform: "capitalize",
                        borderRadius: "20px",
                        borderColor:
                          color === selectedColor
                            ? "#000"
                            : "rgba(0, 0, 0, 0.23)",
                        color: color === selectedColor ? "#fff" : "#000",
                        backgroundColor:
                          color === selectedColor ? "#000" : "#fff",
                      }}
                    >
                      <span className="font-bold font-valera">{color}</span>
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Description Section */}
              <Box mb={0}>
                <Typography
                  variant="body1"
                  color="#444"
                  sx={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  <span className="font-bold font-dm-serif text-justify">
                    {selectedProduct?.description ||
                      "No description available."}
                  </span>
                </Typography>
              </Box>
            </Box>

            {/* Add to Cart and Checkout Buttons */}
            <Box mt={2} display="flex" gap={2} justifyContent="flex-end ">
              <Button
                variant="contained"
                color="default"
                onClick={handleAddToCart}
                sx={{
                  flexGrow: 1,
                  textTransform: "capitalize",
                  borderRadius: "20px",
                  backgroundColor: "#000",
                  color: "#fff",
                }}
              >
                <span className="font-bold font-valera">Add to Cart</span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
