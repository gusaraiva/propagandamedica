import React, { Component, Fragment } from 'react';
import firebase from '../../config/Config';
import Table from './AdminPainelTable';

class AdminPainel extends Component {

    state = {
        Users: []
    }

    componentDidMount() {
        const firestore = firebase.firestore();
        const newState = [];
        firestore.collection("users").get()
            .then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
                const userData = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    crm: doc.data().crm,
                    uf: doc.data().uf
                }
                newState.push(userData)
            });

            this.setState({
                Users: newState
            })
        });
    }
    render() {
        return (
            <Fragment>
                <h3 className="mt-4 ml-3">Usuários ativos</h3>
                <table class="table table-hover mt-3">
                    <thead>
                        <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CRM</th>
                        <th scope="col">UF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Table users={this.state.Users} />
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default AdminPainel
