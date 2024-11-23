import React, { useState } from 'react'; // Import useState hook
import axios from 'axios';
// import { BASE_URL } from '../../Utils/api';
import SignupContext from './index';
import { Snackbar, Alert } from '@mui/material';

const BASE_URL = import.meta.env.VITE_BASE_URL; 

const SignUpProvider = ({ children }) => {
  // Define Snackbar state here at the top level of the component
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const sendOtp = async (email, name, phone, company_name, team_size, domain) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup/send-otp`, {
        email_id: email,
        name: name,
        phone: phone,
        company_name: company_name,
        team_size: team_size,
        domain: domain
      });
      
      return { 
        success: response.status === 200,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send OTP' 
      };
    }
  };

  const validateOtp = async (email, otp, name, phone, company_name, team_size, domain) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup/validate-otp`, {
        email_id: email,
        otp: otp,
        name: name,
        phone: phone,
        company_name: company_name,
        team_size: team_size,
        domain: domain
      });

      if (response.status === 200) {
        // If OTP is validated successfully, show the success message in Snackbar
        setSnackbarMessage('Your Signup details have been submitted, and the admin team will contact you.');
        setOpenSnackbar(true);  // Open the Snackbar
      }

      return { 
        success: response.status === 200,
        message: response.data.message 
      };
    } catch (error) {
      console.error('Error validating OTP:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to validate OTP' 
      };
    }
  };

  return (
    <SignupContext.Provider value={{ sendOtp, validateOtp }}>
      {children}

      {/* Snackbar for displaying success message */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000}  // Snackbar will automatically hide after 6 seconds
        onClose={() => setOpenSnackbar(false)}  // Close Snackbar when onClose is triggered
        anchorOrigin={{
            vertical: 'top',  // Change this to 'top' to move the Snackbar to the top
            horizontal: 'center',  // Change this to 'center' to center it horizontally
          }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SignupContext.Provider>
  );
};

export default SignUpProvider;
