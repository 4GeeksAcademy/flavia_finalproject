import React, { useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Notification } from '../component/notification';
import "../../styles/payment.css"

export const Payment = () => {
  // Estado para almacenar el mensaje de éxito después de realizar el pago
  const [successMessage, setSuccessMessage] = useState(null);

  // Función que se ejecuta cuando el pago es exitoso
  const onSuccess = (details, data) => {
    const message = `Pago completado por ${details.payer.name.given_name}. Recibirá un correo confirmando.`;
    setSuccessMessage(message);
  }

  // Función que se ejecuta cuando el usuario cancela el pago
  const onCancel = (data) => {
    alert("El pago fue cancelado");
    console.log(data)
  };

  // Función que se ejecuta cuando hay un error al procesar el pago
  const onError = (err) => {
    alert("Hubo un error al procesar el pago");
    console.log(err)
  };

  return (
    <div className='payment-container'>
      {successMessage ? <Notification message={successMessage} /> : <div>
        <h1 className='payment-title'>Pago con PayPal</h1>
        <PayPalButton
          amount="5.00"
          onSuccess={onSuccess}
          onCancel={onCancel}
          onError={onError}
        />
      </div>}
    </div>
  );
}
