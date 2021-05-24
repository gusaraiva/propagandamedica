import React, { Fragment, Component } from "react"
import Video from "./Video"
import VideoPlayer from "./VideoPlayer"
import firebase from "../../config/Config"

class VideoList extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        video: {
            videoPlayer: true,
            videoLoaded: {
                videosrc: "",
                videoname: "",
                videodesc: "",
            },
        },
        videolist: [],
    };

    componentDidMount() {
        const firestore = firebase.firestore()
        const newState = []
        firestore
            .collection("videos")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        src: doc.data().src,
                    }
                    newState.push(userData)
                })

                this.setState({
                    videolist: newState,
                })
            })
    }

    closeVideoPlayer = () => {
        this.setState({
            videoPlayer: false,
        })
    };

    openVideoPlayer = (obj, e) => {
        e.preventDefault()
        this.setState({
            videoPlayer: true,
            videoLoaded: {
                videosrc: obj.src,
                videoname: obj.name,
                videodesc: obj.desc,
            },
        })
    };

    countView = (obj) => {
        const firestore = firebase.firestore()
        let viewRequest = firestore.collection("views").doc()
        let currentDate = new Date()

        viewRequest
            .set({
                email: this.props.User.email,
                name: this.props.User.name,
                userId: this.props.User.uid,
                videoId: obj.src,
                videoTitle: `${obj.name} - ${obj.desc}`,
                watchDate: `${currentDate.getDate()}/${
                    currentDate.getMonth() + 1
                }/${currentDate.getFullYear()} - ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
            })
            .catch((err) => {
                console.log(err)
            })
    };

    render() {
        const video = this.state.videoPlayer ? (
            <VideoPlayer
                src={this.state.videoLoaded.videosrc}
                name={this.state.videoLoaded.videoname}
                desc={this.state.videoLoaded.videodesc}
                closeVideoPlayer={this.closeVideoPlayer}
            />
        ) : null
        return (
            <Fragment>
                {video}

                {this.state.videolist.map((v) => (
                    <Video
                        key={v.id}
                        videosrc={v.src}
                        videoname={v.name}
                        videodesc={v.description}
                        openVideoPlayer={this.openVideoPlayer}
                        countView={this.countView}
                    />
                ))}
                {/* <Video
                    videosrc={
                        'https://unicapharma.com.br/videos/video-dr-alberto.mp4'
                    }
                    videoname={'Minha Experiência com Glizigen'}
                    videodesc={"Dr. Alberto D'Auria Filho"}
                    openVideoPlayer={this.openVideoPlayer}
                    countView={this.countView}
                />

                <Video
                    videosrc={
                        'https://unicapharma.com.br/videos/video-drcampaner.mp4'
                    }
                    videoname={'Doutora Apresenta Glizigen'}
                    videodesc={'Dra. Adriana B. Campaner'}
                    openVideoPlayer={this.openVideoPlayer}
                    countView={this.countView}
                />

                <Video
                    videosrc={
                        'https://unicapharma.com.br/videos/video-dra-renata.mp4'
                    }
                    videoname={'Minha Experiência com Glizigen'}
                    videodesc={'Dra. Renata do Valmoedim'}
                    openVideoPlayer={this.openVideoPlayer}
                    countView={this.countView}
                />

                <Video
                    videosrc={
                        'https://unicapharma.com.br/videos/video-dr-dauria.mp4'
                    }
                    videoname={'Minha Experiência com Glizigen'}
                    videodesc={"Dr. Alberto D'Auria"}
                    openVideoPlayer={this.openVideoPlayer}
                    countView={this.countView}
                />

                <Video
                    videosrc={
                        'https://unicapharma.com.br/videos/video-drnilson.mp4'
                    }
                    videoname={'A importância da suplementação na gestação.'}
                    videodesc={'Dr. Nilson Roberto de Melo'}
                    openVideoPlayer={this.openVideoPlayer}
                    countView={this.countView}
                /> */}
            </Fragment>
        )
    }
}

export default VideoList
