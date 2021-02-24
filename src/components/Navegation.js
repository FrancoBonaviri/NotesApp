import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navegation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container">
              <Link className="navbar-brand" to="/" >Notes App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link className="nav-link active" to="/" >Notes</Link>
                        <Link className="nav-link active" to="/create" >Create Note</Link>
                        <Link className="nav-link active" to="/user" >Create User</Link>
                    </div>
                </div>    
              </div>
            </nav>
        )
    }
}
