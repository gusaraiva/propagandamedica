import React, { Component, Fragment } from 'react'
import AdminPages from './AdminPages';
import AdminHeader from '../layout/AdminHeader';
import AdminPainel from './AdminPainel';

class AdminDashboard extends Component {
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
                            <AdminPainel />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AdminDashboard
