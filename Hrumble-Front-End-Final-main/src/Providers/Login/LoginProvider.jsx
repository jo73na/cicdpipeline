import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Context from './index';
import { Snackbar, Alert } from '@mui/material';
import CookieUtil from '../../Utils/Cookies';
import { debounce } from 'lodash';
import { Key } from '@mui/icons-material';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; 
const POLLING_INTERVAL = 10 * 60 * 1000; 
const IDLE_WARNING_TIME = INACTIVITY_TIMEOUT - 1 * 60 * 1000; 

const LoginProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    key:'null'
  });

  const inactivityTimer = useRef(null);
  const warningTimer = useRef(null);
  const sessionExpiryTimer = useRef(null);
  const sessionValidityIntervalRef = useRef(null);

  useEffect(() => {
    const sessionData = CookieUtil.get('session_data');
    if (sessionData) {
      const { sessionExpiresAt } = JSON.parse(sessionData);
      startSessionTimer(new Date(sessionExpiresAt));
    }
    startInactivityTimer();

    sessionValidityIntervalRef.current = setInterval(checkSessionValidity, POLLING_INTERVAL);

    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);

    return () => {
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('keydown', resetInactivityTimer);
      clearTimers();
      if (sessionValidityIntervalRef.current) clearInterval(sessionValidityIntervalRef.current);
    };
  }, []);

  const startSessionTimer = (sessionExpiresAt) => {
    clearTimeout(sessionExpiryTimer.current);
    const timeLeft = new Date(sessionExpiresAt) - new Date();
    sessionExpiryTimer.current = setTimeout(logout, timeLeft);
  };

  const startInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(handleInactivityLogout, INACTIVITY_TIMEOUT);
    startWarningTimer();
  };

  const startWarningTimer = () => {
    clearTimeout(warningTimer.current);
    warningTimer.current = setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'You will be logged out soon due to inactivity.',
        severity: 'warning',
      });
    }, IDLE_WARNING_TIME);
  };



  const clearTimers = () => {
    clearTimeout(sessionExpiryTimer.current);
    clearTimeout(inactivityTimer.current);
    clearTimeout(warningTimer.current);
  };


  const handleInactivityLogout = () => {
    CookieUtil.remove('session_token');
    // CookieUtil.remove('session_data');
    window.location.href = '/login';
  };


  const logout = () => {
    clearTimers();
    if (sessionValidityIntervalRef.current) {
      clearInterval(sessionValidityIntervalRef.current);
    }

    CookieUtil.remove('admin_token');
    CookieUtil.remove('is_admin');
    CookieUtil.remove('admin');
    CookieUtil.remove('admin_id');
    CookieUtil.remove('session_expires_at');
    CookieUtil.remove('role');
    CookieUtil.remove('session_token');
    CookieUtil.remove('session_data');
    CookieUtil.remove('company');
    localStorage.clear();
    window.location.href = '/login';
    setSnackbar({
      open: true,
      message: 'Logged out successfully.',
      severity: 'info',
    });
  };

  const login = async (values) => {
    setIsLoading(true);
    const api = `${BASE_URL}/login`;

    try {
      const res = await axios.post(api, values);
  
      const userStatus = res?.data?.data?.admin_data?.userstatus;
  
      if (userStatus === 'blocked' || userStatus === 'disabled') {
        setSnackbar({
          open: true,
          message: userStatus === 'blocked' 
            ? 'Account is blocked. Please contact the administrator.' 
            : 'Account is disabled. Please contact the administrator.',
          severity: 'error',
        });
        setIsLoading(false);
        return false;
      }
  
      // Store tokens and session info
      const sessionData = res.data.data.session_data;
      CookieUtil.set('session_token', res?.data?.token, { path: '/' });
      CookieUtil.set('session_data', JSON.stringify(sessionData), { path: '/' });
      CookieUtil.set('admin', JSON.stringify(res?.data?.data?.admin_data), { path: '/' });
      CookieUtil.set("admin_token", res?.data?.token);
      CookieUtil.set("is_admin", res?.data?.success);
      CookieUtil.set("role", res?.data?.data?.admin_data?.role);
      CookieUtil.set("admin_id", res?.data?.data?.admin_data?._id);
      CookieUtil.set("admin", JSON.stringify(res?.data?.data?.admin_data));
      if (res?.data?.company) {
        CookieUtil.set("company", JSON.stringify(res?.data?.company));
      }
  
      setSnackbar({
        open: true,
        message: 'Login successful',
        severity: 'success',
      });

      startSessionTimer(new Date(sessionData.sessionExpiresAt));
      startInactivityTimer();

      return true;
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Login failed',
        severity: 'error',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetInactivityTimer = debounce(() => {
    const sessionData = CookieUtil.get('session_data');
    if (sessionData) {
      const parsedSessionData = JSON.parse(sessionData);
      // Update lastActivityAt timestamp
      parsedSessionData.lastActivityAt = new Date().toISOString();
      CookieUtil.set('session_data', JSON.stringify(parsedSessionData), { path: '/' });
    }
    startInactivityTimer();
  }, 300);
  
  const checkSessionValidity = () => {
    const sessionData = CookieUtil.get('session_data');
    if (!sessionData) {
      handleInactivityLogout();
      return;
    }
  
    const { sessionExpiresAt, lastActivityAt } = JSON.parse(sessionData);
    const now = new Date();
  
    if (new Date(sessionExpiresAt) < now) {
      logout();
    } else if (now - new Date(lastActivityAt) > INACTIVITY_TIMEOUT) {
      handleInactivityLogout();
    }
  };

  const sendOtp = async (email_id) => {
    setIsLoadingOtp(true);
    try {
      const otpStatusResponse = await axios.get(`${BASE_URL}/otp/status`, { params: { email_id } });
      if (otpStatusResponse.data.valid) {
        // Only set snackbar if the first request is successful
        setSnackbar({
          open: true,
          message: 'OTP is still valid, please validate it.',
          severity: 'info',
        });
        return;
      }
  
      // If OTP is not valid, proceed to send new OTP
      const response = await axios.post(`${BASE_URL}/otp/send-otp`, { email_id });
      setSnackbar({
        open: true,
        message: response.data.message || 'OTP sent successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to send OTP',
        severity: 'error',
      });
    } finally {
      setIsLoadingOtp(false);
    }
  };

  const validateOtp = async (email_id, otp) => {
    // Check if session is still valid and not expired
    const sessionData = CookieUtil.get('session_data');
    if (sessionData) {
      const { sessionExpiresAt } = JSON.parse(sessionData);
      const now = new Date();
      
      // If session is still valid, skip OTP validation
      if (new Date(sessionExpiresAt) > now) {
        // setSnackbar({
        //   open: true,
        //   message: 'Session is still active. OTP validation skipped.',
        //   severity: 'info',
        // });
        return true;
      }
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/otp/validate-otp`, { email_id, otp });
      if (response.data.success) {
        setSnackbar({
          open: true,
          message: 'OTP validated successfully',
          severity: 'success',
        });
        return true;
      } else {
        setSnackbar({
          open: true,
          message: 'Invalid OTP',
          severity: 'error',
        });
        return false;
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to validate OTP',
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
        logout,
        checkSessionValidity,
        validateOtp,
        isLoading,
        isLoadingOtp,
        snackbar,
        setSnackbar,
      }}
    >
      {props.children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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