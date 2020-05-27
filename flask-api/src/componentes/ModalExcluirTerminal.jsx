import React from 'react'
import axios from 'axios'

export default class Terminal extends React.Component {
    state = {
        serial: '',
    }
    handleChange = event => {
        this.setState({ serial: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();

        axios.delete('')
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal">
                    <h1>Excluir Terminal</h1>
                    <label htmlFor="adicionar">Serial</label>
                    <input type="text" onChange={this.handleChange} />
                    <button type="submit">Excluir</button>
                </div>
            </form>

        )
    }
}

