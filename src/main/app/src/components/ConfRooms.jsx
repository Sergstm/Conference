import React, {Component} from 'react';
import axios from "axios";
import Modal from "react-responsive-modal";


export class ConfRooms extends Component {
    state = {
        data: [],
        status: "",
        modalIsOpen: false
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get("/allConfRooms")
            .then(res => {
                this.setState({data: res.data});
            })
    };

    handleDelete = (e) => {
        let id = e.target.value;
        axios.delete("/delConfRoom?id=" + id)
            .then(res => {
                this.setState({status: res.data});
                this.getData();
            });
    };

    openModal = () => {
        this.setState({modalIsOpen: true,});
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            status: ""
        });
        this.getData();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let seats = e.target.seats.value;
        let location = e.target.location.value;
        // console.log(name);

        const conf_room = {
            name: name,
            location: location,
            seats: seats
        };

        axios.post("/addConfRoom", conf_room)
            .then(res => {
                // console.log(res.data);
                this.setState({status: res.data});
            })
    };

    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <button className="btn btn-success btn-sm btn-block" onClick={this.openModal}>
                        Add new conference room
                    </button>
                    <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
                        <div className="modal-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Create Conference Room</h5>
                                </div>
                                <div className="modal-body">
                                    Conference name
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Name</span>
                                        </div>
                                        <input type="text" className="form-control" maxLength="150"
                                               name="name"/>
                                    </div>
                                    Quantity of seats
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Seats</span>
                                        </div>
                                        <input type="number" className="form-control" name="seats"/>
                                    </div>
                                    Conference room location
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Location</span>
                                        </div>
                                        <input type="text" className="form-control" name="location"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {(this.state.status !== "saved") ?
                                        <button className="btn btn-primary btn-block">Save</button> :
                                        <button className="btn btn-success btn-block">
                                            Conference room saved</button>}
                                    <button type="button" className="btn btn-secondary"
                                            onClick={this.closeModal}>Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Seats</th>
                            <th>Location</th>
                            <th>Service</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.seats}</td>
                                <td>{el.location}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm"
                                            onClick={this.handleDelete} value={el.id}>Delete
                                    </button>
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
