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

const AdminVisitas = () => {
    const [visita, setVisita] = useState([]);
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
                title: 'UF',
                dataIndex: 'uf',
                key: 'uf',
                responsive: ['md'],
            },

            {
                title: 'Data',
                dataIndex: 'requestDate',
                key: 'requestDate',
                responsive: ['md'],
            },
        ];
    };

    const loadingContent = () => {
        const firestore = firebase.firestore();
        const newState = [];
        firestore
            .collection('visits')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    const userData = {
                        id: doc.id,
                        email: doc.data().email,
                        name: doc.data().name,
                        uf: doc.data().uf,
                        requestDate: doc.data().requestDate,
                    };
                    newState.push(userData);
                });
                // newState.sort((a, b) => {
                //     // console.log(a.requestDate.split('/'));
                //     let aa = a.requestDate.split('/').reverse().join();
                //     let bb = b.requestDate.split('/').reverse().join();
                //     return aa > bb ? -1 : aa < bb ? 1 : 0;
                // });
                console.log(newState)
                setVisita(newState);
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
                        <h3 className="mt-3 ml-3">Visitas</h3>
                        <Divider />
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Button
                                    onClick={() =>
                                        exporExcel(visita, 'visitas')
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
                                            dataSource={visita}
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

export default AdminVisitas;
