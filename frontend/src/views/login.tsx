import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return;
      }

      window.location.href = "/";

    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <div className="login-header">
          <Typography variant="h4">Login</Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item className="login-input">
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="MuiTextField-root"
              />
            </Grid>
            <Grid item className="login-input">
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="MuiTextField-root"
              />
            </Grid>
            {error && (
              <Grid item>
                <Typography className="error-message">{error}</Typography>
              </Grid>
            )}
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="login-button"
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <div className="signup-link">
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <button onClick={() => navigate("/signup")}>
                    Sign up here
                  </button>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
