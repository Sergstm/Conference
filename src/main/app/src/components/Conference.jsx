import React, {Component} from 'react';
import axios from "axios";


export class Conference extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        axios.get("http://localhost:8080/allConferences")
            .then(res => {
                console.log(res.data);
                this.setState({data: res.data})
            })
    }


    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Seats</th>
                            <th>DateTime</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.seats}</td>
                                <td>{el.dateTime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
