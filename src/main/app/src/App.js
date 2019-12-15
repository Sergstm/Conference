import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Navigation} from "./components/Navigation";
import './App.css';
import {Conferences} from "./components/Conferences";
import {Participants} from "./components/Participants";
import {ConfRooms} from "./components/ConfRooms";
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
                                <li className="nav-item"><Navigation path="/conf" name="Conferences"/></li>
                                <li className="nav-item"><Navigation path="/part" name="Participants"/></li>
                                <li className="nav-item"><Navigation path="/room" name="ConferenceRooms"/></li>
                            </ul>
                        </div>
                        <Switch>
                            <Route path="/" component={Home} exact/>
                            <Route path="/conf" component={Conferences}/>
                            <Route path="/part" component={Participants}/>
                            <Route path="/room" component={ConfRooms}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
