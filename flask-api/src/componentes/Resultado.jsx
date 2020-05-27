import React from 'react'
import Header from './Header'
import ModalAdicionar from './ModalAdicionar'
import ModalTransferir from './ModalTransferir'
import ModalAlterar from './ModalAlterarPolo'
import ModalExcluir from './ModalExcluirTerminal'
import TabelaResultado from './ListagemResultado'
import App from '../App.css'

export default () => {



    return (
        <div>

            <Header />
            <TabelaResultado />
            {/*<ModalTransferir/>
            <ModalAlterar/>
            <ModalExcluir/>
            <ModalAdicionar/>*/}
            

        </div>
    )
}
