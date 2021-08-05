import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScrollToTop from './ScrollToTop'
import { Navigation, Footer } from './components'
import { Tree, Tree2, People, Profile, Sketch, Login, AddPerson, AddRelative } from "./pages"
import './index.scss'

/* import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);  */

function App() {
    return (
        <div className="App">
            <Router>
                <ScrollToTop />
                <Navigation />
                <Switch>
                    <Route path="/" exact component={() => <People />} />
                    <Route path="/tree/:pid" exact component={() => <Tree />} />
                    <Route path="/2" exact component={() => <Tree2 />} />
                    <Route path="/people" exact component={() => <People />} />
                    <Route path="/profile/:pid" exact component={() => <Profile />} />
                    <Route path="/sketch/:pid" exact component={() => <Sketch />} />
                    <Route path="/add" exact component={() => <AddPerson />} />
                    <Route path="/add/:pid" exact component={() => <AddPerson />} />
                    <Route path="/add-relative" exact component={() => <AddRelative />} />
                    <Route path="/add-relative/:pid" exact component={() => <AddRelative />} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}
  
// export default withAuthenticator(App)
export default App