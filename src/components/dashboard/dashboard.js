import React, { useState, useEffect, useRef } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

import dashboard from './dashboard.module.scss';

const Dashboard = () => {

    const userId = localStorage.getItem('userId');

    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const hasFetched = useRef(false);

    const fetchImages = () => {
        axiosWithAuth()
            .get(`/images/${userId}/get-images`)
            .then(res => {
                setImages(res.data.images);
                
            })
            .catch(err => {
                console.log(err);
            });
    };

    const sendImage = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imageFile", file);
        axiosWithAuth()
            .post(`/images/${userId}/add-images`, formData)
            .then(res => {
                fetchImages();
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        if (!hasFetched.current){
            fetchImages();
            hasFetched.current = true;
        }   
    }, [images, userId]);

    return (
        <div>
            <h3>My images</h3>
            <form
                onSubmit={sendImage}
            >
                <input
                    type='file' multiple
                    onChange={e => setFile(e.target.files[0])}
                />
                <button>Upload image!</button>
            </form>
            <div className={dashboard.imagesContainer}>
                {images.map(image => {
                    return (
                        <div className={dashboard.imageBox}>
                            <p>{image.name}</p>
                            <img src={`data:image/png;base64,${image.base64}`} alt={image.name}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;