import React, { useEffect, useState } from "react"
import AdminPages from "./AdminPages"
import AdminHeader from "../layout/AdminHeader"
import firebase from "../../config/Config"
import { Table, Button, Row, Col, Form, Input, Divider, message, Select } from "antd"
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
}

const AdminEnfermidades = () => {
    const [dockey, setDockey] = useState("")
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm()

    const remove = (doc) => {
        const firestore = firebase.firestore()

        let produtosRequest = firestore
            .collection("enfermidades")
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
                title: "Categoria",
                dataIndex: "cat_id",
                key: "cat_id",
                responsive: ["md"],
                render: (result) => {

                   
                    let categoria = categorias.filter(c => {
                        return c.id == result
                    })
                    
                        
                    return categoria[0].name


                }
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
        firestore.collection("enfermidades")
            .doc(doc)
            .get()
            .then(res => {
                if(res.exists){
                    form.setFieldsValue({
                        name: res.data().name,
                        cat_id: res.data().cat_id,

                    })
                    setDockey(doc)
                } else {
                    message.error("Erro no banco de dados")
                }
                
            })
    }

    const clear = () => {
        setDockey()
        form.resetFields()
    }
  

    const onSubmit = (e) => {
        const firestore = firebase.firestore()
       
        let produtosRequest = dockey != "" ? 
            firestore.collection("enfermidades").doc(dockey) 
            : firestore.collection("enfermidades").doc()
        

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
       
        firestore
            .collection("categorias")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        name: doc.data().name,
                    }
                    cat.push(userData)
                })

                setCategorias(cat)
                setLoading(false)
                form.resetFields()
            })

        const newState = []
        firestore
            .collection("enfermidades")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        cat_id: doc.data().cat_id,
                        name: doc.data().name,

                    }
                    newState.push(userData)
                })

                setProdutos(newState)
                setLoading(false)
                form.resetFields()
            })
        const cat = []
    
    }
    const { Option } = Select

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
                        <h3 className="mt-3 ml-3">Enfermidades</h3>
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
                                            name="cat_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Campo obrigatório",
                                                },
                                            ]}
                                        >
                                            <Select  style={{ width: 120 }} >
                                                {categorias.map(v => (
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
                                  
                                        <Button
                                            type="default"
                                            style={{ marginLeft: "20px" }}
                                            onClick={() =>
                                                clear()
                                            }
                                        >
                                            Limpar
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

export default AdminEnfermidades
