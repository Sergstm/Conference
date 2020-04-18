import React, {Component} from 'react';
import axios from "axios";
import Modal from "react-responsive-modal";


export class Home extends Component {
    state = {
        confs: [],
        rooms: [],
        parts: "",
        part: "",
        conf: "",
        conf_id: "",
        status: "",
        modalIsOpen: false
    };

    componentDidMount() {
        this.getConferences();
        this.getParticipants();
    }

    openModal = () => {
        this.setState({modalIsOpen: true,});
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            status: ""
        });
        this.getConference(this.state.conf_id);
    };

    getConferences = () => {
        axios.get("/allConferences")
            .then(res => {
                // console.log(res.data);
                this.setState({confs: res.data});
            })
    };

    getParticipants = () => {
        axios.get("/allParticipants")
            .then(res => {
                // console.log(res.data);
                this.setState({parts: res.data});
            })
    };

    getParticipant = (val) => {
        axios.get("/getParticipant?id=" + val)
            .then(res => {
                // console.log(res.data);
                this.setState({part: res.data})
            })
    };

    getConference = (value) => {
        axios.get("/getConference?id=" + value)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    conf: res.data,
                    rooms: res.data.confRooms
                })
            })
    };

    handleGetConference = (e) => {
        let value = e.target.value;
        this.setState({conf_id: value});
        this.getConference(value);
    };

    handlePartSelectChange = (e) => {
        this.getParticipant(e.target.value);
    };

    handlePartDelete = (e) => {
        let partId = e.target.value;
        let confId = this.state.conf_id;
        axios.delete("/delPartFromConf?partId=" + partId + "&confId=" + confId)
            .then(res => {
                this.setState({status: res.data});
                this.getConference(this.state.conf_id);
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.part) {
            axios.put("/addPartToConf?id=" + this.state.conf_id, this.state.part)
                .then(res => {
                    // console.log(res.data);
                    this.setState({status: res.data});
                })
        }
    };

    render() {
        // if (this.state.conf.participants) {
        //     console.log(this.state.conf.participants.length);
        //     console.log(this.state.conf.confRooms);
        // }
        return (
            <div className="row">
                <div className="col-4">
                    <div className="card text-center">
                        <div className="card-header">Available conferences</div>
                        <div className="card-body">
                            <div className="list-group">
                                {this.state.confs.map(el => (
                                    <button className="list-group-item" data-toggle="list" value={el.id}
                                            key={el.id} onClick={this.handleGetConference}>{el.name}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    {/*Modal*/}
                    <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
                        <div className="modal-content">
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Participants</h5>
                                </div>
                                <div className="modal-body">
                                    Participants
                                    <div className="input-group input-group-sm mb-1">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Participants</span>
                                        </div>
                                        <select className="form-control custom-select" name="part"
                                                onChange={this.handlePartSelectChange}>
                                            <option value="0">Select participant</option>
                                            {this.state.parts ? this.state.parts.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>)) : ""
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {(this.state.status !== "saved") ?
                                        <button className="btn btn-primary btn-block">Save</button> :
                                        <button className="btn btn-success btn-block">
                                            Conference updated</button>}
                                    <button type="button" className="btn btn-secondary"
                                            onClick={this.closeModal}>Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                    {/*Content*/}
                    <div className="card text-center">
                        <div className="card-body">
                            {this.state.conf.length !== 0 ? (
                                <div className="card">
                                    <h3 className="card-header">{this.state.conf.name}</h3>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Params</th>
                                                <th>Description</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th>Time</th>
                                                <td>{this.state.conf.dateTime}</td>
                                            </tr>
                                            <tr>
                                                <th>Rooms</th>
                                                {this.state.conf.confRooms.map(c => (
                                                    <td key={c.id}>
                                                        <span>{c.name}___Seats: {c.seats}</span>
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th>Participants</th>
                                                <td>
                                                    {this.state.conf.participants.map(e => (
                                                        <div key={e.id}>
                                                            <span>{e.name}</span>
                                                            <button className="btn btn-danger btn-sm"
                                                                    value={e.id}
                                                                    onClick={this.handlePartDelete}>X
                                                            </button>
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Available free place</th>
                                                <td>
                                                    {this.state.conf.confRooms.map(r => (
                                                        <div key={r.id}>
                                                            {r.seats - this.state.conf.participants.length}
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        {this.state.conf.confRooms.map(r => (
                                            <span key={r.id}>
                                            {(r.seats - this.state.conf.participants.length) > 0 ?
                                                <button className="btn btn-success btn-sm btn-block"
                                                        onClick={this.openModal}>Add participants
                                                </button> :
                                                <button className="btn btn-warning btn-sm btn-block">
                                                    Conference room is Full
                                                </button>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : <h4>Choose conference</h4>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
