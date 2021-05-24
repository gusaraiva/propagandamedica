import React, { useEffect, useState } from 'react';
import AdminPages from './AdminPages';
import AdminHeader from '../layout/AdminHeader';
import firebase from '../../config/Config';
import { Table, Button, Row, Col, Form, Input, Divider, message } from 'antd';
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
};

const AdminArtigos = () => {
    const [artigos, setArtigos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const remove = (doc) => {
        const firestore = firebase.firestore();

        let artigosRequest = firestore
            .collection('artigos')
            .doc(doc)
            .delete()
            .then(() => {
                message.loading('Excluindo...', 2.5).then(() => {
                    message.success('Excluído com sucesso!');
                    loadingContent();
                });
            });
    };

    const columns = () => {
        return [
            {
                title: 'Título',
                dataIndex: 'title',
                key: 'name',
                responsive: ['md'],
            },
            {
                title: 'Subtítulo',
                dataIndex: 'subtitle',
                key: 'age',
                responsive: ['md'],
            },
            {
                title: 'Descrição',
                dataIndex: 'description',
                key: 'address',
                responsive: ['md'],
            },
            {
                title: 'Link',
                dataIndex: 'link',
                key: 'address',
                responsive: ['md'],
            },
            {
                title: 'Ações',
                dataIndex: 'id',
                render: (key) => {
                    return (
                        <>
                            <Button onClick={() => remove(key)}>Excluir</Button>
                        </>
                    );
                },
            },
        ];
    };

    const onSubmit = (e) => {
        const firestore = firebase.firestore();
        let artigosRequest = firestore.collection('artigos').doc();

        artigosRequest
            .set(e)
            .then(() => {
                message
                    .loading('enviando...', 2)
                    .then(() => message.success('cadastrado com sucesso!'));
                loadingContent();
            })
            .catch((err) => {
                message.error(
                    'Erro no envio de dados por favor tenta mais tarde.',
                );
            });
    };

    const loadingContent = () => {
        const firestore = firebase.firestore();
        const newState = [];
        firestore
            .collection('artigos')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        title: doc.data().title,
                        subtitle: doc.data().subtitle,
                        description: doc.data().description,
                        link: doc.data().link,
                    };
                    newState.push(userData);
                });

                setArtigos(newState);
                setLoading(false);
                form.resetFields();
            });
    };

    useEffect(() => {
        return loadingContent();
    }, []);

    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 px-0">
                        <AdminPages />
                    </div>
                    <div className="col-12 col-md-9">
                        <h3 className="mt-3 ml-3">Artigos</h3>
                        <div className="container-fluid">
                            <Form {...layout} form={form} onFinish={onSubmit}>
                                <Row>
                                    <Col span={10}>
                                        <label>Título</label>
                                        <Form.Item
                                            name="title"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Campo obrigatório',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <label>SubTítulo</label>
                                        <Form.Item
                                            name="subtitle"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Campo obrigatório',
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
                                                        'Campo obrigatório',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <label>Link</label>
                                        <Form.Item
                                            name="link"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Campo obrigatório',
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
                                            style={{ width: '100%' }}
                                            locale={{
                                                emptyText:
                                                    'Nenhum artigo registrado',
                                            }}
                                            dataSource={artigos}
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
    );
};

export default AdminArtigos;
