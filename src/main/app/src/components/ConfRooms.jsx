import React, {Component} from 'react';
import axios from "axios";
import {ModalWin} from "./ModalWin";


export class ConfRooms extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        axios.get("http://localhost:8080/allConfRooms")
            .then(res => {
                // console.log(res.data);
                this.setState({data: res.data})
            })
    }

    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <ModalWin button_title="Add new conference room" modal_title="Create conference room"/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Seats</th>
                            <th>Location</th>
                            <th>Services</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.seats}</td>
                                <td>{el.location}</td>
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
