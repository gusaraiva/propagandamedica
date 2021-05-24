import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import firebase from "../../config/Config"
import Header from "../layout/header"
import MenuAreas from "../types/areas"
import Video from "../videos/Video"
import VideoPlayer from "../videos/VideoPlayer"
import { Layout, Menu, Breadcrumb, Button, Icon, Col, Row, Spin, Card, Divider, Input, Checkbox, Form, message, Popconfirm } from "antd"
import { HomeOutlined, UserOutlined } from "@ant-design/icons"
import { string_to_slug } from "../../helper/helper"
import MaskedInput from "antd-mask-input"
const {  Content, Sider } = Layout


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 20,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
}

const Perfil = (props) => {

    const [form] = Form.useForm()

    const onFinish = (values) => {

        values.tipo = "usuario"
        let user = JSON.parse(localStorage.getItem("auth"))
        values.email = user.email
        const firestore = firebase.firestore()  
        firebase.auth().onAuthStateChanged((user) => {

            firestore.collection("users")
                .doc(user.uid)
                .set(values)
                .then(() => {
                    message.success("salvo com sucesso!")
                    onLoad()
                })
        })
    }

    const changeEmailPassword = (input) => {
        
        if(input.email != ""){
            changeEmail(input.email)
        }

        if(input.password != ""){
            changeEmail(input.password)
        }


        message.success("Dados de acesso atualizado com sucesso!")
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    const onLoad = async() => {


        const firestore = firebase.firestore()

        firebase.auth().onAuthStateChanged((user) => {

            firestore.collection("users")
                .doc(user.uid)
                .get()
                .then(res => {
                    if(res.exists){
                        form.setFieldsValue(res.data())
                        // {
                        //       name: res.data().name,
                        //       crm: res.data().crm,
                        //       email: res.data().email,
                        //       uf: res.data().uf,
                        //       endereco: res.data().endereco,
                        //       numero: res.data().numero,
                        //       cep: res.data().cep,
                        //       cidade: res.data().cidade,
                        //       bairro: res.data().bairro,
                        //       complemento: res.data().complemento,  
                        //   }
                    } else {
                        message.error("Erro no banco de dados")
                    }
                
                })
        })
    }
    const reauthenticate = (currentPassword) => {
        let user = firebase.auth().currentUser
        let cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

    const changePassword = (newPassword) => {

        let user = firebase.auth().currentUser
        user.updatePassword(newPassword).then(() => {
            console.log("Password updated!")
        }).catch((error) => { console.log(error) })

    }

    const changeEmail = (newEmail) => {

        let user = firebase.auth().currentUser
        user.updateEmail(newEmail).then(() => {
            console.log("Email updated!")
        }).catch((error) => { console.log(error) })

    }

    useEffect(() => {
        onLoad()

    }, [])
    return(<>

          <Header User={props.User}  style={{ position: "fixed", zIndex: 1, width: "100%" }}/>
                <div>
                    <Layout>
                       

                        <Layout>
                            <Content
                                style={{
                                 
                                    height: "100vh",
                                    padding: "2%"
                                }}
                            >

                                <Row gutter={10}>
                                    <Col span={24}>
                                        <Breadcrumb>
                                            <Breadcrumb.Item href="/home">
                                                <HomeOutlined />
                                                <span>Home</span>
                                            </Breadcrumb.Item>

                                            <Breadcrumb.Item href="/perfil">

                                                <span>Perfil</span>
                                            </Breadcrumb.Item>
                                           
                                           
                                            {/* <Breadcrumb.Item>Application</Breadcrumb.Item> */}
                                        </Breadcrumb>

                                        <Divider></Divider>
                                    </Col>
                                </Row><Row gutter={60}>
                                    <Col span={8}>

                                        <Form
                                            {...layout}
                                            name="basic"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            form={form}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                        >

                                            <Form.Item
                                                label="Nome"
                                                name="name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Campo nome obrigatório!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>


                                            <Form.Item
                                                label="CRM"
                                                name="crm"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Campo nome obrigatório!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Cep"
                                                name="cep"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Campo nome obrigatório!",
                                                    },
                                                ]}
                                            >
                                                <MaskedInput mask="11111-111"/>
                                            </Form.Item>

                                            <Form.Item
                                                label="Endereço"
                                                name="endereco"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Campo nome obrigatório!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Número"
                                                name="numero"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Campo nome obrigatório!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Complemento"
                                                name="complemento"
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Bairro"
                                                name="bairro"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Campo nome obrigatório!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <span>
                                                <Form.Item
                                                    label="Cidade"
                                                    name="cidade"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Campo nome obrigatório!",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>


                                                <Form.Item
                                                    label="Estado"
                                                    name="uf"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Campo nome obrigatório!",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </span>
                                           

                                            <Form.Item {...tailLayout}>
                                                <Button type="primary" htmlType="submit">
          Salvar
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>

                                    <Col>
                                        <h3>Dados de acesso</h3>
                                        <Form
                                            {...layout}
                                            name="basic2"
                                           
                                            onFinish={changeEmailPassword}
                                            onFinishFailed={onFinishFailed}
                                        >


                                            <Card>
                                                <Form.Item
                                                    label="E-mail"
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your username!",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Password"
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please input your password!",
                                                        },
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>
                                          

                                                <Form.Item {...tailLayout}>
                                                    <Button type="primary" htmlType="submit">
          Salvar
                                                    </Button>
                                                </Form.Item>
                                            </Card>
                                        </Form>
                                    
                                    </Col>
                                </Row>
                               
                            </Content>
                        </Layout>
                    </Layout>
                
                </div>
    </>)

}

export default Perfil