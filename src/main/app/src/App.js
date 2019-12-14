import React from 'react';
import './App.css';
import {Conference} from "./components/Conference";
import {Participant} from "./components/Participant";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Navigation} from "./components/Navigation";
import {ConfRoom} from "./components/ConfRoom";
import {Home} from "./components/Home";

function App() {
    return (
        <BrowserRouter>
            <div className="container-fluid wrap">
                <div className="row">
                    <div className="col">
                        <div className="card-body">
                            <ul className="nav justify-content-end">
                                <li className="nav-item"><Navigation path="/" name="Home"/></li>
                                <li className="nav-item"><Navigation path="/conf" name="Conference"/></li>
                                <li className="nav-item"><Navigation path="/part" name="Participant"/></li>
                                <li className="nav-item"><Navigation path="/room" name="ConferenceRoom"/></li>
                            </ul>
                        </div>
                        <Switch>
                            <Route path="/" component={Home} exact/>
                            <Route path="/conf" component={Conference}/>
                            <Route path="/part" component={Participant}/>
                            <Route path="/room" component={ConfRoom}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
