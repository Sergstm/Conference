import React, {Component} from 'react';
import axios from "axios";
import {ModalWin} from "./ModalWin";


export class Participants extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        axios.get("http://localhost:8080/allParticipants")
            .then(res => {
                // console.log(res.data);
                this.setState({data: res.data})
            })
    }

    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <ModalWin button_title="Add new participant" modal_title="Create participant"/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>BirthDate</th>
                            <th>Services</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.birthDate}</td>
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
