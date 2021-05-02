import axios from 'axios';

const axiosWithAuth = () => {
    let token
    if (localStorage.getItem('token')){
        token = localStorage.getItem('token');
    } else {
        token = sessionStorage.getItem('token');
    }
        
    return axios.create({
        baseURL: process.env.REACT_APP_BE_CONNECTION,
        headers: {
            Authorization: token,
        }
    });
};

export default axiosWithAuth;