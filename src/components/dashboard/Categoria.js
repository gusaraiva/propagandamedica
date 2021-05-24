import React, { useEffect, useState, } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import firebase from "../../config/Config"
import Header from "../layout/header"
import MenuAreas from "../types/areas"
import { Layout, Menu, Breadcrumb, Button, Icon, Col, Row, Spin, Card, Divider } from "antd"
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { string_to_slug } from "../../helper/helper"


const {  Content, Sider } = Layout

const Categoria = (props) => {

    let { id } = useParams()
    let history = useHistory()

    const [enfermidades, setEnfermidades] = useState([])
    const [categoria, setCategoria] = useState({})
    const [loading, setLoading] = useState(true)


    const loadCategoria = async() =>{
        const firestore = firebase.firestore()
        const db = firestore.collection("categorias")
        const getCat = await db.doc(id).get()

        setCategoria(getCat.data())
        setLoading(false)

    }

    const loadingContent = async () => {
        const firestore = firebase.firestore()

        const newState = []
        const enfermidade = firestore.collection("enfermidades")
        const onlyCat = await enfermidade.where("cat_id", "==", id).get()
        if(onlyCat.empty){
            console.log("Nenhum documento encontrado")
        }
        onlyCat.forEach(function (doc) {
            const userData = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                video: doc.data().video,
            }
            newState.push(userData)
        })
        setEnfermidades(newState)


    }

    useEffect(() => {
        loadingContent()
        loadCategoria()
    }, [])

    return (<>
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
                                <Menu.Item key="99999">
                                    <b>ENFERMIDADE</b>
                                </Menu.Item>
                                {enfermidades.map(r => (
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
                                            {/* <Breadcrumb.Item href="">
                                            <UserOutlined />
                                            <span>Application List</span>
                                        </Breadcrumb.Item> */}
                                            {/* <Breadcrumb.Item>Application</Breadcrumb.Item> */}
                                        </Breadcrumb>

                                        <Divider></Divider>
                                    </Col>
                                    <Col span={2}>
                                        <Button  type="primary" onClick={() => props.history.go(-1)} className="text-right">Voltar</Button>
                                    </Col>
                                </Row>
                                <Spin tip="Carregando" spinning={loading}>
                                    <Row>

                                        <Col span={16} offset = {4}>
                                            {categoria && (
                                                <Card title={categoria.name} bordered={false} width={{ width: "650px" }}>

                                                    <p>{categoria.description}</p>
                                                    <div className="embed-responsive embed-responsive-16by9">
                                                        <video src={categoria.video}  className="embed-responsive-item" autoPlay controls/>
                                                    </div>

                                                </Card>
                                            )}

                                        </Col>
                                    </Row>
                                </Spin>
                            </Content>
                        </Layout>
                    </Layout>

                </div>
    </>)
}

export default Categoria
