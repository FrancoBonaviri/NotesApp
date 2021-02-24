import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js';



export default class NotesList extends Component {
    state= {
        notes: []
    };


    componentDidMount() {
        this.GetNotes();    
    }


    DeleteNote = async(id) => {
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        this.GetNotes();
    }


    GetNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes');
        this.setState({notes: res.data.notes});
    }



    editNote =  async(id) => {
        window.location.href = `/edit/${id}`;
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => 
                        <div className="col-md-4 p-2" key={note._id}>  
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            <h6>{note.title}</h6>
                                        </div>
                                        <div className="col-2 text-right">
                                            <i className="far fa-times-circle active" onClickCapture={() => this.DeleteNote(note._id)} style={{cursor: "pointer"}}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-12 text-center">
                                            <p className="text-center">{note.content}</p>
                                        </div>
                                    </div>
                                    <div className="row mb-0">
                                        <div className="col-12">
                                            <i className="fas fa-user-circle p-1"></i>
                                            <span className="badge badge-info">{note.author}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer p-3 text-right">
                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <i className="fas fa-edit" style={{cursor: "pointer"}} onClickCapture={() => this.editNote(note._id)}></i>
                                        </div>
                                        <div className="col-6 text-right">
                                            <span className="badge badge-danger">{format(note.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    )
                }
            </div>
        )
    }
}
