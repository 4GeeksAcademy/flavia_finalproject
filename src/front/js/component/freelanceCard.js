import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import "../../styles/freelanceCard.css"
import { Availability } from "./availability";

export const FreelanceCard = ({ freelanceId, URLphoto, full_name, professional_registration_number, years_of_experience, expertise, education, aboutme, availability }) => {
    const { store, actions } = useContext(Context);

    // Estado local para controlar si el usuario quiere una cita
    const [wantAppointment, setWantAppointment] = useState(false)

    // Función para manejar el botón de "Pedir cita"
    const handle_want_appointment = () => {
        setWantAppointment(!wantAppointment)
        actions.availability(availability)
    }

    return (
        <>
            <section className='freelanceCardSection'>
                <div className='freelanceCardNamePhotoNumber'><div className='freelanceCardPhoto'><img src={URLphoto} /></div><h5>{full_name}</h5> <p>Nº colegiado: {professional_registration_number}</p></div>
                <div className='freelanceCardData'>
                    <div className='freelanceCardExpertise'><h6>Formación:</h6> <p>{education}</p></div>
                    <div className='freelanceCardEducation'><h6>Áreas de expertise:</h6><p>{expertise}</p></div>
                    <div className='freelanceCardAboutMe'><h6>Sobre mi:</h6><p>{aboutme}</p></div>
                </div>
                <div className='appointmentButton'>
                    <button className='appbtn' onClick={handle_want_appointment}>Pedir cita</button>
                    {wantAppointment && <Availability freelanceId={freelanceId} />}
                </div>
            </section>
        </>
    )
}