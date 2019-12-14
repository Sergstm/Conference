import React, {Component} from 'react';
import axios from "axios";
import {Modal} from "./Modal";


export class Participant extends Component {
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
                    <Modal button_title="Add new participant" modal_title="Create participant"/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>BirthDate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.birthDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
