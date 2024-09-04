/* eslint-disable no-unused-vars */
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utils.js";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Login() {
  const [user, setUser] = useOutletContext();
  const [login, setLogin] = useState({
    usernameoremail: "",
    password: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Event handler for text field changes
  function handleChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate();

function handleSubmit(e) {
  e.preventDefault();
  api.post("/auth/login", login).then((response) => {
    if (!response.token) {
      setAlertMessage(response.msg);
      setAlertSeverity("error");
      setAlertOpen(true);
    } else {
      setAlertMessage(response.message);
      setAlertSeverity("success");
      setAlertOpen(true);

      // Delay navigation to allow time for the alert to be visible
      setTimeout(() => {
        api.get("/auth/my-account").then((res) => {
          setUser(res.data);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("id", res.data.id);
          if (res.data.role === "admin") {
            console.log("Masuk sebagai admin");
            navigate("/admin");
          } else {
            console.log("Masuk sebagai user");
            navigate("/");
          }
        });
        localStorage.setItem("token", response.token);
      }, 5000); // Match this duration with `autoHideDuration` for the alert
    }
  });
}

  return (
    <section
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl flex max-w-3xl p-8 shadow-lg items-center">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-4xl text-[#002D74]">LOGIN</h2>
          <p className="text-sm mt-2 text-[#002D74]">
            If you are already a member, easily log in now.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-5 rounded-xl border"
              type="text"
              id="usernameoremail"
              name="usernameoremail"
              value={login.usernameoremail}
              onChange={handleChange}
              placeholder="Username or Email"
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                id="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center text-gray-500">
            <hr className="border-gray-300 flex-grow" />
            <p className="text-center text-sm mx-4">OR</p>
            <hr className="border-gray-300 flex-grow" />
          </div>

          <div className="mt-4 text-sm border-b border-gray-400 py-5 text-center">
            Forgot password?{" "}
            <span className="underline text-blue-500 cursor-pointer">
              Jangan Lupa!
            </span>
          </div>

          <div className="mt-4 text-sm flex justify-between items-center">
            <p>If you don't have an account...</p>
            <button className="hover:border text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
              <a href="/register" className="underline">
                Register
              </a>
            </button>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl max-h-[500px] object-cover"
            src="https://i.pinimg.com/564x/48/0c/b0/480cb009f12cb42fdd99b210562f2cdd.jpg"
            alt="login form image"
          />
        </div>
      </div>

      <Snackbar
        open={alertOpen}
        autoHideDuration={5000} // Increase this value to 10000 milliseconds (10 seconds)
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{
            backgroundColor:
              alertSeverity === "success" ? "#d4edda" : "#f8d7da",
            color: alertSeverity === "success" ? "#155724" : "#721c24",
            fontWeight: "bold",
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </section>
  );
}
