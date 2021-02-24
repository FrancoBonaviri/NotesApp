import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import request from 'request';




export default class CreateNote extends Component {


    state= {
        editing: false,
        idReceived: '',
        users: [],
        userSelected: '',
        date: new Date(),
        content: '',
        title: '',
    };

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users:  res.data.Users});
        this.setState({userSelected: res.data.Users[0].username})


        if(this.props.match.params.id) {
            const res = await axios.get(`http://localhost:4000/api/notes/${this.props.match.params.id}`)
            const note = res.data.note;
            this.setState({
                editing: true,
                idReceived: this.props.match.params.id,
                userSelected: note.author,
                date: new Date(note.date),
                title: note.title,
                content: note.content
            });
            console.log(this.state);
        }
    }
    
    
    Save = async(e) => {
        e.preventDefault();
        
        const note = {
            content: this.state.content,
            title: this.state.title,
            author: this.state.userSelected,
            date: this.state.date
        }

        if(this.state.editing){
            await axios.put(`http://localhost:4000/api/notes/${this.state.idReceived}`, note);

        } else {

            const resp = await axios.post('http://localhost:4000/api/notes', note );
        
        }
        window.location.href = '/';
        
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onchangeDate = (date) => {
        this.setState({date});
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>


                    <form onSubmit={this.Save}>
                        {/* SELECT USER */}
                        <div className="form-group">
                            <select value={this.state.author} className="form-control" name="userSelected" onChange={this.onInputChange}>
                                {
                                    this.state.users.map(user => 
                                        <option key={user._id} value={user.username}>
                                            {user.username}
                                        </option>    
                                    )
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <input value={this.state.title} type="text" className="form-control" placeholder="Title" name="title" required onChange={this.onInputChange}/>
                        </div>
                        <div className="form-group">
                            <textarea value={this.state.content} name="content" className="form-control" placeholder="Content" onChange={this.onInputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onchangeDate}/>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
