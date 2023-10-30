import React, { useState } from "react";
import "../../styles/freelanceCard.css"
import { Availability } from "./availability";

export const FreelanceCard = ({ index, URLphoto, full_name, professional_registration_number, years_of_experience, expertise, education, aboutme, availability }) => {
    const [wantAppointment, setWantAppointment] = useState(false)
    const handle_want_appointment = () => {
        setWantAppointment(!wantAppointment)
    }
    return (
        <>
            <section className='appointmentSection'>
                <div className='appointmentNamePhotoNumber'><div className='appointmentFreelancePhoto'><img src={URLphoto} /></div><h5>{full_name}</h5> <p>Nº colegiado: {professional_registration_number}</p><p>Años de experiencia: {years_of_experience}</p></div>
                <div className='appointmentFreelanceData'>
                    <div className='appointmentExpertise'><h6>Áreas de expertise:</h6><p>{expertise}</p></div>
                    <div className='appointmentEducation'><h6>Formación:</h6> <p>{education}</p></div>
                    <div className='appointmentAboutMe'><h6>Sobre mi:</h6><p>{aboutme}</p></div>
                </div>
                <div className='appointmentButton'>
                    <button onClick={handle_want_appointment}>Pedir cita</button>
                    {wantAppointment ? <Availability availability={availability} /> : ""}
                </div>
            </section>
        </>
    )
}