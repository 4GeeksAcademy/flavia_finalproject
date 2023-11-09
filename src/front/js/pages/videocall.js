import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from 'react-router-dom';

export const Videocall = () => {
    const { store } = useContext(Context);
    const [api, setApi] = useState(null);
    const { jitsiRoomId } = useParams();

    useEffect(() => {
        if (store.user_type === "Freelancer") {
            // Aquí se supone que el Freelancer ya se unió a la videollamada y la API de Jitsi está lista
            // Se activa la sala de espera para que los Users tengan que esperar a ser admitidos
            api.executeCommand('toggleLobby', true);
        }
    }, [api, store.user_type]);

    const displayName = store.user_type === "Freelancer"
        ? store.individual_appointments.find(appointment => appointment.jitsi_room_id === jitsiRoomId)?.freelance_data.full_name
        : store.individual_appointments.find(appointment => appointment.jitsi_room_id === jitsiRoomId)?.user_data.full_name;
    return (
        <JitsiMeeting
            domain="meet.jit.si"
            roomName={jitsiRoomId}
            configOverwrite={{
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                startScreenSharing: true,
                enableEmailInStats: false
            }}
            interfaceConfigOverwrite={{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo={{
                displayName: displayName || 'Participante'
            }}
            onApiReady={(externalApi) => {
                setApi(externalApi);
                // Aquí puedes adjuntar oyentes de eventos personalizados a la API Externa de Jitsi Meet
                // También puedes almacenarlo localmente para ejecutar comandos

            }}
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
        />
    );
};

