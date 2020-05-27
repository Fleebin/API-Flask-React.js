import React, { Component } from 'react'
import Header from './Header'
import api from '../api'
import { Link } from 'react-router-dom'


class Terminais extends Component {
  state = {
    terminal: [],
  }
  async componentDidMount() {
    const response = await api.get('/listagem/${match.params.id}');

      console.log(response.data)

    this.setState({ terminais: response.data })

  }
  render() {

    const { terminal } = this.state


    return (
      <div>
        <div className="tableindex">
          <table>
            <tr>
              <th>Serial</th>
            </tr>

            {terminal.map(terminal => {
              return (
                <tbody key={terminal.id}>
                  <tr>
                    {terminal.serial}
                  </tr>
                </tbody>
              )
            })}



          </table>

        </div>
        <Link to="/">
          <button>Voltar</button>
        </Link>
        <button>Adcionar</button>

      </div>
    )

  }

}



export default Terminais
