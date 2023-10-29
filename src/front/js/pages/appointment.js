import React, { useContext, useEffect } from 'react';
import "../../styles/appointment.css";
import { Context } from "../store/appContext";

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
                    <section key={index}>
                        <div><div><img src={item.URLphoto} /></div><h5>{item.full_name}</h5> <p>Nº colegiado: {item.professional_registration_number}</p><p>Años de experiencia: {item.years_of_experience}</p></div>
                        <div><h6>Áreas de expertise:</h6><p>{item.expertise}</p></div>
                        <div><h6>Formación:</h6> <p>{item.education}</p></div>
                    </section>
                ))
            }
        </>
    )
}