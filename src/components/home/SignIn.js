import React, { Component } from 'react'
import { signIn, getToken } from '../../services'

export default class SignIn extends Component {

    state = { 
        email: '',
        password: '',
        isLoading: false,
        message: null,
    }

    componentDidMount = () => {
        const token = getToken();
        if (token) window.location = "/";
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        this.setState({ isLoading: true })

        signIn({email, password}, response => {
            const { result } = response
            if (result && !result.status) {
                this.setState({ message: result.message, isLoading: false })
            } else if (result) {
                this.setState({ message: result.message, isLoading: false })
                window.location = "/";
            }
        });
    }


    render() {
        const { isLoading, message } = this.state

        return (
            <div>
                <section className="section lb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="widget">
                                    <div className="custom-module">
                                        <h4 className="module-title">Login into Account</h4>
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                {message && 
                                                    <div className="col-md-12">
                                                        <div className="alert alert-dismissible alert-success">
                                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                                            <h4>Info!</h4>
                                                            <p>{message}</p>
                                                        </div>
                                                    </div>
                                                }
                                                <form className="sidebar-login" autoComplete="off">
                                                    <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Enter email address" />
                                                    <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Enter password" />
                                                    <button type="button" className="btn btn-raised btn-info gr" disabled={isLoading} onClick={this.handleSubmit}>{isLoading ? 'Processing...' : 'Login'}</button>
                                                </form> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
