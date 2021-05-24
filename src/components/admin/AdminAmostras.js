import React, { useEffect, useState } from "react"
import AdminPages from "./AdminPages"
import AdminHeader from "../layout/AdminHeader"
import firebase from "../../config/Config"
import { Table, Button, Row, Col, Divider, message } from "antd"
import * as FileServer from "file-saver"
import * as XLSX from "xlsx"

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
}

const AdminAmostras = () => {
    const [amostra, setAmostra] = useState([])
    const [loading, setLoading] = useState(true)

    const exporExcel = (csvData, fileName) => {
        if (!csvData.length) {
            message.info("Por favor selecione um produto.")
            return false
        }

        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        const fileExtension = ".xlsx"
        const ws = XLSX.utils.json_to_sheet(csvData)
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
        const data = new Blob([excelBuffer], { type: fileType })
        FileServer.saveAs(data, fileName + fileExtension)
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
                title: "E-mail",
                dataIndex: "email",
                key: "email",
                responsive: ["md"],
            },
            {
                title: "UF",
                dataIndex: "uf",
                key: "uf",
                responsive: ["md"],
            },

            {
                title: "Produtos",
                dataIndex: "products",
                key: "products",
                responsive: ["md"],
               
            },

            {
                title: "Data",
                dataIndex: "requestDate",
                key: "requestDate",
                responsive: ["md"],
            },
        ]
    }

    const loadingContent = () => {
        const firestore = firebase.firestore()
        const newState = []
        firestore
            .collection("samples")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    let val = doc.data().products

                    const userData = {
                        id: doc.id,
                        email: doc.data().email,
                        name: doc.data().name,
                        uf: doc.data().uf,
                        products: val.map((v) => v).join(","),
                        requestDate: doc.data().requestDate,
                    }
                    newState.push(userData)
                })

                newState.sort((a, b) => {
                    console.log(a.requestDate.split("/"))
                    let aa = a.requestDate.split("/").reverse().join()
                    let bb = b.requestDate.split("/").reverse().join()
                    return aa > bb ? -1 : aa < bb ? 1 : 0
                })

                setAmostra(newState)
                setLoading(false)
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
                        <h3 className="mt-3 ml-3">Amostra</h3>
                        <Divider />
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Button
                                    onClick={() =>
                                        exporExcel(amostra, "amostras")
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
                                            style={{ width: "100%" }}
                                            locale={{
                                                emptyText:
                                                    "Nenhum artigo registrado",
                                            }}
                                            dataSource={amostra}
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

export default AdminAmostras
