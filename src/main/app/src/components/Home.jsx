import React, {Component} from 'react';
import axios from "axios";
import {Content} from "./Content";


export class Home extends Component {
    state = {
        data: [],
        conf: [],
        name: ""
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
        console.log(value);
    };

    render() {
        return (
            <div className="row">
                <div className="col-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <div className="list-group">
                                {this.state.data.map(el => (
                                    <button className="list-group-item" data-toggle="list"
                                            onClick={this.handleClick}
                                            key={el.id}>{el.name}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card text-center">
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane fade show active">
                                    <Content children={}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
