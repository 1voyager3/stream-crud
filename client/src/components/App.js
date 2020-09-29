import React from "react";
import {Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import Header from "./Header";
import history from "../history";



const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    {/*Switch component is going to look at all these different Routes and it is going to show
                    only one of this given Routes for any path we are going to. It uses to avoid
                    duplication of path="/streams/new" and path="/streams/:id" where ":id" is going
                    to be any variable name
                    */}
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new" exact component={StreamCreate} />
                        <Route path="/streams/edit/:id" exact component={StreamEdit} />
                        <Route path="/streams/delete/:id" exact component={StreamDelete} />
                        <Route path="/streams/:id" exact component={StreamShow} />
                    </Switch>
                    </div>
            </Router>
        </div>
    )
}

export default App;

