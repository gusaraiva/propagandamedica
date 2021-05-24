import React, { useEffect, useState } from "react"
import AdminPages from "./AdminPages"
import AdminHeader from "../layout/AdminHeader"
import firebase from "../../config/Config"
import { Table, Button, Row, Col, Form, Input, Divider, message } from "antd"
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
}

const AdminCategorias = () => {
    const [dockey, setDockey] = useState("")
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm()

    const remove = (doc) => {
        const firestore = firebase.firestore()

        let produtosRequest = firestore
            .collection("categorias")
            .doc(doc)
            .delete()
            .then(() => {
                message.loading("Excluindo...", 2.5).then(() => {
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
                title: "URL Vídeo",
                dataIndex: "video",
                key: "video",
                responsive: ["md"],
            },

            {
                title: "URL Imagem",
                dataIndex: "imagem",
                key: "imagem",
                responsive: ["md"],
            },

            {
                title: "Ações",
                dataIndex: "id",
                render: (key) => {
                    return (
                        <>
                            <Button onClick={() => edit(key)}>Editar</Button>
                            <Button onClick={() => remove(key)}>Excluir</Button>
                        </>
                    )
                },
            },
        ]
    }

    const edit = (doc) =>{
        const firestore = firebase.firestore()
        firestore.collection("categorias")
            .doc(doc)
            .get()
            .then(res => {
                if(res.exists){
                    form.setFieldsValue({
                        name: res.data().name,
                        description: res.data().description,
                        video: res.data().video,
                        imagem: res.data().imagem
                    })
                    setDockey(doc)
                } else {
                    message.error("Erro no banco de dados")
                }
                
            })
    }
  

    const onSubmit = (e) => {
        const firestore = firebase.firestore()
       
        let produtosRequest = dockey != "" ? 
            firestore.collection("categorias").doc(dockey) 
            : firestore.collection("categorias").doc()
        

        produtosRequest
            .set(e)
            .then(() => {
                message.success("salvo com sucesso!")
                loadingContent()
                setDockey("")
            })
            .catch((err) => {
                setDockey("")
                message.error(
                    "Erro no envio de dados por favor tenta mais tarde.",
                )
            })
    }

    const loadingContent = () => {
        const firestore = firebase.firestore()
        const newState = []
        firestore
            .collection("categorias")
            .get()
            .then((querySnapshot) => {
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

                setProdutos(newState)
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
                        <h3 className="mt-3 ml-3">Categorias</h3>
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
                                </Row>

                                <Row>
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
                                    <Col span={10}>
                                        <label>URL Vídeo</label>
                                        <Form.Item
                                            name="video"
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
                                    <Col span={10}>
                                        <label>URL Image</label>
                                        <Form.Item
                                            name="imagem"
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
                                                    "Nenhum produto registrado",
                                            }}
                                            dataSource={produtos}
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

export default AdminCategorias
