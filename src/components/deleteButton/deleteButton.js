import React from "react"
import axiosWithAuth from '../../utils/axiosWithAuth';

const DeleteButton = ({ imageIds, userId, setImages, images }) => {
    
    const deleteImages = () => {
        let arrayImageIds = Array.from(imageIds);
        axiosWithAuth()
            .post(`/images/${userId}/delete-images`, { imageIds: arrayImageIds })
            .then(() => {
                setImages(images.filter(item => !imageIds.has(item.id)));
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
            <button onClick={deleteImages}>Delete Selected Images</button>
        </div>
    )
};

export default DeleteButton;