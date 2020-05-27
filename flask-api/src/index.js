import React from 'react'
import ReactDOM from 'react-dom'
import App from './componentes/App'
import Resultado from './componentes/Resultado'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App}/>
            <Route path="/resultado/:id" component={Resultado}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'))

