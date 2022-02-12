import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to create an account");
      setLoading(false);
    }
  }

  return (
    <div className="signup">
      <h2>Signup</h2>
      {error && console.log(error)}
      {console.log(currentUser)}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required></input>
        <label>Password</label>
        <input type="password" ref={passwordRef} required></input>
        <label>Password Confimation</label>
        <input type="password" ref={passwordConfirmationRef} required></input>
        <button disabled={loading} type="submit">
          Signup
        </button>
      </form>
      <p>
        Already have an account?<Link to="/signin"> Signin</Link>
      </p>
    </div>
  );
}
