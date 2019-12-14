import React, {Component} from 'react';
import axios from "axios";
import {Modal} from "./Modal";


export class Conferences extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        axios.get("http://localhost:8080/allConferences")
            .then(res => {
                // console.log(res.data);
                this.setState({data: res.data})
            })
    }

    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <Modal button_title="Add new conference" modal_title="Create Conferences"/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Seats</th>
                            <th>DateTime</th>
                            <th>Services</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.seats}</td>
                                <td>{el.dateTime}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm">Edit</button>
                                    <button className="btn btn-danger btn-sm">Del</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
