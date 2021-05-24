import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';

class AdminPainelTable extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loc: false
    }

    rowClickHandler = (e, id) => {
        e.preventDefault();
        console.log(id);
        this.setState({
            loc: id
        })
    }

    render() {
        if(this.state.loc){
            return <Redirect to={`/admin/perfil/${this.state.loc}`} />
        }
        return (
            <Fragment>
                {
                    this.props.users.map((user, i) => {
                        return (
                            <tr key={i} id={user.id} onClick={(e) => this.rowClickHandler(e, user.id) }>
                                <td>{ user.email }</td>
                                <td>{ user.name }</td>
                                <td>{ user.crm }</td>
                                <td>{ user.uf }</td>
                            </tr>
                        )
                    })
                }
            </Fragment>
        )
    }
}
export default AdminPainelTable;