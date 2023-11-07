import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

export const Videocall = () => {
    return (
        <JitsiMeeting
            domain="meet.jit.si"
            roomName="TuNombreDeSala"
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
                displayName: 'TuNombreDeUsuario'
            }}
            onApiReady={(externalApi) => {
                // Aquí puedes adjuntar oyentes de eventos personalizados a la API Externa de Jitsi Meet
                // También puedes almacenarlo localmente para ejecutar comandos
            }}
            getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
        />
    );
};

