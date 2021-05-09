import React, { useState, useEffect, useCallback } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

import dashboard from './dashboard.module.scss';

import DeleteButton from '../deleteButton/deleteButton';

const Dashboard = () => {

    const userId = localStorage.getItem('userId');

    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState(new Set());

    const toggleSelected = (imageId)=> {
        let newSet = new Set(selectedImages);
        if (selectedImages.has(imageId)){
            newSet.delete(imageId);
            setSelectedImages(newSet);
        } else {
            newSet.add(imageId);
            setSelectedImages(newSet);
        }
    }

    const fetchImages = useCallback(() => {
        axiosWithAuth()
            .get(`/images/${userId}/get-images`)
            .then(res => {
                setImages(res.data.images);
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId])

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
        fetchImages();
    }, [fetchImages]);

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
            <DeleteButton 
                imageIds={selectedImages}
                userId={userId}
                images={images}
                setImages={setImages}
            />
            <div className={dashboard.imagesContainer}>
                {images.map(image => {
                    return (
                        <div 
                            className={selectedImages.has(image.id) ? `${dashboard.imageBox} ${dashboard.selectedBackground}` : dashboard.imageBox} 
                            key={image.id}
                            onClick={() => toggleSelected(image.id)}    
                        >
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