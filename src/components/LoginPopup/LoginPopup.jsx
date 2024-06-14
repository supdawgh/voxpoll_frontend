import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import { PiXLogoFill } from "react-icons/pi";

const initialState = {
  email: "",
  password: "",
  name: "",
  citizenship: "",
  RPP: "",
};

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  const { auth, axiosins, setAuth } = useContext(StoreContext);

  const [formState, setFormState] = useState(initialState);

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !formState.email ||
      !formState.password ||
      !formState.name ||
      !formState.citizenship ||
      !formState.RPP
    )
      return toast.error("Fill all fields.");

    try {
      axiosins
        .post("/register", {
          email: formState.email,
          password: formState.password,
          name: formState.name,
          citizenship: formState.citizenship,
          RPP: formState.RPP,
          role: "voter",
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("Account Created Successfull");
            setCurrState("Login");
            setFormState(initialState);
          }
          if (response.status === 409) {
            toast.error("Account Already Exists");
          }
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formState.email || !formState.password) return;

    try {
      axiosins
        .post("/auth", {
          email: formState.email,
          password: formState.password,
          role: "voter",
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Login Successfull");
            setShowLogin(false);

            setAuth({ ...response.data });
            setFormState(initialState);
          }
        })
        .catch((response) => {
          if (response.response.status == 401) {
            toast.error("Credentials did not match");
          }
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCross2 onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Your name"
                value={formState.name}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      name: e.target.value,
                    };
                  })
                }
              />
              <input
                type="text"
                placeholder="Your Citizenship Number"
                value={formState.citizenship}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      citizenship: e.target.value,
                    };
                  })
                }
              />
              <input
                type="text"
                placeholder="Your RPP"
                value={formState.RPP}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      RPP: e.target.value,
                    };
                  })
                }
              ></input>
            </>
          )}
          <input
            type="email"
            placeholder="Your email"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              })
            }
          ></input>
          <input
            type="password"
            placeholder="Your password"
            value={formState.password}
            onChange={(e) =>
              setFormState((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              })
            }
          ></input>
        </div>
        {currState === "Login" && <button onClick={handleLogin}>Login</button>}
        {currState === "Sign Up" && (
          <button onClick={handleSignup}>Create account</button>
        )}

        {currState === "Login" ? (
          <p>
            Create a new account?{""}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{""}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
