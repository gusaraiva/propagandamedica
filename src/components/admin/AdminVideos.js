import React, { useEffect, useState } from "react"
import AdminPages from "./AdminPages"
import AdminHeader from "../layout/AdminHeader"
import firebase from "../../config/Config"
import { Table, Button, Row, Col, Form, Input, Divider, message } from "antd"
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
}

const AdminVideos = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm()

    const remove = (doc) => {
        const firestore = firebase.firestore()

        let artigosRequest = firestore
            .collection("videos")
            .doc(doc)
            .delete()
            .then(() => {
                message.loading("Excluindo...", 1.5).then(() => {
                    message.success("Excluído com sucesso!")
                    loadingContent()
                })
            })
    }

    const columns = () => {
        return [
            {
                title: "Nome",
                dataIndex: "name",
                key: "name",
                responsive: ["md"],
            },
            {
                title: "Descrição",
                dataIndex: "description",
                key: "description",
                responsive: ["md"],
            },
            {
                title: "Image",
                dataIndex: "src",
                key: "src",
                responsive: ["md"],
                render: (link) => {
                    return (
                        <video preload="metadata" style={{ width: "100px" }}>
                            <source src={link + "#t=15"} type="video/mp4" />
                        </video>
                    )
                },
            },
            {
                title: "link",
                dataIndex: "src",
                key: "src",
                responsive: ["md"],
            },
            {
                title: "Ações",
                dataIndex: "id",
                render: (key) => {
                    return (
                        <>
                            <Button onClick={() => remove(key)}>Excluir</Button>
                        </>
                    )
                },
            },
        ]
    }

    const onSubmit = (e) => {
        const firestore = firebase.firestore()
        let videosRequest = firestore.collection("videos").doc()

        videosRequest
            .set(e)
            .then(() => {
                message
                    .loading("enviando...", 1)
                    .then(() => message.success("cadastrado com sucesso!"))
                loadingContent()
            })
            .catch((err) => {
                message.error(
                    "Erro no envio de dados por favor tenta mais tarde.",
                )
            })
    }

    const loadingContent = () => {
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

                setVideos(newState)
                setLoading(false)
                form.resetFields()
            })
    }

    useEffect(() => {
        return loadingContent()
    }, [])

    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 px-0">
                        <AdminPages />
                    </div>
                    <div className="col-12 col-md-9">
                        <h3 className="mt-3 ml-3">Vídeos</h3>
                        <Divider />
                        <div className="container-fluid">
                            <Form {...layout} form={form} onFinish={onSubmit}>
                                <Row>
                                    <Col span={10}>
                                        <label>Nome</label>
                                        <Form.Item
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Campo obrigatório",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <label>Descrição</label>
                                        <Form.Item
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Campo obrigatório",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={20}>
                                        <label>Link</label>
                                        <Form.Item
                                            name="src"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Campo obrigatório",
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Salvar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Divider />
                            <Row>
                                <Col>
                                    <div className="row">
                                        <Table
                                            bordered
                                            loading={loading}
                                            style={{ width: "100%" }}
                                            locale={{
                                                emptyText:
                                                    "Nenhum artigo registrado",
                                            }}
                                            dataSource={videos}
                                            columns={columns()}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminVideos
