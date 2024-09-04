/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { api } from "../utils";
import { AllContext } from "../App";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export default function Register() {
  const { register, setRegister } = useContext(AllContext);
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    api
      .post("/auth/register", register)
      .then((res) => {
        setAlertMessage("Registration successful! Redirecting to login...");
        setAlertSeverity("success");
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setAlertMessage("Registration failed! Please try again.");
        setAlertSeverity("error");
        setAlertOpen(true);
      });
  };

  return (
    <section
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080')",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg flex max-w-3xl w-full p-5 opacity-85">
        <div className="w-full md:w-1/2">
          <h2 className="font-bold text-4xl text-[#002D74] mb-4 font-dm-serif text-center">
            Registrasi
          </h2>
          <p className="text-xs text-[#002D74] mb-8 text-center">
            Create your account to get started.
          </p>

          <form onSubmit={handleRegister} className="font-dm-serif space-y-6">
            <div className="flex flex-col">
              <label
                className="text-xl font-semibold mb-1"
                htmlFor="first_name"
              >
                
              </label>
              <input placeholder=" input your full name"
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#002D74] focus:outline-none  border-yellow-500 "
                type="text"
                id="first_name"
                name="first_name"
                value={register.fullname}
                onChange={(e) =>
                  setRegister({
                    ...register,
                    fullname: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-semibold mb-1" htmlFor="username">
              </label>
              <input placeholder=" input your username"
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#002D74] focus:outline-none  border-yellow-500"
                type="text"
                id="username"
                name="username"
                value={register.username}
                onChange={(e) =>
                  setRegister({
                    ...register,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-semibold mb-1" htmlFor="email">
              </label>
              <input placeholder=" input your email"
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#002D74] focus:outline-none  border-yellow-500"
                type="email"
                id="email"
                name="email"
                value={register.email}
                onChange={(e) =>
                  setRegister({
                    ...register,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-semibold mb-1" htmlFor="password">
              </label>
              <input placeholder=" input your password"
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#002D74] focus:outline-none  border-yellow-500"
                type="password"
                id="password"
                name="password"
                value={register.password}
                onChange={(e) =>
                  setRegister({
                    ...register,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#002D74] text-white py-2 rounded-lg hover:scale-105 transition duration-300 hover:bg-[#206ab1] font-medium w-full"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-xs text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="underline text-blue-500">
                Login
              </a>
            </p>
          </div>
        </div>

        <div className="hidden md:block w-1/2 pl-10">
          <img
            className="rounded-lg object-cover h-full"
            src="https://img.freepik.com/free-vector/people-checking-giant-check-list-background_23-2148085674.jpg?t=st=1725155933~exp=1725159533~hmac=1420f43f9d85a4802424a3fecea53191ca4d794578d18e55dc958c28c13b8c1b&w=740"
            alt="register illustration"
          />
        </div>
      </div>

      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ 
            backgroundColor: alertSeverity === "success" ? "#4caf50" : "#f44336", 
            color: "#fff", 
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </section>
  );
}
