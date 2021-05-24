import React, { Component } from "react"
import { Link } from "react-router-dom"
import unicaLogo from "../../img/unicapharma-blue.png"
import firebase from "../../config/Config"
class Header extends Component {
    state = {
        dropdown: false,
    };

    dropdownHandler = () => {
        this.setState({ dropdown: !this.state.dropdown })
    };

    logoutHandler = () => {
        localStorage.removeItem("auth")
        firebase.auth().signOut()
        
    };

    render() {
        const show = this.state.dropdown ? " show" : ""
        return (
            <header
                className="navbar navbar-expand-lg navbar-light shadow-sm"
                style={{ backgroundColor: "#fff" }}
            >
                <Link to="/admin" className="navbar-brand mr-auto">
                    <img
                        src={unicaLogo}
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                    />
                </Link>
                <ul className="navbar-nav mr-5">
                    <li className="nav-item active">
                        <Link to="/solicitacoes" className="nav-link"></Link>
                    </li>
                    <li className={"nav-item dropdown" + show}>
                        <Link
                            className="nav-link dropdown-toggle"
                            onClick={this.dropdownHandler}
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {"admin"}
                        </Link>
                        <div
                            className={"dropdown-menu" + show}
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <Link className="dropdown-item" to="">
                                Alterar Perfil
                            </Link>
                            <Link
                                className="dropdown-item"
                                to=""
                                onClick={this.logoutHandler}
                            >
                                Sair
                            </Link>
                        </div>
                    </li>
                </ul>
            </header>
        )
    }
}

export default Header
