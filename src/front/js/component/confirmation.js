import React, { useEffect } from 'react';
import "../../styles/confirmation.css";
import { useNavigate } from "react-router-dom";
import { Payment } from './payment';

export const Confirmation = ({ selectedDay, selectedHour }) => {
    console.log('selectedDay', selectedDay, 'selectedHour', selectedHour)
    const navigate = useNavigate();
    const handle_toPaymentNavigation = () => {
        navigate("/payment");
    }
    useEffect(() => {
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();

        return () => {
            modal.hide();
        };
    }, []);
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirma tu cita</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Día: {selectedDay}
                        Hora: {selectedHour}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handle_toPaymentNavigation()}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}