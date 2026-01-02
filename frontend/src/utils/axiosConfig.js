import axios from 'axios';
import store from '../store';
import { logoutSuccess } from '../slices/authSlice';

// Enable sending cookies with all requests
axios.defaults.withCredentials = true;

// Add response interceptor to handle 401 errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if the error is due to authentication failure
            const errorMessage = error.response.data.message;
            
            // Don't logout for login/register failures
            if (!error.config.url.includes('/login') && 
                !error.config.url.includes('/register') &&
                (errorMessage === 'Login first to handle this resource' || 
                 errorMessage === 'Invalid email or password' ||
                 error.config.url.includes('/myprofile'))) {
                // Dispatch logout action
                store.dispatch(logoutSuccess());
                
                // Redirect to login page if not already there
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
