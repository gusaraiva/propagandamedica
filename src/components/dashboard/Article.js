import React, { Fragment } from 'react';

const Article = (props) => {
    return (
        <Fragment>
            <div className="col-12 col-md-6 mt-3">
                <div className="card w-100 shadow">
                    <div className="card-body">
                        <h5 className="card-title">{ props.title }</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{ props.subtitle }</h6>
                        <p className="card-text">{ props.text }</p>
                        <a href={ props.url } target="_blank" rel="noopener noreferrer" className="btn btn-info w-50">Acessar</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Article;