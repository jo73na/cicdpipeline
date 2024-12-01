import React, { useState } from 'react';
import axios from 'axios';
import Context from './index';
import { Snackbar, Alert } from '@mui/material';
import CookieUtil from '../../Utils/Cookies/';
// import { BASE_URL } from '../../Utils/api';

const BASE_URL = import.meta.env.VITE_BASE_URL; 


const LoginProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const login = async (values) => {
    setIsLoading(true);
    let api = `${BASE_URL}/login`;
  
    try {
      const res = await axios.post(api, values);
  
      // Check the user status from the response
      const userStatus = res?.data?.data?.admin_data?.status;
  
      if (userStatus === 'blocked') {
        setSnackbar({
          open: true,
          message: 'Account is blocked. Please contact the administrator.',
          severity: 'error',
        });
        setIsLoading(false);
        return false; // Return false for blocked user
      } else if (userStatus === 'disabled') {
        setSnackbar({
          open: true,
          message: 'Invalid Username or Password!',
          severity: 'error',
        });
        setIsLoading(false);
        return false; // Return false for disabled user
      }
  
      // Set cookies with login response
      CookieUtil.set('admin_token', res?.data?.token);
      CookieUtil.set('is_admin', res?.data?.success);
      CookieUtil.set('role', res?.data?.data?.admin_data?.role);
      CookieUtil.set('admin_id', res?.data?.data?.admin_data?._id);
      CookieUtil.set('admin', JSON.stringify(res?.data?.data?.admin_data));
      CookieUtil.set('company', JSON.stringify(res?.data?.company));
  
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'Login successfully',
        severity: 'success',
      });
  
      return true; // Return true if login is successful
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Login failed'; // Ensure correct message from backend
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
      setIsLoading(false);
      return false; // Return false if login fails
    }
  };
  
  

  const sendOtp = async (email_id) => {
    setIsLoadingOtp(true);
  
    // Check if OTP is already valid before sending a new one
    try {
      const otpStatusResponse = await axios.get(`${BASE_URL}/otp/status`, { params: { email_id } });
  
      if (otpStatusResponse.data.valid) {
        setSnackbar({
          open: true,
          message: 'OTP is still valid, please validate it.',
          severity: 'info',
        });
        setIsLoadingOtp(false);
        return;
      }
    } catch (error) {
      console.error('Error checking OTP status:', error);
      // Proceed with sending OTP if status check fails (perhaps due to the OTP not being set at all)
    }
  
    // If OTP is not valid or not yet sent, send new OTP
    try {
      const response = await axios.post(`${BASE_URL}/otp/send-otp`, { email_id });
      setSnackbar({
        open: true,
        message: response.data.message || 'OTP sent successfully',
        severity: 'success',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to send OTP';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setIsLoadingOtp(false);
    }
  };
  
  const validateOtp = async (email_id, otp) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/otp/validate-otp`, {
        email_id,
        otp,
      });
      if (response.data.success) {
        setSnackbar({
          open: true,
          message: 'OTP validated successfully',
          severity: 'success',
        });
        return true; // Return true if OTP is valid
      } else {
        setSnackbar({
          open: true,
          message: 'Invalid OTP',
          severity: 'error',
        });
        return false; // Return false if OTP is invalid
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to validate OTP';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Context.Provider
      value={{
        login,
        sendOtp,
        validateOtp,
        isLoading,
        isLoadingOtp,
        snackbar,
        setSnackbar,
      }}
    >
      {props.children}

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Context.Provider>
  );
};

export default LoginProvider;

/////////