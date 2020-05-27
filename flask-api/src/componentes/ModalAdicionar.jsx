import React from 'react'
import axios from 'axios';

export default class Terminal extends React.Component {
    state = {
        serial: '',
    }
    handleChange = event => {
        this.setState({ serial: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault()

        const terminal = {
            serial: this.state.serial
        }

        axios.post('', { terminal })
            .then(res => {
                console.log(res)
                console.log(res.data)
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <div className="modal">
                    <div className="content">
                        <h1>Adicionar Terminal</h1>
                        <label htmlFor="adicionarNome">Nome do Polo
                    <input type="text" onChange={this.handleChange} />
                        </label>
                        <label htmlFor="adicionarTerminal">Serial
                    <input type="text" onChange={this.handleChange} />
                        </label>
                        <button type="submit" >Adicionar</button>
                    </div>
                </div>
            </form>

        )
    }
}



