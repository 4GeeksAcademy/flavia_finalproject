import React, { useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Notification } from './notification';

export const Payment = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  const onSuccess = (details, data) => {
    const message = `Pago completado por ${details.payer.name.given_name}. Recibirá un correo confirmando.`;
    setSuccessMessage(message);
  }

  const onCancel = (data) => {
    alert("El pago fue cancelado");
    console.log(data)
  };

  const onError = (err) => {
    alert("Hubo un error al procesar el pago");
    console.log(err)
  };

  return (
    <div>
      {successMessage ? <Notification message={successMessage} /> : <div>
        <h1>Pago con PayPal</h1>
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
