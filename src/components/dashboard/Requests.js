import React, { Fragment, Component } from "react"
import Header from "../layout/header"
import MenuAreas from "../types/areas"
import ArticlesRequest from "../dashboard/ArticlesRequest"
import firebase from "../../config/Config"
import { message, Form, Row, Col } from "antd"

class Request extends Component {
    state = {
        data: "",
        products: [],
        produtos: [],
        lastSelectedItem: null
    };

    async componentDidMount() {

        const firestore = firebase.firestore()
        const db = firestore.collection("produtos")
        const getCat = await db.get()    
        const produto = getCat.docs.map(v => {
            const dados = v.data()
            dados.id = v.id
            return dados
        })  

        this.setState({
            produtos: produto
        })

    }
    onChangeDate = (e) => {
        console.log(e.target.value)
        this.setState({
            data: e.target.value,
        })
    };

    getNextValue(value) {
        const {  products } = this.state
        const hasBeenSelected = !products.includes(value)
        

        // if it's already in there, remove it, otherwise append it
        return products.includes(value)
            ? products.filter(item => item !== value)
            : [...products, value]
    }

    checkedProducts = (event) => {

        const { value } = event.target
        const { products } = this.state
        // const nextValue = this.getNextValue(value)
        // this.setState({ products: nextValue, lastSelectedItem: value })
        let checkbox = document.getElementsByName("produtos")

        
        let selected = []

        for (let i=0; i<checkbox.length; i++) {
            if (checkbox[i].checked) {
                selected.push(checkbox[i].value)
            }
        }
        this.setState({ products : selected }, () =>{
            console.log(this.state)
        })
       
    };

    visitRequestHandler = (e) => {
        e.preventDefault()

        if (this.state.data === "") {
            message.error("Por favor selecione uma data(dd/mm/YYYY).")
            return false
        }
        const firestore = firebase.firestore()
        let visitRequest = firestore.collection("visits").doc()
        let currentDate = this.state.data

        visitRequest
            .set({
                email: this.props.User.email,
                name: this.props.User.name,
                uf: this.props.User.uf,
                uid: this.props.User.uid,
                requestDate: currentDate.split("-").reverse(),
                // requestDate: `${currentDate.getDate()}/${
                //     currentDate.getMonth() + 1
                // }/${currentDate.getFullYear()}`,
            })
            .catch((err) => {
                message.error(
                    "Erro no envio de dados por favor tenta mais tarde.",
                )
            })

        message
            .loading("Enviando solicitação", 2, 5)
            .then(() => message.success("Solicitação enviada com sucesso"))
    };

    productSampleRequest = (e) => {
        e.preventDefault()
        const { products } = this.state
        if (products.length == 0) {
            message.error("Por favor selecione um produto")
            return false
        }

        const firestore = firebase.firestore()
        let visitRequest = firestore.collection("samples").doc()
        let currentDate = new Date()

        visitRequest
            .set({
                email: this.props.User.email,
                name: this.props.User.name,
                uf: this.props.User.uf,
                uid: this.props.User.uid,
                requestDate: `${currentDate.getDate()}/${
                    currentDate.getMonth() + 1
                }/${currentDate.getFullYear()}`,
                products: this.state.products,
            })
            .catch((err) => {
                console.log(err)
            })

        message
            .loading("Enviando solicitação", 2, 5)
            .then(() => message.success("Solicitação enviada com sucesso"))
        this.setState({ products: [] })
    };

    render() {
        const { products } = this.state
        return (
            <Fragment>
                <Header User={this.props.User} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-3 px-0">
                            <MenuAreas />
                        </div>
                        <div className="col-12 col-md-9">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="mt-5">Solicitações</h3>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12 col-md-6 mt-3">
                                            <h6 className="text-center">
                                                Quer tirar dúvidas, conhecer os
                                                produtos e receber uma visita de
                                                nossos representantes?
                                            </h6>
                                         
                                            <input
                                                name="data"
                                                type="date"
                                                onChange={(e) =>
                                                    this.onChangeDate(e)
                                                }
                                                className="form-control mt-1"
                                            ></input>
                                               <button
                                                className="btn btn-primary btn-lg w-100 mt-3"
                                                onClick={
                                                    this.visitRequestHandler
                                                }
                                            >
                                                Solicitar visita do
                                                representante
                                            </button>
                                        </div>
                                        <div className="col-12 col-md-6 mt-3">
                                            <h6>
                                                Escolha abaixo os produtos que
                                                você deseja receber amostras
                                            </h6>
                                            
                                            <div className="form-check form-check-inline">
                                                <Row gutter={20}>
                                                    {this.state.produtos.map((v, i) =>(

                                                        <Col> 
                                                   
                                                            <input
                                                                type="checkbox"
                                                                key={i}
                                                                name="produtos"
                                                                value={v.name}
                                                                onChange={
                                                                    this.checkedProducts
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"

                                                            >
                                                                {v.name}
                                                            </label></Col> 
                                                    ))}
                                                </Row>
                                            </div>

                                            <button
                                                onClick={
                                                    this.productSampleRequest
                                                }
                                                className="btn btn-info btn-lg w-100 mt-2"
                                            >
                                                Solicitar amostra do produto
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <hr />
                                            <h5 className="mt-3">
                                                Artigos Científicos:
                                            </h5>
                                        </div>
                                        <ArticlesRequest />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Request
