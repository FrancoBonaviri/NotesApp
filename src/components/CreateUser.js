import React, { Component } from 'react'
import axios from 'axios';


export default class CreateUser extends Component {
    state = {
        users: [],
        username:  ''
    }

    //Se ejeuta justo cuaddo se renderiza el componente
    async componentDidMount() {
        this.getUsers();
    };

    onChangeUserName = (e) => {
        this.setState({username: e.target.value});
    };

    onSubmit = async (e) => {
        e.preventDefault();
        if(this.state.username.trim === '' || this.state.username === '' ) {
            document.querySelector('#inputNombre').classList.add('is-invalid');
        }
        else {
            const resp = await axios.post('http://localhost:4000/api/users', {
                username: this.state.username
            });
            this.getUsers();
            this.setState({username: ''});
            document.querySelector('#inputNombre').classList.remove('is-invalid');
        }
    };

    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();
    }

    getUsers = async() => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users:  res.data.Users});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">

                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit} >
                            <div className="form-group">
                                <input type="text" 
                                    id="inputNombre"
                                    className="form-control"
                                    value={this.state.username} 
                                    onChange={this.onChangeUserName}/>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>

                </div>

                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            //Foreach en los usuarios
                            this.state.users.map(user => 
                                <li className="list-group-item list-group-item-action" key={user._id}>
                                    <div className="row">
                                        <div className="col-8">
                                            {user.username}
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="far fa-times-circle active" onClickCapture={() => this.deleteUser(user._id)} style={{cursor: "pointer"}}></i>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
