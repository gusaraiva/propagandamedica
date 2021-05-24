import React, { Fragment, useState, useEffect } from 'react';
import Article from './Article';
import firebase from '../../config/Config';

const ArticlesRequest = () => {
    const [artigos, setArtigos] = useState([]);

    const loadContent = () => {
        const firestore = firebase.firestore();
        const newState = [];
        firestore
            .collection('artigos')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        title: doc.data().title,
                        subtitle: doc.data().subtitle,
                        description: doc.data().description,
                        link: doc.data().link,
                    };
                    newState.push(userData);
                });

                setArtigos(newState);
            });
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <Fragment>
            {artigos.map((v) => (
                <Article
                    key={v.id}
                    title={v.title}
                    subtitle={v.subtitle}
                    text={v.description}
                    url={v.link}
                />
            ))}
        </Fragment>
    );
};

export default ArticlesRequest;
