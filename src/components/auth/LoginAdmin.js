import React, { Component } from "react"
import unicaLogo from "../../img/unica-logo-blue.png"
import { Link, Redirect } from "react-router-dom"
import firebase from "../../config/Config"
import { Alert, Spin } from "antd"
class Login extends Component {

    state = {
        user: "",
        password: "",
        logged: false,
        error:"",
        loading: false
    }
    handleChange = (e) => {
        
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    handleSubmit = (e) => {
       
        e.preventDefault()
        this.setState({
            loading:true
        })
        const firestore = firebase.firestore()
        firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password).then((user) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    let docRef = firestore.collection("users").doc(user.uid)
                    docRef.get().then(
                        function (doc) {
                            if (doc.exists && doc.data().tipo === "admin") {
                                localStorage.setItem("auth", JSON.stringify(doc.data()))
                                this.setState({
                                    logged: true,
                                    loading: false
                                })
                                
                            } else {
                                this.setState({ error: "Login ou senha incorreto.", loading: false })
                            }
                        }.bind(this),
                    )
                } else {
                    this.setState({ User: null })
                }
            })
        }).catch((error) => {
            console.log(error)
            this.setState({ error: "Login ou senha incorreto.", loading: false })
        })
        // if (this.state.user == 'admin' && this.state.password == "viusid347"){
        //     this.setState({
        //         logged: true
        //     })
        // }
    }

    render() {
        const Login = this.props.User
        if(this.state.logged != false) { return <Redirect to="/admin" /> }

        return (
            <div className="container-fluid" style={{ backgroundColor: "#00106D", height: "100vh" }}>
                <div className="row h-100">
                    <div className="col-9 col-md-3 mx-auto my-auto p-3 rounded" style={{ backgroundColor: "#fff" }}>
                        <img src={ unicaLogo } alt="unica logo" className="w-50 mx-auto d-block" />
                        <div className="text-center">
                            <h5 className="text-center">Acesso ao Painel Administrativo</h5>
                            <p className="text-muted">Informe seu usuário e senha</p>
                        </div>

                        {this.state.error !="" ? (<Alert message={this.state.error} type="error" showIcon />) :""}
                        <div className="text-center">
                            <Spin spinning={this.state.loading}/>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="login-email">Usuário</label>
                                <input type="email" className="form-control" id="user" placeholder="Coloque seu código de Usuário"  onChange={this.handleChange} value={this.state.user} />
                            </div>
                            <div className="form-group">
                                <label className="login-password">Senha</label>
                                <input type="password" className="form-control" id="password" placeholder="Coloque sua senha" onChange={this.handleChange} value={this.state.password} />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100" onClick={this.handleSubmit}>Acessar</button>
                            </div>
                            <div className="red-text center">
                                {/* {
                                    authError ? <p>{ authError }</p> : null
                                } */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         authError: state.auth.authError,
//         auth: state.firebase.auth
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signIn: (creds) => dispatch(signIn(creds))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default Login
