import React from 'react';
// Importando os componentes customizados
import { Logo, HeaderContainer } from './styles';

import Icone from '../../assets/icone.png';

function Header(props) {
    return (
        // <> é um 'fragment' utilizado para agrupar componentes/elementos
        // pois só posso retornar apenas um único elemento
        <>
            <HeaderContainer>
                <Logo src={Icone} alt='Pitu - Encurtador de URL' />
                <h1>Pitu</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    )
}

export default Header;