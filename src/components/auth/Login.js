import React, { Component } from "react"
import background from "../../img/background.jpg"
import unicaLogo from "../../img/logo.svg"
import { Link, Redirect } from "react-router-dom"
import firebase from "../../config/Config"
import { Alert, Spin } from "antd"

class Login extends Component {

    state = {
        email: "",
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
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    let docRef = firestore.collection("users").doc(user.uid)
                    docRef.get().then(
                        function (doc) {
                            if (doc.exists && doc.data().tipo !== "admin") {
                                localStorage.setItem("auth", JSON.stringify(doc.data()))
                                this.setState({
                                    logged: true,
                                    loading: false
                                })

                            } else {
                                this.setState({ error: "Login ou senha incorreto.", loading: false, logged: false })
                            }
                        }.bind(this),
                    )
                } else {
                    this.setState({ User: null })
                    this.setState({ error: "Login ou senha incorreto.", loading: false })

                }
            })
            // if(user){
            //     this.setState({
            //         logged: true
            //     })
            // }
        }).catch((error) => {
            this.setState({ error: "Login ou senha incorreto.", loading: false })
            console.log(error)
        })
    }

    render() {

        const Login = this.props.User

        console.log(this.state)
        if(this.state.logged) { return <Redirect to="/home" /> }

        return (
            <div className="container-fluid" style={{ background: "url("+ background + ")", height: "100vh", backgroundSize: "cover" }}>
                <div className="row h-100">
                    <div className="col-9 col-md-3 mx-auto my-auto p-3 rounded" style={{ backgroundColor: "#fff" }}>
                        <img src={ unicaLogo } alt="unica logo" className="w-50 mx-auto d-block" style={{marginTop: 2 + 'em'}}/>
                        <div className="text-center">
                            <h5 className="text-center" style={{marginTop: 2 + 'em'}}>Acesso restrito</h5>
                            <p className="text-muted">Informe seu email e senha</p>
                        </div>
                        {this.state.error != ""  ? (<Alert message="Login ou senha incorreto." type="error" showIcon />) :""}
                        <div className="text-center">
                            <Spin spinning={this.state.loading}/>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Coloque seu email"  onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label>Senha</label>
                                <input type="password" className="form-control" id="password" placeholder="Coloque sua senha" onChange={this.handleChange} value={this.state.password} />
                            </div>
                            <p className="text-center text-muted">Não tem conta? <Link to="/cadastro" className="text-primary">Crie agora</Link></p>
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
