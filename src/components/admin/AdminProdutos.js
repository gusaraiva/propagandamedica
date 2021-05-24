import React, { useEffect, useState } from "react"
import AdminPages from "./AdminPages"
import AdminHeader from "../layout/AdminHeader"
import firebase from "../../config/Config"
import { Table, Button, Row, Col, Form, Input, Divider, message, Select } from "antd"
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
}

const AdminProdutos = () => {
    const [produtos, setProdutos] = useState([])
    const [enfermidade, setEnfermidades] = useState([])
    const [loading, setLoading] = useState(true)
    const [dockey, setDockey] = useState("")
    const [form] = Form.useForm()

    const remove = (doc) => {
        const firestore = firebase.firestore()

        let produtosRequest = firestore
            .collection("produtos")
            .doc(doc)
            .delete()
            .then(() => {
                message.loading("Excluindo...", 2.5).then(() => {
                    message.success("Excluído com sucesso!")
                    loadingContent()
                })
            })
    }

    const edit = (doc) =>{
        const firestore = firebase.firestore()
        firestore.collection("produtos")
            .doc(doc)
            .get()
            .then(res => {
                if(res.exists){
                    form.setFieldsValue({
                        name: res.data().name,
                        enf_id: res.data().enf_id,

                    })
                    setDockey(doc)
                } else {
                    message.error("Erro no banco de dados")
                }
                
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
                title: "Enfermidade",
                dataIndex: "enf_id",
                key: "enf_id",
                responsive: ["md"],
                render: (doc) => {
                    let enfer = enfermidade.filter(e => {
                        return e.id === doc
                    })

                    if(enfer.length){
                        return enfer[0].name
                    }
                }
            },

            {
                title: "Ações",
                dataIndex: "id",
                render: (key) => {
                    return (
                        <>
                            <Button onClick={() => remove(key)}>Excluir</Button>
                            <Button onClick={() => edit(key)}>Editar</Button>
                        </>
                    )
                },
            },
        ]
    }

    const onSubmit = (e) => {
        const firestore = firebase.firestore()
        let produtosRequest = dockey != "" ? 
            firestore.collection("produtos").doc(dockey) 
            : firestore.collection("produtos").doc()
        

        produtosRequest
            .set(e)
            .then(() => {
                message
                    .loading("enviando...", 2)
                    .then(() => message.success("cadastrado com sucesso!"))
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
        const addEnf =  []
        firestore
            .collection("enfermidades")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        name: doc.data().name,
                        cat_id: doc.data().enf_id,
                    }
                    addEnf.push(userData)
                })

                setEnfermidades(addEnf)
            })
        const newState = []
        firestore
            .collection("produtos")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        name: doc.data().name,
                        enf_id: doc.data().enf_id,
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

    const { Option } = Select

    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 px-0">
                        <AdminPages />
                    </div>
                    <div className="col-12 col-md-9">
                        <h3 className="mt-3 ml-3">Produtos</h3>
                        <div className="container-fluid">
                            <Form {...layout} form={form} onFinish={onSubmit}>
                                <Row>
                                    <Col span={6}>
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
                                        <label>Enfermidade</label>
                                        <Form.Item
                                            name="enf_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Campo obrigatório",
                                                },
                                            ]}
                                        >
                                            <Select  style={{ width: 120 }} >
                                                {enfermidade.map(v => (
                                                    <Option value={v.id}>{v.name}</Option>
                                                ))}
                                            </Select>
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

export default AdminProdutos
