
import { Link } from 'react-router-dom'
import { Logout } from '../../services'

import React, { Component } from 'react'

export default class NavBar extends Component {

    state = {
        user: null,
    }

    componentWillReceiveProps = ({ user }) => {
        this.setState({ user });
    }

    componentDidMount = () => {
        const { user } = this.props
        this.setState({ user })
    }

    signOut = (e) => {
        e.preventDefault();
        Logout()
        window.location = "/";
    }


   
    render() {
        const { user } = this.state

        
        return (
            <div>
                <header className="header">
                    <div className="container-fluid">
                        <nav className="navbar navbar-default">
                            <div className="container">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                    <a className="navbar-brand" href="index-2.html">Teckline Ticket</a>
                                </div>
                                <div className="navbar-collapse collapse navbar-responsive-collapse">

                                    <ul className="nav navbar-nav navbar-right">
                                        <li><Link to="/">Home</Link></li>
                                        { !user &&
                                            <>
                                                <li><Link to="/register">Register</Link></li>
                                                <li><Link to="/login">Login</Link></li>
                                            </>
                                        }
                                        { user && 
                                            <>
                                            {user.userType && <li><Link to="/dashboard">Admin Dashboard</Link></li>}
                                                <li><Link to="/create-ticket">Raise Ticket</Link></li>
                                                <li><Link to="/dashboard" onClick={this.signOut}>Logout</Link></li>
                                            </>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>{/* end container */}
                </header>
            </div>
        )
    }
}
