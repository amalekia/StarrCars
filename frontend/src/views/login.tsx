import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return;
      }

      navigate("/home");

    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          {error && (
            <Grid item>
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Button color="primary" onClick={() => navigate("/signup")}>
                Sign up here
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
