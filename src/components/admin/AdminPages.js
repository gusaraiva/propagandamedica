import React from "react"
import { Link } from "react-router-dom"

const MenuAreas = () => {
    return (
        <div className="menu-admin text-center text-dark">
            <div className="mt-1"></div>
            <Link to="/admin">
                <div className="menu-admin__info">
                    <span className="ml-5">Painel</span>
                </div>
            </Link>
            <Link to="/admin/categorias">
                <div className="menu-admin__info">
                    <span className="ml-5">Categorias</span>
                </div>
            </Link>
            <Link to="/admin/enfermidades">
                <div className="menu-admin__info">
                    <span className="ml-5">Enfermidades</span>
                </div>
            </Link>
            <Link to="/admin/produtos">
                <div className="menu-admin__info">
                    <span className="ml-5">Produtos</span>
                </div>
            </Link>
            <Link to="/admin/videos">
                <div className="menu-admin__info">
                    <span className="ml-5">Vídeos</span>
                </div>
            </Link>
            <Link to="/admin/amostras">
                <div className="menu-admin__info">
                    <span className="ml-5">Amostras</span>
                </div>
            </Link>
            <Link to="/admin/visitas">
                <div className="menu-admin__info">
                    <span className="ml-5">Visitas</span>
                </div>
            </Link>
            <Link to="/admin/artigos">
                <div className="menu-admin__info">
                    <span className="ml-5">Artigos</span>
                </div>
            </Link>
            <Link to="/admin/estatistica">
                <div className="menu-admin__info">
                    <span className="ml-5">Estatísticas</span>
                </div>
            </Link>
            {/* <div className="menu-admin__info"><span className="ml-5">Nova Propaganda</span></div>
            <div className="menu-admin__info"><span className="ml-5">Configurações</span></div> */}
        </div>
    )
}

export default MenuAreas
