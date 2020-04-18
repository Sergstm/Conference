import React, {Component} from 'react';
import axios from "axios";
import Modal from "react-responsive-modal";


export class Participants extends Component {
    state = {
        data: [],
        status: "",
        modalIsOpen: false
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get("/allParticipants")
            .then(res => {
                this.setState({data: res.data});
            })
    };

    handleDelete = (e) => {
        let id = e.target.value;
        axios.delete("/delParticipant?id=" + id)
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
        let birthDate = e.target.birthDate.value;
        // console.log(name);

        const participant = {
            name: name,
            birthDate: birthDate
        };

        axios.post("/addParticipant", participant)
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
                        Add new participant
                    </button>
                    <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
                        <div className="modal-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Create Participant</h5>
                                </div>
                                <div className="modal-body">
                                    Participant name
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Name</span>
                                        </div>
                                        <input type="text" className="form-control" maxLength="150"
                                               name="name"/>
                                    </div>
                                    Participant birth date
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Birth Date</span>
                                        </div>
                                        <input type="date" className="form-control" name="birthDate"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {(this.state.status !== "saved") ?
                                        <button className="btn btn-primary btn-block">Save</button> :
                                        <button className="btn btn-success btn-block">
                                            Participant saved</button>}
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
                            <th>BirthDate</th>
                            <th>Service</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.birthDate}</td>
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
