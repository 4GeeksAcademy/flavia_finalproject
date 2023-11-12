import React, { useContext } from 'react';
import { Context } from "../store/appContext";

export const FoodInfo = () => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <h5>hello from foodInfo</h5>
        </>
    )
}