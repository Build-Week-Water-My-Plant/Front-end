import React, { useState } from "react";
import { Form } from './Styles';


const AddPlantsForm = props => {
    const { showModal, toggleLoading, addPlant } = props;
    const userID = localStorage.getItem("userID")
    const initialPlant = [{
        "id": Date.now(),
        "name": '',
        "location": '',
        "description": "",
        "plantURL": "",
        "userId": userID
    }]
    const [ newPlant, setNewPlant] = useState(initialPlant);
    const {name, location, description, plantURL } = newPlant;


    // Handler Functions
    const handleInputChange = (e) => {
        setNewPlant({
            ...newPlant,
            [e.target.id]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        if( name && location && description && plantURL) {
            e.preventDefault();
            toggleLoading(true);
            addPlant({...newPlant, userId: userID, schedule: parseInt(newPlant.schedule)});
            setNewPlant(initialPlant);
            showModal(e);
        }
    }


    return (
        <Form autoComplete="off">
            <button onClick={showModal} className="close-btn">x</button>

            <div className="form-header">
                <h1>Add New Plant</h1>
            </div>

            <div className="form-inputs">
                <label htmlFor="plantname">Name</label>
                <input type='text' id="name" name='plantname' onChange={handleInputChange} value={name} placeholder='Plant Name' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="location">Location</label>
                <input type='text' id="location" name='location' onChange={handleInputChange} value={location} placeholder='Location' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="description">Description</label>
                <input type='text' id="description" name='description' onChange={handleInputChange} value={description} placeholder='Description' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="plantURL">Info: </label>
                <input type='text' id="plantURL" name='plantURL' onChange={handleInputChange} value={plantURL} placeholder='plantURL'/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                Add Plant
            </button>
        </Form>
    )
}

export default AddPlantsForm;