import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import SignupContext from "../../Providers/SignUpProvider";
import getSignUpTheme from "./theme/getSignUpTheme";
import TemplateFrame from "./TemplateFrame";
import { Input } from "antd";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: { width: "450px" },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const customTheme = createTheme({
  typography: {
    fontFamily: "'Mulish', sans-serif",
    fontSize: 14,
    fontWeightRegular: 500,
    h1: {
      fontSize: 14, // Apply to all h1 tags if needed
      fontWeight: 500,
    },
    body1: {
      fontSize: 14, // Apply to body1 text
      fontWeight: 500,
    },
    button: {
      fontSize: 14, // Apply to buttons
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 14, // Apply to subtitle1 text
      fontWeight: 500,
    },
  },
});

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignUp() {
  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [form, setForm] = useState({
    email_id: "",
    name: "",
    phone: "",
    company_name: "",
    team_size: "",
    domain: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const { sendOtp, validateOtp } = useContext(SignupContext);
  const navigate = useNavigate();

  const teamSizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10001+"];

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showMessage = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSendOtp = async () => {
    if (event) {
      event.preventDefault();
    }

    if (!form.email_id || !form.name || !form.phone || !form.company_name || !form.team_size || !form.domain) {
      showMessage("Please enter both email and name", "error");
      return;
    }

    try {
      const result = await sendOtp(form.email_id, form.name, form.phone, form.company_name, form.team_size, form.domain);
      console.log("OTP send result:", result); 
      if (result.success) {
        showMessage("OTP sent successfully! Please check your email.", "success");
        setIsOtpSent(true);
      } else {
        showMessage(result.message || "Failed to send OTP", "error");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      showMessage("Failed to send OTP", "error");
    }
  };

  const handleValidateOtp = async (event) => {
    event.preventDefault();
    
    if (!otp) {
      showMessage("Please enter the OTP", "error");
      return;
    }

    try {
      const result = await validateOtp(form.email_id, otp, form.name, form.phone, form.company_name, form.team_size, form.domain);
      if (result.success) {
        showMessage("Signup successful!", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showMessage(result.message || "Invalid OTP", "error");
      }
    } catch (error) {
      showMessage("Failed to validate OTP", "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isOtpSent) {
      await handleValidateOtp(event);
    } else {
      await handleSendOtp(event);
    }
        if (!form.domain || !domainRegex.test(form.domain)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid domain!',
        severity: 'error',
      });
      return;
    }

    // Show success notification
    notification.success({ message: 'Domain is valid!' });

  };

  const domainRegex = /^([a-zA-Z0-9]+[-])*[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    // Validate domain in real-time
    if (name === "domain") {
      if (value && !domainRegex.test(value)) {
        setSnackbar({
          open: true,
          message: "Invalid domain format (e.g., example.com)",
          severity: "error",
        });
      } else {
        setSnackbar((prev) => ({ ...prev, open: false }));
      }
    
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <img
              src="/images/Hricon.svg"
              alt="Hricon"
              style={{ width: 40, height: 40 }}
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                width: "100%",
                fontFamily: "Mulish",
                fontSize: '18px',
                fontWeight: 500
              }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2,}}
            >
              <FormControl>
                <FormLabel htmlFor="name" sx={{
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>Full name</FormLabel>
                <TextField
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  placeholder="Enter your full name"
                  disabled={isOtpSent}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email" sx={{
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email_id"
                  name="email_id"
                  value={form.email_id}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  disabled={isOtpSent}
                  type="email"
                />
              </FormControl>
               {/* Phone Number with Country Code */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel sx={{
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>Mobile No.</FormLabel>
              <TextField
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="1234567890"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
              />
            </FormControl>

            {/* Company Name */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel sx={{
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>Company Name</FormLabel>
              <TextField
                name="company_name"
                value={form.company_name}
                onChange={handleInputChange}
                placeholder="Enter your company name"
                required
              />
            </FormControl>

            {/* Team Size Dropdown */}
           {/* Team Size Dropdown */}
<Box sx={{ mb: 2 }}>
  <Typography variant="body1" sx={{ mb: 0.5,
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>
    Team Size
  </Typography>
  <FormControl fullWidth>
    <Select
      name="team_size"
      value={form.team_size}
      onChange={handleInputChange}
      required
    >
      {teamSizes.map((size) => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

            {/* Domain Field with https:// prefix and .hrumbles.ai suffix */}
            <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel sx={{
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>Domain</FormLabel>
      <Input
        addonBefore="https://"
        addonAfter=".hrumbles.ai"
        placeholder="Enter your domain"
        value={form.domain}
        name="domain"
        onChange={handleInputChange}
        style={{
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        required
      />
            </FormControl>

              {isOtpSent && (
                <FormControl>
                  <FormLabel htmlFor="otp" sx={{
                fontFamily: "Mulish",
                fontSize: '14px',
                fontWeight: 500
              }}>Enter OTP</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter OTP sent to your email"
                  />
                </FormControl>
              )}
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  fontFamily: "Mulish",
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {isOtpSent ? "Verify OTP" : "Send OTP"}
              </Button>
  
              {isOtpSent && (
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  fullWidth
                  variant="outlined"
                >
                  Resend OTP
                </Button>
              )}

              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span>
                  <Link
                    to="/login"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
