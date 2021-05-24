import React, { Component, createContext } from "react"
import Dashboard from "./components/dashboard/Dashboard"
import VideoListFiltered from "./components/videos/VideoListFiltered"
import VideoListFilteredGesdha from "./components/videos/VideoListFilteredGesdha"
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import Requests from "./components/dashboard/Requests"
import LoginAdmin from "./components/auth/LoginAdmin"
import AdminDashboard from "./components/admin/AdminDashboard"
import AdminUserProfile from "./components/admin/AdminUserProfile"
import AdminVideos from "./components/admin/AdminVideos"
import AdminVisitas from "./components/admin/AdminVisitas"
import AdminAmostras from "./components/admin/AdminAmostras"
import AdminEstatistica from "./components/admin/AdminEstatisticas"
import AdminProdutos from "./components/admin/AdminProdutos"

import AdminCategorias from "./components/admin/AdminCategorias"
import AdminEnfermidades from "./components/admin/AdminEnfermidades"

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import firebase from "./config/Config"

import AdminArtigos from "./components/admin/AdminArtigos"
import Categorias from "./components/pages/admin/Categorias"
import ProtectedRoute from "./util/ProtectedRoute"
import ProtectedRouteUser from "./util/ProtectedRouteUser"
import Categoria from "./components/dashboard/Categoria"
import Produtos from "./components/dashboard/Produtos"
import ProdutosVideo from "./components/dashboard/ProdutosVideo"
import Perfil from "./components/dashboard/Perfil"

class App extends Component {
    state = {
        User: {},
    };

    componentWillMount() {
        this.authAuthentication()
    }

    authAuthentication = () => {
        let userObj = {
            User: null,
        }
        const firestore = firebase.firestore()

        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                let docRef = firestore.collection("users").doc(user.uid)
                docRef.get().then(
                    function (doc) {
                        if (doc.exists) {
                            userObj = {
                                name: doc.data().name,
                                email: doc.data().email,
                                crm: doc.data().crm,
                                uf: doc.data().uf,
                                uid: user.uid,
                                tipo: doc.data().tipo
                            }

                            this.setState({
                                User: userObj,
                            })
                        } else {
                            console.log("No such document!")
                        }
                    }.bind(this),
                )
            } else {
                this.setState({ User: null })
            }
        })
    };


    render() {
        return (
            <BrowserRouter>
              
                
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Login User={this.state.User} />}
                    />
                    <Route exact path="/cadastro" component={SignUp} />
                </Switch>
               
                
                <Switch>
                    <ProtectedRouteUser
                        exact
                        path="/home"
                        User={this.state.User}
                        component={Dashboard }
                    />
                
                   
                    <ProtectedRouteUser
                        path="/videos/:id"
                        User={this.state.User}
                        render={VideoListFiltered}
                    />
                    <ProtectedRouteUser
                        path="/solicitacoes"
                        User={this.state.User}
                        component={Requests}
                    />
                    <ProtectedRouteUser
                        path="/video/gesdha"
                        User={this.state.User}
                        component={VideoListFilteredGesdha}
                    />

                    <ProtectedRouteUser
                        path="/categoria/:id/:cat"
                        User={this.state.User}
                        component={Categoria}
                    />

                    <ProtectedRouteUser
                        path="/produto/:enfermidade/:id"
                        User={this.state.User}
                        component={Produtos}
                    />

                    <ProtectedRouteUser
                        path="/produto-videos/:nomeproduto/:id/:idproduto"
                        User={this.state.User}
                        component={ProdutosVideo}
                    />

                    <ProtectedRouteUser
                        path="/perfil"
                        User={this.state.User}
                        component={Perfil}
                    />
                </Switch>

                
                <Switch>
                    {/* =================ADMIN==================== */}
                    <Route exact path="/admin/acesso" component={LoginAdmin} />
                    <ProtectedRoute exact path="/admin"  User={this.state.User} component={AdminDashboard} />
                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        User={this.state.User}
                        path="/admin/perfil/:id"
                        component={AdminUserProfile}
                    />
                    <ProtectedRoute exact
                        User={this.state.User}
                        path="/admin/videos" component={AdminVideos} />
                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/visitas"
                        component={AdminVisitas}
                    />

                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/estatistica"
                        component={AdminEstatistica}
                    />
                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/produtos"
                        component={AdminProdutos}
                    />

                    {/* <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/categorias"
                        component={Admincategorias}
                    /> */}

                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/amostras"
                        component={AdminAmostras}
                    />
                   

                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/artigos"
                        component={AdminArtigos}
                    />

                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/categorias"
                        component={AdminCategorias}
                    />
                    <ProtectedRoute
                        exact
                        User={this.state.User}
                        path="/admin/enfermidades"
                        component={AdminEnfermidades}
                    />
                </Switch>
                

            </BrowserRouter>
        )
    }
}

export default App
