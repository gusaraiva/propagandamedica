import React, { Component, Fragment } from 'react';
import AdminHeader from '../layout/AdminHeader';
import AdminPages from './AdminPages';
import firebase from '../../config/Config';

class AdminUserProfile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        User: {},
        Views: []
    }

    componentDidMount() {
        const firestore = firebase.firestore();
        let newState = {};
        firestore.collection("users").doc(this.props.match.params.id).get().then(doc => {
            const userData = {
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                crm: doc.data().crm,
                uf: doc.data().uf
            }        
            newState = userData;
            console.log('state');
            console.log(newState);

            this.setState({
                User: newState
            });
        })
        .catch((error) => {
            console.log(error);
        });


        const viewsNewState = [];
        firestore.collection("views").where("userId", "==", this.props.match.params.id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                const view = {
                    id: doc.id,
                    videoTitle: doc.data().videoTitle,
                    watchDate: doc.data().watchDate
                }

                viewsNewState.push(view);
            });

            this.setState({
                Views: viewsNewState
            }).bind(this);
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    render() {
        return (
            <Fragment>
               <AdminHeader />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-3 px-0">
                            <AdminPages />
                        </div>
                        <div className="col-12 col-md-9">
                            <h2 className="mt-5 ml-3">{ this.state.User.name }</h2>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <h6 className="ml-1">
                                            <strong> Email:</strong> { this.state.User.email }<br /> 
                                            <strong> CRM:</strong> { this.state.User.crm }<br />
                                            <strong> UF:</strong> { this.state.User.uf }<br />
                                        </h6>
                                    </div>
                                    <div className="col-12">
                                        <Fragment>
                                            <h3 className="mt-5">Propagandas assistidas:</h3>
                                            <table class="table w-100 mt-3">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nº</th>
                                                        <th scope="col">Video</th>
                                                        <th scope="col">Data</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.Views.map((view, index) => {
                                                            return (
                                                                <tr key={view.id}>
                                                                    <td>{ index + 1 }</td>
                                                                    <td>{ view.videoTitle }</td>
                                                                    <td>{ view.watchDate }</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </Fragment>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AdminUserProfile
