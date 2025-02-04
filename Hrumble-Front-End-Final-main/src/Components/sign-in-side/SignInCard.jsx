import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card as MuiCard,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../Providers/Login";
import { useTheme } from "@mui/material/styles";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import CookieUtil from '../../Utils/Cookies'; // Adjust the import path as needed

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function SignInCard() {
  const [form, setForm] = useState({ email_id: "", password: "", remember: true });
  const [showPassword, setShowPassword] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const role = CookieUtil.get("role");

  const {
    login,
    isLoading,
    snackbar,
    setSnackbar,
  } = useContext(LoginContext);

  const navigate = useNavigate();
  const theme = useTheme();

  // Check session validity on component mount
  // useEffect(() => {
  //   const checkSessionStatus = () => {
  //     const sessionData = CookieUtil.get('session_data');
  //     if (sessionData) {
  //       try {
  //         const { sessionExpiresAt } = JSON.parse(sessionData);
  //         const now = new Date();
          
  //         if (new Date(sessionExpiresAt) > now) {
  //           setIsSessionValid(true);
  //           navigate("/dashboard");
  //           return true;
  //         }
  //       } catch (error) {
  //         console.error("Error parsing session data:", error);
  //       }
  //     }
  //     return false;
  //   };

  //   checkSessionStatus();
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If session is already valid, do nothing
    if (isSessionValid) {
      return;
    }

    // Validate email and password
    const isValid = await login(form);
    if (isValid) {
      if (role === "Vendor") {
        navigate("/jobs");
      } else {
        navigate("/dashboard");
      }
      window.location.reload();
    } else {
      setSnackbar({ open: true, message: "Login failed. Please check your credentials.", severity: "error" });
    }
  };

  // If session is valid, don't render the login form
  if (isSessionValid) {
    return null;
  }

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          fontFamily: "Mulish, sans-serif",
          fontWeight: 500,
          color: theme.palette.text.primary,
        }}
      >
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl>
            <TextField
              type="email"
              name="email_id"
              placeholder="your@email.com"
              value={form.email_id}
              onChange={(e) =>
                setForm({ ...form, email_id: e.target.value })
              }
              fullWidth
              variant="outlined"
              required
              sx={{
                fontFamily: "Mulish, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
              }}
            />
          </FormControl>

          <FormControl>
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              fullWidth
              variant="outlined"
              required
              sx={{
                fontFamily: "Mulish, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={form.remember}
                onChange={(e) =>
                  setForm({ ...form, remember: e.target.checked })
                }
                color="primary"
              />
            }
            label={
              <Typography
                sx={{
                  fontFamily: "Mulish, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                }}
              >
                Remember me
              </Typography>
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              transition: "0.3s ease",
              fontFamily: "Mulish, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Login
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}