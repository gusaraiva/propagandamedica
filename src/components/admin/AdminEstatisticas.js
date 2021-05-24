import React, { useEffect, useState } from 'react';
import AdminPages from './AdminPages';
import AdminHeader from '../layout/AdminHeader';
import firebase from '../../config/Config';
import { Table, Button, Row, Col, Form, Input, Divider, message } from 'antd';
import * as FileServer from 'file-saver';
import * as XLSX from 'xlsx';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
};

const AdminEstatistica = () => {
    const [view, setView] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const exporExcel = (csvData, fileName) => {
        if (!csvData.length) {
            message.info('Por favor selecione um produto.');
            return false;
        }

        const fileType =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileServer.saveAs(data, fileName + fileExtension);
    };

    const columns = () => {
        return [
            {
                title: 'Nome',
                dataIndex: 'name',
                key: 'name',
                responsive: ['md'],
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
                responsive: ['md'],
            },
            {
                title: 'Vídeo',
                dataIndex: 'videoId',
                key: 'videoId',
                responsive: ['md'],
                render: (link) => {
                    return (
                        <video preload="metadata" style={{ width: '100px' }}>
                            <source src={link + '#t=15'} type="video/mp4" />
                        </video>
                    );
                },
            },
            {
                title: 'Vídeo Título',
                dataIndex: 'videoTitle',
                key: 'videoTitle',
                responsive: ['md'],
            },

            {
                title: 'Data/hora',
                dataIndex: 'watchDate',
                key: 'watchDate',
                responsive: ['md'],
            },
        ];
    };

    const loadingContent = () => {
        const firestore = firebase.firestore();
        const newState = [];
        firestore
            .collection('views')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        email: doc.data().email,
                        name: doc.data().name,
                        videoId: doc.data().videoId,
                        videoTitle: doc.data().videoTitle,
                        watchDate: doc.data().watchDate,
                    };
                    newState.push(userData);
                });

                newState.sort((a, b) => {
                    console.log(a.watchDate.split('/'));
                    let aa = a.watchDate.split('/').reverse().join();
                    let bb = b.watchDate.split('/').reverse().join();
                    return aa > bb ? -1 : aa < bb ? 1 : 0;
                });

                setView(newState);
                setLoading(false);
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
                        <h3 className="mt-3 ml-3">Estatísticas</h3>
                        <Divider />
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Button
                                    onClick={() =>
                                        exporExcel(view, 'estatisticas')
                                    }
                                >
                                    Exportar Excel
                                </Button>
                            </Col>
                        </Row>
                        <div className="container-fluid">
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
                                            dataSource={view}
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

export default AdminEstatistica;
