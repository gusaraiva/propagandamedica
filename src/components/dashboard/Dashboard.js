import React, { Fragment, Component, useEffect, useState } from "react"
import Header from "../layout/header"
import MenuAreas from "../types/areas"
import VideoList from "../videos/VideoList"
import { Redirect, Link } from "react-router-dom"
import { Spin, Button, Row, Col, Card, Divider } from "antd"
import firebase from "../../config/Config"
import { string_to_slug } from "../../helper/helper"


const Dashboard = () => {
    const [categoria, setCategoria] = useState([])


    const loadingContent = async() => {
        try{
            const newState = []
            const firestore = firebase.firestore()
        
            const querySnapshot =  await firestore.collection("categorias").get()
            if(querySnapshot.exists) { setCategoria([]) }
            querySnapshot.forEach(function (doc) {
                const userData = {
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    video: doc.data().video,
                    imagem: doc.data().imagem
                }
                newState.push(userData)
            })
            setCategoria(newState)
        } catch(error){
            alert("Ocorreu um erro ao buscar os items")
        }
      
    }


    useEffect(() => {
        async function load(){
            console.log("carregando")
            await loadingContent()
        }
        load()
    }, [])

    return (
        <Fragment>
            <Header/>
            <div className="container">
                <Row>
                    <Divider style={{ fontSize:"25px" }} plain>ÁREAS DE INTERESSE</Divider>
                </Row>
                <Row gutter={[10, 10]} justify="space-around" align="middle">

                    {categoria.map(r => ( <Col span={12} key={r.id} className="text-center">
                        <Card title={r.name}>
                       <img src={r.imagem} style={{ width:"20%" }}></img>    <p></p>
                            <p>{r.description}</p>
                            <Link to={`/categoria/${r.id}/${string_to_slug(r.name)}`}>
                                <Button type="primary"  size={"Large"} block> Acessar</Button>
                            </Link>
                        </Card>
                    </Col>))}  

                    {/* <div className="row">
                        <div className="col-12 col-md-3 px-0">
                            <MenuAreas />
                        </div>
                        <div className="col-12 col-md-9">
                            <h3 className="mt-5 ml-3">
                                    Adicionados Recentemente
                            </h3>
                            <div className="row">
                                <VideoList User={this.props.User} />
                            </div>
                        </div>
                    </div> */}
                </Row>
            </div>
           
        </Fragment>
    )
        
    
}

export default Dashboard
