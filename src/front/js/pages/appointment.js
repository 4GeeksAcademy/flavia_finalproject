import React, { useContext, useEffect, useState } from 'react';
import "../../styles/appointment.css";
import { Context } from "../store/appContext";
import { FreelanceCard } from '../component/freelanceCard';

export const Appointment = () => {
    const { store, actions } = useContext(Context)

    // Función para obtener datos de freelancers activos
    const fetchData = async () => {
        const data = await actions.allFreelancesActives();
    };

    useEffect(() => {
        // Llama a la función fetchData al cargar el componente
        fetchData();
    }, []);

    return (
        <>
            {   // Mapea los freelancers y crea un componente FreelanceCard para cada uno
                store.freelances.map((item, index) => (
                    <>
                        <FreelanceCard freelanceId={item.id} URLphoto={item.URLphoto} full_name={item.full_name} professional_registration_number={item.professional_registration_number} years_of_experience={item.years_of_experience} expertise={item.expertise} education={item.education} aboutme={item.aboutme} availability={item.availability} />
                    </>
                ))
            }
        </>
    )
}