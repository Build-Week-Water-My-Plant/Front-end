import React from 'react';
import styled from "styled-components";
import notFound from "../img/not-found.svg";


const PlantsList = props => {
    const { plants, deletePlant } = props;
    
    return (
        <ListContainer>
            {
                plants.length !== 0 ? (
                    <ul>
                        {   
                            plants.map(({ id, name, location, description, plantURL }) => {
                                return (
                                    <li key={id}>
                                        <p>Name: <span>{name}</span></p>
                                        <p>Location: <span>{location}</span></p>
                                        <p>Description: <span>{description}</span></p>
                                        <p><img src={plantURL}></img></p>
                                        <button className="deleteButton" onClick={()=>{deletePlant(id)}}> x </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : (
                    <div className="empty-state">
                        <img src={notFound} alt="No plants added yet" />
                        <p> You don't have any plants yet</p>
                    </div>
                )
            }
        </ListContainer>
    )
}

export default PlantsList;


const ListContainer = styled.div`
    max-width: 1140px;
    margin: 6rem auto 3rem;
    padding: 0 2rem;

    ul {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 2rem;

        @media (min-width: 450px) {
            grid-template-columns: repeat(2, 1fr);
        } 

        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        } 

        @media (min-width: 1140px) {
            grid-template-columns: repeat(4, 1fr);
        } 

        li {
            min-height: 100px;
            height: auto;
            border-radius: 5px;
            box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
            padding: 2rem;
            position: relative;

            p {
                font-size: 1.4rem;
                margin-bottom: .5rem
                font-weight: 600;

                &:last-of-type {
                    margin-bottom: 0;
                }
            }

            &:hover {
                button {
                    display: block;
                }
            }

            button {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 25px;
                height: 25px;
                min-width: auto;
                margin: 0;
                border-radius: 100%;
                padding: 0;
                min-height: auto;
                border: none;
                outline: none
                background: red;
                color: #fff
                display: none;
            }
        }
    }

    .empty-state {
        min-height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @media (max-width: 768px) {
            min-height: 300px;
        }

        img {
            max-width: 150px;
        }

        p {
            margin-top: .5rem;
            font-size: 1.2rem;
        }
    }
`