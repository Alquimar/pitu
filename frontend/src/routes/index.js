import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RedirectPage from '../pages/RedirectPages';
import StatsPage from '../pages/StatsPage';
import NotFoundPage from '../pages/NotFoundPage';

// Função responsável por retornar uma instância do BrowserRouter
// que contém um Switch, que por usa vez, contém todas as rotas
// navegáveis da aplicação
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* propriedade 'exact' é um booleano (default true) que quando utilizado
                informa ao react router dom para resolver a url somente quando o valor for
                exatamente igual ao configurado no 'path' */}
                <Route exact path="/" component={HomePage} />
                <Route exact path="/:code" component={RedirectPage} />
                <Route exact path="/:code/stats" component={StatsPage} />
                {/* Qualquer coisa diferente das rotas definidas acima
                vai cair no NotFound, que informa que a paǵina não foi encontrada */}
                <Route exact path="/*" component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;