import React, { Component, Fragment } from 'react';
import AdminHeader from '../layout/AdminHeader';
import AdminPages from './AdminPages';
import AdminVideoBox from './AdminVideoBox';

class AdminVideos extends Component {
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
                            <h3 className="mt-3 ml-3">Vídeos</h3>
                            <div className="container-fluid">
                                <div className="row">
                                    <AdminVideoBox 
                                        imgUrl="https://unicapharma.com.br/videos/dr-roberto.png"
                                        videoName="Minha Experiência com Glizigen"
                                        videoDesc="Dr. Alberto de Oliveira D'Auria"
                                        videoSrc="https://unicapharma.com.br/videos/video-dr-alberto.mp4"
                                        views="69" />
                                    <AdminVideoBox 
                                        imgUrl="https://unicapharma.com.br/videos/dra-campaner.png"
                                        videoName="Doutora Apresenta Glizigen"
                                        videoDesc="Dra. Adriana B. Campaner"
                                        videoSrc="https://unicapharma.com.br/videos/video-drcampaner.mp4"
                                        views="45" />

                                    <AdminVideoBox 
                                        imgUrl="https://unicapharma.com.br/videos/dra-renata.png"
                                        videoName="Minha Experiência com Glizigen"
                                        videoDesc="Doutora Renata"
                                        videoSrc="https://unicapharma.com.br/videos/video-dra-renata.mp4" 
                                        views="86"/>

                                    <AdminVideoBox 
                                        imgUrl="https://unicapharma.com.br/videos/dr-dauria.png"
                                        videoName="Minha Experiência com Glizigen"
                                        videoDesc="Dr. Alberto D'Auria"
                                        videoSrc="https://unicapharma.com.br/videos/video-dr-dauria.mp4" 
                                        views="52" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AdminVideos;