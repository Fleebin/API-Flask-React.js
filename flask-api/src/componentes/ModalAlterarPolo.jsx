import React from 'react'

export default () =>{
    
    
    return(
        <div className="modal">
            <h1>Alterar Polo</h1>
            <label htmlFor="alterarNome">Nome</label>
            <input type="text" id="alterarNome"/>
            <label htmlFor="alterarTerminal">Terminais</label>
            <input type="text" id="alterarTerminal"/>
            <button>Alterar</button>
        </div>
        
    )
}