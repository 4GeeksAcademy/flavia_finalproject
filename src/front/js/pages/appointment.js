import React, { useContext, useEffect, useState } from 'react';
import "../../styles/appointment.css";
import { Context } from "../store/appContext";
import { FreelanceCard } from '../component/freelanceCard';

export const Appointment = () => {
    const { store, actions } = useContext(Context)

    const fetchData = async () => {
        const data = await actions.allFreelancesActives();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {
                store.freelances.map((item, index) => (
                    <>
                        <FreelanceCard URLphoto={item.URLphoto} full_name={item.full_name} professional_registration_number={item.professional_registration_number} years_of_experience={item.years_of_experience} expertise={item.expertise} education={item.education} aboutme={item.aboutme} availability={item.availability} />
                    </>
                ))
            }
        </>
    )
}