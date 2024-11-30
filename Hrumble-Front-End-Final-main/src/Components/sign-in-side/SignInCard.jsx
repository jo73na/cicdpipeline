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
import { useNavigate, Link } from "react-router-dom";
import LoginContext from "../../Providers/Login";
import { useTheme } from "@mui/material/styles"; // Import the useTheme hook
import Visibility from '@mui/icons-material/Visibility'; // Import Visibility icon
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 

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
  const [otp, setOtp] = useState(""); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to check if OTP is sent
  const [showPassword, setShowPassword] = useState(false);
  const {
    login,
    sendOtp,
    validateOtp,
    isLoading,
    snackbar,
    setSnackbar,
    isLoadingOtp,
  } = useContext(LoginContext);
  const navigate = useNavigate();
  const theme = useTheme(); // Access the current theme

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpSent) {
      // Validate email and password before sending OTP
      const isValid = await login(form);
      if (isValid) {
        // Send OTP
        await sendOtp(form.email_id);
        setIsOtpSent(true); // Set OTP sent state to true
      }
    } else {
      // Handle OTP verification
      const isVerified = await validateOtp(form.email_id, otp); // Validate the OTP
      if (isVerified) {
        // Proceed with login after OTP validation
        const loginSuccess = await login(form); // Perform login
        if (loginSuccess) {
          navigate("/dashboard");
          window.location.reload(); // Navigate to the dashboard or another page
        }
      } else {
        // OTP validation failed, display an error message
        setSnackbar({ open: true, message: "Invalid OTP", severity: "error" });
      }
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          fontFamily: "Mulish, sans-serif", // Set font family to Mulish
          fontWeight: 500, // Set font weight to 500
          color: theme.palette.text.primary, // Change color based on theme
        }}
      >
        {isOtpSent ? "Verify OTP" : "Sign in"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!isOtpSent ? (
            <>
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
                    fontFamily: "Mulish, sans-serif", // Set font family to Mulish
                    fontSize: "14px", // Set font size to 14px
                    fontWeight: 500, // Set font weight to 500
                  }}
                />
              </FormControl>

              <FormControl>
              <TextField
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  fullWidth
                  variant="outlined"
                  required
                  sx={{
                    fontFamily: "Mulish, sans-serif", // Set font family to Mulish
                    fontSize: "14px", // Set font size to 14px
                    fontWeight: 500, // Set font weight to 500
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* Show appropriate icon */}
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
                      fontFamily: "Mulish, sans-serif", // Set font family to Mulish
                      fontSize: "14px", // Set font size to 14px
                      fontWeight: 500, // Set font weight to 500
                      color: theme.palette.text.primary, // Change color based on theme
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
                disabled={isLoadingOtp} // Disable button while loading
                sx={{
                  transition: "0.3s ease",
                  fontFamily: "Mulish, sans-serif", // Set font family to Mulish
                  fontSize: "14px", // Set font size to 14px
                  fontWeight: 500, // Set font weight to 500
                }}
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <FormControl>
                <TextField
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                  variant="outlined"
                  required
                  sx={{
                    fontFamily: "Mulish, sans-serif", // Set font family to Mulish
                    fontSize: "14px", // Set font size to 14px
                    fontWeight: 500, // Set font weight to 500
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading} // Disable button while loading
                sx={{
                  transition: "0.3s ease",
                  fontFamily: "Mulish, sans-serif", // Set font family to Mulish
                  fontSize: "14px", // Set font size to 14px
                  fontWeight: 500, // Set font weight to 500
                }}
              >
                Validate OTP
              </Button>
            </>
          )}
        </Box>
      </form>

       {/* Signup Link */}
       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Typography sx={{ fontFamily: "Mulish, sans-serif", fontSize: "14px", fontWeight: 500, color: theme.palette.text.primary }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            component="a"
            sx={{ fontWeight: 500, fontSize: "14px", color: theme.palette.primary.main }} // Link color based on theme
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() =>
            setSnackbar({ ...snackbar, open: false })
          }
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}