import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const initialState = {
  email: "",
  password: "",
  name: "",
  citizenship: "",
  RPP: "",
};

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  const { axiosins, setAuth } = useContext(StoreContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignup = async (data) => {
    try {
      const response = await axiosins.post("/register", {
        email: data.email,
        password: data.password,
        name: data.name,
        citizenship: data.citizenship,
        RPP: data.RPP,
        role: "voter",
      });

      if (response.status === 201) {
        toast.success("Account Created Successfully");
        setCurrState("Login");
        reset(initialState);
      } else if (response.status === 409) {
        toast.error("Account Already Exists");
      }
    } catch (error) {
      const message = error.response?.data?.message("An error occurred");
      toast.error(message || "Could not login");
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await axiosins.post("/auth", {
        email: data.email,
        password: data.password,
        role: "voter",
      });

      if (response.status === 200) {
        toast.success("Login Successful");
        setShowLogin(false);
        setAuth({ ...response.data });
        reset(initialState);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.statusText);
      } else {
        const message = error.response?.data?.message("An error occurred");
        toast.error(message);
      }
    }
  };

  return (
    <div className="login-popup">
      <form
        className="login-popup-container"
        onSubmit={handleSubmit(
          currState === "Login" ? handleLogin : handleSignup
        )}
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCross2 onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain only letters and spaces",
                  },
                })}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
              <input
                type="text"
                {...register("citizenship", {
                  required: "Citizenship number is required",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Citizenship number must be alphanumeric",
                  },
                })}
                placeholder="Your Citizenship Number"
              />
              {errors.citizenship && (
                <p className="error-message">{errors.citizenship.message}</p>
              )}
              <input
                type="text"
                {...register("RPP", {
                  required: "RPP is required",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "RPP must be alphanumeric",
                  },
                })}
                placeholder="Your RPP"
              />
              {errors.RPP && (
                <p className="error-message">{errors.RPP.message}</p>
              )}
            </>
          )}
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Your email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Your password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button type="submit">
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
