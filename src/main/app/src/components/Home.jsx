import React, {Component} from 'react';
import axios from "axios";
import {Content} from "./Content";


export class Home extends Component {
    state = {
        data: [],
        conf: []
    };

    componentDidMount() {
        this.getData("allConferences");
    }

    getData = (path) => {
        axios.get("http://localhost:8080/" + path)
            .then(res => {
                // console.log(res.data);
                this.setState({data: res.data})
            })
    };

    handleClick = (e) => {
        let value = e.target.value;
        axios.get("http://localhost:8080/getConference?name=" + value)
            .then(res => {
                // console.log(res.data);
                this.setState({conf: res.data})
            })
    };

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div className="card text-center">
                        <div className="card-header">Available conferences</div>
                        <div className="card-body">
                            <div className="list-group">
                                {this.state.data.map(el => (
                                    <button className="list-group-item" data-toggle="list" value={el.name}
                                            key={el.id} onClick={this.handleClick}>{el.name}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card text-center">
                        <div className="card-body">
                            {this.state.conf.length !== 0 ?
                                <Content conf={this.state.conf}/> : "Choose conference"}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
