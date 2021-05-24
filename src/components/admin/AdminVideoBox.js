import React, { Component } from 'react';

class AdminVideoBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-12 col-md-6 mb-3">
                <div className="card">
                    <div className="card-body text-left">
                        <img src={this.props.imgUrl} alt={this.props.videoDesc} className="w-100" />
                        <h5 className="card-title mt-2">{ this.props.videoName }</h5>
                        <p className="card-text">{ this.props.videoDesc }</p>
                        <span className="font-weight-bold">Status:</span> <span className="text-success">Publicado</span><br />
                        <span>{ this.props.views } visualizações</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminVideoBox;