import React from 'react';
import {Conference} from "./Conference";


export const Modal = ({button_title, modal_title}) => {
    return (
        <div>
            <button className="btn btn-success btn-sm btn-block" data-toggle="modal" data-target="#modal">
                {button_title}
            </button>

            <div className="modal fade" id="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modal_title}</h5>
                        </div>
                        <div className="modal-body">
                            <Conference/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
