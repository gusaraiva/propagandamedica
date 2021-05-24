import React from 'react';
import { Link } from 'react-router-dom';

const MenuAreas = () => {
    return (
        <div className="menu" style={{height: '100%'}}>
            <div className="menu__info mt-3">Áreas: </div>
            <div className="menu__menu-item">
                <Link to="/videos/Ginecologia"><p className="menu__item-name">Ginecologia</p></Link>
            </div>
            <div className="menu__info mt-5">Produtos: </div>
            <div className="menu__menu-item">
                <Link to="/videos/Glizigen"><p className="menu__item-name">Glizigen</p></Link>
            </div>
        </div>
    )
}

export default MenuAreas;