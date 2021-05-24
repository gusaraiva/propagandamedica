import React, { Fragment } from 'react';

const VideoPlayer = (props) => {
    return (
        <Fragment>
            <div style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingRight: '0px' }} className="modal fade show" id="exampleModalScrollable" tabindex="-1" role="dialog">
                <div style={{zIndex: '1051', marginTop: '50px'}} className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={props.closeVideoPlayer} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="embed-responsive embed-responsive-16by9">
                                <video class="embed-responsive-item" controls autoplay="">
                                    <source src={props.src} type="video/mp4" />
                                </video>
                            </div>
                            <h5 className="mt-3">{props.name}</h5>
                            <p>{props.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
           
        </Fragment>
    )
}

export default VideoPlayer;