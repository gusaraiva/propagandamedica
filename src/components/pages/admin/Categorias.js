import React, { useEffect, useState } from "react"
import AdminPages from "../../admin/AdminPages"
import AdminHeader from "../../layout/AdminHeader"
import firebase from "../../../config/Config"
import { Table, Button, Row, Col, Form, Input, Divider, message } from "antd"
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
}

function Categorias() {
    const [loading, setLoading] = useState(true)
    const [form] = Form.useForm()

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3 px-0">
                        <AdminPages />
                    </div>
                    <div className="col-12 col-md-9">
                        <Row>
                            <Form
                                {...layout}
                                form={form}
                                onFinish={onSubmit}
                            ></Form>
                        </Row>
                        <Divider />
                        <Row>
                            <Table />
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categorias
