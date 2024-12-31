import { useEffect, useState } from 'react';
import axios from 'axios';
import Context from './index';
import { Snackbar, Alert } from '@mui/material';
import CookieUtil from '../../Utils/Cookies';
import { notification } from 'antd';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// axios.defaults.headers.common['Authorization'] = `Bearer ${CookieUtil.get('token')}`;

const TaskProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [adminUsers, setAdminUser] = useState([]);

    const token = CookieUtil.get('admin_token');
console.log("Token:::", token)
    // Fetch tasks with optional filters
    const fetchTasks = async (filters = {}) => {
        const api = `${BASE_URL}/task`;
        const params = { ...filters };
    
        try {
            setLoading(true);
            const response = await axios.get(api, { params });
            const taskData = response.data.data.data;
    
            // Log the original task data
            console.log("Original Task Data:", taskData);
    
            // Deduplicate tasks based on _id
            const uniqueTasks = Array.from(new Set(taskData.map(task => task._id)))
                .map(id => taskData.find(task => task._id === id));
    
            // Log the unique tasks
           
    
            // Set the unique tasks to state
            setTasks(uniqueTasks);
            console.log("Unique Tasks:", uniqueTasks);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError(err.message || 'Failed to fetch tasks');
            setLoading(false);
        }
    };

    const fetchUsers = async (filters = {}) => {
        const api = `${BASE_URL}/task/adminusers`;  // Make sure this is the correct API endpoint
        
        try {
            setLoading(true);  // Set loading to true to show loading indicator
    
            // If filters are needed, you could append them to the API URL
            // For example: `${api}?filterKey=value` or use the `filters` object in axios' params
            const response = await axios.get(api, {
                params: filters  // If you want to filter data by sending query parameters
            });
    
            // Ensure you're accessing the correct data structure from the response
            const adminusers = response.data.data;  // Assuming response.data contains { data: { data: [...] } }
            
            console.log("Original admin data:", adminusers);  // Log the admin users data
            
            setAdminUser(adminusers);  // Set the admin users state to the fetched data
            
            setLoading(false);  // Stop loading
        } catch (err) {
            console.error('Error fetching admin users:', err);
            setError(err.message || 'Failed to fetch admin users');  // Provide error message
            setLoading(false);  // Stop loading even if there is an error
        }
    };
    
      

    const addTask = async (newTaskData) => {
        const api = `${BASE_URL}/task`;
        try {
            setLoading(true);
            setError(null);
    
            const response = await axios.post(api, newTaskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Refresh tasks after adding
            fetchTasks();
            return response.data;
        } catch (err) {
            console.error('Error adding task:', err);
            setError(err.message || 'Failed to add task');
            // Handle token expiration scenario
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId, taskData) => {
        const api = `${BASE_URL}/task/${taskId}`;
        try {
            setLoading(true);
            setError(null);

            const response = await axios.put(api, taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Refresh tasks after updating
            fetchTasks();
            return response.data;
        } catch (err) {
            console.error('Error updating task:', err);
            setError(err.message || 'Failed to update task');
            if (err.response && err.response.status === 500) {
                setSnackbarMessage('Token expired, please log in again.');
                setSnackbarOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const patchTask = async (taskId, patchData) => {
        const api = `${BASE_URL}/task/${taskId}`;
    
        try {
            setLoading(true);
            setError(null);
    
            const response = await axios.patch(api, patchData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            // Optionally refresh tasks after a successful patch
            fetchTasks();
            return response.data;
        } catch (err) {
            console.error('Error patching task:', err);
            setError(err.response?.data?.message || 'Failed to update task partially');
    
            // Handle token expiration scenario
            if (err.response && err.response.status === 500) {
                setSnackbarMessage('Token expired, please log in again.');
                setSnackbarOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };
    
    
    
    

    const deleteTask = async (taskId) => {
        const api = `${BASE_URL}/task/${taskId}`;
        try {
            setLoading(true);
            setError(null);

            await axios.delete(api, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Refresh tasks after deleting
            fetchTasks();
        } catch (err) {
            console.error('Error deleting task:', err);
            setError(err.message || 'Failed to delete task');
            if (err.response && err.response.status === 500) {
                setSnackbarMessage('Token expired, please log in again.');
                setSnackbarOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Context.Provider
            value={{
                loading,
                tasks,
                totalTasks,
                error,
                fetchTasks,
                addTask,
                updateTask,
                deleteTask,
                patchTask,
                fetchUsers,
                adminUsers
            }}
        >
            {props.children}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity="error" onClose={handleCloseSnackbar}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Context.Provider>
    );
};

export default TaskProvider;
