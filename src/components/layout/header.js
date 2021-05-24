import React, { Component } from "react"
import { Link } from "react-router-dom"
import firebase from "../../config/Config"
import { Button } from "antd"
import { WhatsAppOutlined } from "@ant-design/icons"

class Header extends Component {
    state = {
        dropdown: false,
        user:{}
    };
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem("auth"))
        this.setState({ user: user })
    }

    dropdownHandler = () => {
        this.setState({ dropdown: !this.state.dropdown })
    };

    logoutHandler = () => {
        firebase.auth().signOut()
    };

    render() {
        const show = this.state.dropdown ? " show" : ""
        return (
            <header
                className="navbar navbar-expand-lg navbar-dark"
                style={{ backgroundColor: "#2E5F99" }}
            >
                <Link to="/" className="navbar-brand mr-auto">
                    <img
                        src="http://unicahealth.com.br/prop-medica/media/image/logo-unica.png"
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                    />
                </Link>
                <ul className="navbar-nav mr-5">
                    <li className="nav-item active">
                        <Link to="/solicitacoes" className="nav-link">
                            Solicitações
                        </Link>
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
                            {this.state.user.name}
                        </Link>
                        <div
                            className={"dropdown-menu" + show}
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <Link className="dropdown-item" to="/perfil">
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
                <div>
                    {/* <a href="https://wa.me/55(aqui seu numero com ddd | tudo junto)?text=Adorei%20seu%20artigo" style="position:fixed;width:60px;height:60px;bottom:40px;right:40px;background-color:#25d366;color:#FFF;border-radius:50px;text-align:center;font-size:30px;box-shadow: 1px 1px 2px #888;
  z-index:1000;" target="_blank">
                        <i style="margin-top:16px" class="fa fa-whatsapp"></i>
                    </a> */}
                    <a href="https://wa.me/5519981495981" target="_blank">
                        <Button type="primary" size={"large"} icon={ <WhatsAppOutlined />} style={{ position: "fixed", bottom: "20px", right: "20px" }}>
                            Fale agora com o Representante
                        </Button>
                    </a>
                </div>
                
            </header>
        )
    }
}

export default Header
