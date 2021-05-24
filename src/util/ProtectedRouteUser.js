import React, { useState, useEffect } from "react"
import { Route, Redirect, Router } from "react-router"
import firebase from "../config/Config"


const ProtectedRouteUser = ({ component: Component, ...res }) => {

    const user = JSON.parse(localStorage.getItem("auth"))
    if(!user) { return <Redirect to="/"/> }
    return <Route  {...res} render={(props) => {
       
        if(user.tipo == "usuario"){
            return <Component {...res} {...props} />
        } else {
            return <Redirect to="/"/>
        }
        
    }} />
}

export default ProtectedRouteUser
