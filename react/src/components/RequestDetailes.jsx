import React from 'react';
import {useParams } from "react-router-dom"
const RequestDetailes=()=>{
    const {id}=useParams()
    return(
        <>
        <h1>{id}</h1>
        </>
    )
}
export default RequestDetailes