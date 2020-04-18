import React, {Component} from 'react';
import axios from "axios";
import Modal from "react-responsive-modal";


export class Conferences extends Component {
    state = {
        confs: [],
        rooms: [],
        room: [],
        status: "",
        modalIsOpen: false
    };

    componentDidMount() {
        this.getConferences();
        this.getConfRooms();
    }

    openModal = () => {
        this.setState({modalIsOpen: true,});
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            status: ""
        });
        this.getConferences();
    };

    getConferences = () => {
        axios.get("/allConferences")
            .then(res => {
                // console.log(res.data);
                this.setState({confs: res.data});
            })
    };

    getConfRooms = () => {
        axios.get("/allConfRooms")
            .then(res => {
                // console.log(res.data);
                this.setState({rooms: res.data});
            })
    };

    getConfRoom = (val) => {
        axios.get("/getConfRoom?id=" + val)
            .then(res => {
                // console.log(res.data);
                this.setState({room: res.data})
            })
    };

    handleDelete = (e) => {
        let id = e.target.value;
        axios.delete("/delConference?id=" + id)
            .then(res => {
                this.setState({status: res.data});
                this.getConferences();
            });
    };

    handleRoomSelectChange = (e) => {
        this.getConfRoom(e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const conference = {
            name: e.target.name.value,
            confRooms: [this.state.room],
            dateTime: e.target.dateTime.value
        };

        axios.post("/addConference", conference)
            .then(res => {
                // console.log(res.data);
                this.setState({status: res.data});
            });
    };

    render() {
        return (
            <div className="card text-center">
                <div className="card-body">
                    <button className="btn btn-success btn-sm btn-block" onClick={this.openModal}>
                        Add new conference
                    </button>
                    <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
                        <div className="modal-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Create Conference</h5>
                                </div>
                                <div className="modal-body">
                                    Conference name
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Name</span>
                                        </div>
                                        <input type="text" className="form-control"
                                               maxLength="150" name="name"/>
                                    </div>
                                    Rooms
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Rooms</span>
                                        </div>
                                        <select className="form-control custom-select" name="room"
                                                onChange={this.handleRoomSelectChange}>
                                            <option value="0">Select conference room</option>
                                            {this.state.rooms ? this.state.rooms.map(r => (
                                                <option key={r.id} value={r.id}>{r.name}</option>)) : ""
                                            }
                                        </select>
                                    </div>
                                    Conference date time
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Date Time</span>
                                        </div>
                                        <input type="datetime-local" className="form-control"
                                               name="dateTime"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {(this.state.status !== "saved") ?
                                        <button className="btn btn-primary btn-block">Save</button> :
                                        <button className="btn btn-success btn-block">
                                            Conference saved</button>}
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
                            <th>DateTime</th>
                            <th>ConfRooms</th>
                            <th>Participants</th>
                            <th>Service</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.confs.map(el => (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.dateTime}</td>
                                <td>{el.confRooms.map(c => (<div key={c.id}>{c.name}</div>))}</td>
                                <td>{el.participants.map(p => (<div key={p.id}>{p.name}</div>))}
                                </td>
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
