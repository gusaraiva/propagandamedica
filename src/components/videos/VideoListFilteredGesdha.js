import React, { Fragment, Component } from "react"
import Header from "../layout/header"
import VideoPlayer from "./VideoPlayer"
import VideoList from "./VideosListGesdha"
import { Redirect } from "react-router-dom"

class VideoListFiltered extends Component {
    state = {
        videoPlayer: false,
        videoLoaded : {
            videosrc: "",
            videoname: "",
            videodesc: ""
        }
    }

    closeVideoPlayer = () => {
        this.setState({
            videoPlayer: false
        }) 
    }

    openVideoPlayer = (obj, e) => {
        e.preventDefault()
        console.log(obj)
        this.setState({
            videoPlayer: true,
            videoLoaded : {
                videosrc: obj.src,
                videoname: obj.name,
                videodesc: obj.desc
            }
        })
    }

    render() {
        if(this.props.User == null) { return <Redirect to="/acesso" /> }

        const video = (this.state.videoPlayer) ? <VideoPlayer
            src={this.state.videoLoaded.videosrc}
            name={this.state.videoLoaded.videoname}
            desc={this.state.videoLoaded.videodesc} closeVideoPlayer={this.closeVideoPlayer} /> : null

        // console.log('props');
        // console.log(this.props)
        return (
            <Fragment>
                { video }
                <Header User={this.props.User} />
                <div className="container-fluid bg-dark">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 bg-dark">
                                    <h4 className="text-left text-light py-3">
                                       Gesdha
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <VideoList User={ this.props.User } />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default VideoListFiltered