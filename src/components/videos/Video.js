import React from "react"
import { Link } from "react-router-dom"

const Course = (props) => {
    return (
        <div>
            <Link to={""} onClick={(e) => { 
                props.openVideoPlayer({ src: props.videosrc, name: props.videoname, desc: props.videodesc }, e)
                props.countView({ src: props.videosrc, name: props.videoname, desc: props.videodesc })
            }}>
                <div className="card">
                    <div className="card-body text-left">
                        <div class="embed-responsive embed-responsive-16by9">
                            <video class="embed-responsive-item" preload="metadata">
                                <source src={ props.videosrc + "#t=15"} type="video/mp4" />
                            </video>
                        </div>
                        <h5 className="card-title mt-2">{ props.videoname }</h5>
                        <p className="card-text">{ props.videodesc }</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Course