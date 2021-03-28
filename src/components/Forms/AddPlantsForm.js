import React, { useState } from "react";
import { Form } from './Styles';


const AddPlantsForm = props => {
    const { showModal, toggleLoading, addPlant, currentUserID } = props;

    const initialPlant = {
        "species": '',
        "name": '',
        "location": '',
        "schedule": 0,
        "user": {
            "userid": parseInt(currentUserID)
        }
    }
    const [ newPlant, setNewPlant] = useState(initialPlant);
    const { species, name, location, schedule } = newPlant;


    // Handler Functions
    const handleInputChange = (e) => {
        setNewPlant({
            ...newPlant,
            [e.target.id]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        if(species && name && location && schedule) {
            e.preventDefault();
            toggleLoading(true);
            addPlant({...newPlant, schedule: parseInt(newPlant.schedule)});
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
                <label htmlFor="species">Species</label>
                <input type='text' id="species" name='species' onChange={handleInputChange} value={species} placeholder='Species' required/>
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
                <label htmlFor="schedule">Water how many days a week?</label>
                <input type='number' id="schedule" name='schedule' onChange={handleInputChange} value={schedule} placeholder='Schedule' required/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                Add Plant
            </button>
        </Form>
    )
}

export default AddPlantsForm;
