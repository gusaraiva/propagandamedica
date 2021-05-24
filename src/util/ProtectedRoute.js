import React, { useState, useEffect } from "react"
import { Route, Redirect, Router } from "react-router"
import firebase from "../config/Config"


const ProtectedRoute = ({ component: Component, ...res }) => {
    const admin = JSON.parse(localStorage.getItem("auth"))
    if(!admin) { return <Redirect to="/admin/acesso"/> }
    return <Route  {...res} render={(props) => {

        if(admin.tipo =="admin"){
            return <Component {...res} {...props} />
        } else {
            return <Redirect to="/admin/acesso"/>
        }
        
    }} />
}

export default ProtectedRoute
