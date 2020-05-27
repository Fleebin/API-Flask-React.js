import React, { Component } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

class Table extends Component {

  state = {
    polos: [],
  }

  async componentDidMount() {
    const response = await api.get('/polos');

   

    this.setState({ polos: response.data })
  }

  render() {

    const { polos } = this.state


    return (

      <div>
        <div className="tableindex">
          <table>
            <tr>
              <th>Nome</th>
            </tr>

            {polos.map(polo => {
              return (
                <tbody key={polo.id}>
                  <tr>
                    <Link to="/resultado">
                      {polo.nome}
                    </Link>

                  </tr>
                </tbody>
                
              )
            })}

      <tfoot>Com 💚 Stone</tfoot>
          </table>
        </div>


      </div>


    )
  }
}
export default Table
