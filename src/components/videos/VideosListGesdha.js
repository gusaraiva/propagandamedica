import React, { Fragment, Component } from "react"
import Video from "./Video"
import VideoPlayer from "./VideoPlayer"
import firebase from "../../config/Config"

class VideoList extends Component {
    constructor(props){
        super(props)
    }

    state = {
        video: {
            videoPlayer: true,
            videoLoaded : {
                videosrc: "",
                videoname: "",
                videodesc: ""
            }
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

    countView = (obj) => {
        const firestore = firebase.firestore()
        let viewRequest = firestore.collection("views").doc()
        let currentDate = new Date()

        viewRequest.set({
            email: this.props.User.email,
            name: this.props.User.name,
            userId: this.props.User.uid,
            videoId: obj.src,
            videoTitle: `${obj.name} - ${obj.desc}`,
            watchDate: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} - ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
            
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const video = (this.state.videoPlayer) ? <VideoPlayer
            src={this.state.videoLoaded.videosrc}
            name={this.state.videoLoaded.videoname}
            desc={this.state.videoLoaded.videodesc} closeVideoPlayer={this.closeVideoPlayer} /> : null
        return (
            <Fragment>
                { video }
                <Video videosrc={"https://unicapharma.com.br/videos/video-drnilson.mp4"} 
                    videoname={"A importância da suplementação na gestação."} 
                    videodesc={"Dr. Nilson Roberto de Melo"} 
                    openVideoPlayer={this.openVideoPlayer}
                    countView={this.countView } />
            </Fragment>
        )
    }
}

export default VideoList