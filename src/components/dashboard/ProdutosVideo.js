import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import firebase from "../../config/Config"
import Header from "../layout/header"
import MenuAreas from "../types/areas"
import Video from "../videos/Video"
import VideoPlayer from "../videos/VideoPlayer"
import { Layout, Menu, Breadcrumb, Button, Icon, Col, Row, Spin, Card, Divider } from "antd"
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { string_to_slug } from "../../helper/helper"
const {  Content, Sider } = Layout
const ProdutosVideo = (props) => {
    let { id, idproduto } = useParams()
    let history = useHistory()

    const [produto, setProduto] = useState([])
    const [prod, setProd] = useState({})
    const [categoria, setCategoria] = useState({})
    const [enfermidade, setEnfermidade] = useState({})
    const [video, setVideo] = useState([])
    const [videoPlayer, setVideoPlayer] = useState({})
    const [loading, setLoading] = useState(true)

    const getEnfermidade = async() => {
        const db = firebase.firestore()
        const  getEnf = await db.collection("enfermidades").doc(id).get()
        const data = Object.assign(getEnf.data(), { id: getEnf.id })
        setEnfermidade(data)
        getCategoria(getEnf.data().cat_id)
    }

    const getCategoria = async(id) => {
        const db = firebase.firestore()
        const  getCat = await db.collection("categorias").doc(id).get()
        const data = Object.assign(getCat.data(), { id: id })

        setCategoria(data)
    }


    const getProdutos = async() => {
        const firestore = firebase.firestore()
        const db = firestore.collection("produtos")
        const getCat = await db.where("enf_id", "==", id).get()
        const produto = getCat.docs.map(v => v.data())
        setProduto(produto)
        setLoading(false)
    }

    const getProduto = async() => {
        const firestore = firebase.firestore()
        const db = firestore.collection("produtos")
        const getCat = await db.doc(idproduto).get()
        const data = Object.assign(getCat.data(), { id: getCat.id })
        setProd(data)
        setLoading(false)
    }

    const getVideos = async() => {
        const firestore = firebase.firestore()
        const db = firestore.collection("videos")
        const getVid = await db.where("prod_id", "==", idproduto).get()
        const videos = getVid.docs.map(v => v.data())
        setVideo(videos)
        setLoading(false)
    }

    const closeVideoPlayer = () => {
        setVideoPlayer({
            videoPlayer: false,
        })
    }

    const openVideoPlayer = (obj, e) => {
        e.preventDefault()
        setVideoPlayer({
            videoPlayer: true,
            videoLoaded: {
                videosrc: obj.src,
                videoname: obj.name,
                videodesc: obj.desc,
            },
        })
    }

    const countView = (obj) => {
        const firestore = firebase.firestore()
        let viewRequest = firestore.collection("views").doc()
        let currentDate = new Date()
        let dadosUser = JSON.parse(localStorage.getItem("auth"))
        firebase.auth().onAuthStateChanged((user) => {
            viewRequest
                .set({
                    email: dadosUser.email,
                    name: dadosUser.name,
                    userId: user.uid,
                    videoId: obj.src,
                    videoTitle: `${obj.name} - ${obj.desc}`,
                    watchDate: `${currentDate.getDate()}/${
                        currentDate.getMonth() + 1
                    }/${currentDate.getFullYear()} - ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
                })
                .catch((err) => {
                    console.log(err)
                })
        })

    }


    useEffect(() => {
        getProdutos()
        getVideos()
        getEnfermidade()
        getProduto()
    }, [])

    return (<>

      { videoPlayer.videoPlayer   &&  <VideoPlayer
          src={videoPlayer.videoLoaded.videosrc}
          name={videoPlayer.videoLoaded.videoname}
          desc={videoPlayer.videoLoaded.videodesc}
          closeVideoPlayer={closeVideoPlayer}
      />}
      <Header User={props.User}  style={{ position: "fixed", zIndex: 1, width: "100%" }}/>
                <div>
                    <Layout>
                        <Sider
                            style={{
                                overflow: "auto",
                                height: "100vh",
                            }}
                        >


                            <Menu theme="light"  mode="inline">
                                {produto.map(r => (
                                    <Menu.Item key={r.id}>
                                        <Link to={`/produto/${string_to_slug(r.name)}/${r.id}`}>{r.name}</Link>
                                    </Menu.Item>
                                ))}
                            </Menu>
                        </Sider>

                        <Layout>
                            <Content
                                style={{

                                    height: "100vh",
                                    padding: "2%"
                                }}
                            >

                                <Row gutter={10}>
                                    <Col span={22}>
                                        <Breadcrumb>
                                            <Breadcrumb.Item href="/home">
                                                <HomeOutlined />
                                                <span>Home</span>
                                            </Breadcrumb.Item>
                                            {Object.entries(categoria).length > 0 ?   <Breadcrumb.Item href={`/categoria/${categoria.id}/${string_to_slug(categoria.name)}`}>
                                                <span>{categoria.name}</span>
                                            </Breadcrumb.Item> : null}

                                            {Object.entries(enfermidade).length > 0 ? <Breadcrumb.Item href={`/produto/${string_to_slug(enfermidade.name)}/${enfermidade.id}`}>
                                                <span>{enfermidade.name}</span>
                                            </Breadcrumb.Item> : null}


                                            {prod &&   <Breadcrumb.Item href="">
                                                <span>{prod.name}</span>
                                            </Breadcrumb.Item>}


                                            {/* <Breadcrumb.Item>Application</Breadcrumb.Item> */}
                                        </Breadcrumb>

                                        <Divider></Divider>
                                    </Col>

                                    <Col span={2}>
                                        <Button  type="primary" onClick={() => props.history.go(-1)} className="text-right">Voltar</Button>
                                    </Col>
                                </Row>
                                <Spin tip="Carregando" spinning={loading}>
                                    <Row gutter={[20, 20]}>
                                        {video.map(v => (
                                            <Col span={8}>
                                                <Video videosrc={v.src}  videoname={v.name} videodesc={v.description} openVideoPlayer={openVideoPlayer} countView={countView} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Spin>
                            </Content>
                        </Layout>
                    </Layout>

                </div>
    </>)
}


export default ProdutosVideo
