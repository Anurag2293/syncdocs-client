import React, { useEffect } from 'react'
import { v4 as uuidV4 } from "uuid"
import { Navigate } from "react-router-dom";

const Home = () => {

    return (
        <Navigate to={`/documents/${uuidV4()}`} replace={true} />
    )
}

export default Home