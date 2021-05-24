import React, { Component } from "react"
import background from "../../img/background.jpg"
import unicaLogo from "../../img/unica-logo-blue.png"
import { Link } from "react-router-dom"
import firebase from "../../config/Config"

class SignUp extends Component {

    state = {
        email: "",
        password: "",
        crm: "",
        name: "",
        uf: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        cep: "",
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const firestore = firebase.firestore()
        
        firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then((res) => {
            firestore.collection("users").doc(res.user.uid).set({
                email: this.state.email,
                name: this.state.name,
                crm: this.state.crm,
                uf: this.state.uf,
                endereco: this.state.endereco,
                numero: this.state.numero,
                complemento: this.state.complemento,
                bairro: this.state.bairro,
                cidade: this.state.cidade,
                cep: this.state.cep,
                tipo:"usuario"
                
            })
            this.props.history.push("/")
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        // const { authError, auth } = this.props;
        // if(auth.uid) return <Redirect to="/" />

        return (
            <div className="container-fluid" style={{ background: "url("+ background + ")", height: "100%", backgroundSize: "cover" }}>
                <div className="row">
                    <div className="col-9 col-md-4 mx-auto my-auto p-3 rounded mt-3" style={{ backgroundColor: "#fff" }}>
                        <img src={ unicaLogo } alt="unica logo" className="w-25 mx-auto d-block" />
                        <div className="text-center">
                            <h5 clasName="text-center">Acesso restrito</h5>
                            <p className="text-muted">Informe seus dados para criar sua conta</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Use um email válido"  onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label for="name">Nome</label>
                                <input type="text" class="form-control" id="name" placeholder="Coloque seu nome completo"  onChange={this.handleChange} value={this.state.name} />
                            </div>
                            <div className="form-group">
                                <label for="crm">CRM</label>
                                <input type="text" class="form-control" id="crm" placeholder="Informe seu CRM"  onChange={this.handleChange} value={this.state.crm} />
                            </div>
                            <div className="form-group">
                                <label for="uf">CEP:</label>
                                <input type="text" class="form-control" id="cep" placeholder="Informe seu CEP"  onChange={this.handleChange} value={this.state.cep} />
                            </div>
                            <div className="form-group">
                                <label for="uf">Endereço:</label>
                                <input type="text" class="form-control" id="endereço" placeholder="Informe seu endereço"  onChange={this.handleChange} value={this.state.endereço} />
                            </div>
                            <div className="form-group">
                                <label for="uf">Número:</label>
                                <input type="text" class="form-control" id="numero" placeholder="Informe seu número"  onChange={this.handleChange} value={this.state.numero} />
                            </div>
                            <div className="form-group">
                                <label for="uf">Complemento:</label>
                                <input type="text" class="form-control" id="complemento" placeholder="Complemento (opcional)"  onChange={this.handleChange} value={this.state.complemento} />
                            </div>
                            <div className="form-group">
                                <label for="uf">Bairro:</label>
                                <input type="text" class="form-control" id="bairro" placeholder="Informe seu bairro"  onChange={this.handleChange} value={this.state.bairro} />
                            </div>
                            <div className="form-group">
                                <label for="uf">Cidade:</label>
                                <input type="text" class="form-control" id="cidade" placeholder="Informe sua cidade"  onChange={this.handleChange} value={this.state.cidade} />
                            </div>
                            <div className="form-group">
                                <label for="uf">Estado:</label>
                                <input type="text" class="form-control" id="uf" placeholder="Informe seu estado"  onChange={this.handleChange} value={this.state.uf} />
                            </div>
                            <div class="form-group">
                                <label for="password">Senha</label>
                                <input type="password" class="form-control" id="password" placeholder="Coloque sua senha" onChange={this.handleChange} value={this.state.password} />
                            </div>
                            <p className="text-center text-muted">Já tem uma conta? <Link to="/" className="text-primary">Acesse agora</Link></p>
                            <div className="text-center">
                                <button type="submit" class="btn btn-primary">Criar Conta</button>
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
//         auth: state.firebase.auth,
//         authError: state.auth.authError
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signUp: (newUser) => dispatch(signUp(newUser))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp
