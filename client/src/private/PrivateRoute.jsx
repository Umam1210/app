import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
    const auth = localStorage.token ? true : false
    if (!auth) return <Navigate to="/" />

    return props.children


}

export default PrivateRoute