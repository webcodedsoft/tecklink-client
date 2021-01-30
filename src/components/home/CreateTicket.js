import React, { Component } from 'react'
import { createTicket, getToken, getCurrentUserObject } from '../../services'

export default class CreateTicket extends Component {
    
    state = { 
        isLoading: false,
        message: null,
        user: null,
        status: 'Open',
        ticketId: 0,
    }

    componentDidMount = () => {
        const user = getCurrentUserObject();
        this.setState({ user });

        const token = getToken();
        if (!token) window.location = "/";
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { description, user, status } = this.state;
        this.setState({ isLoading: true })

        createTicket({ description, userId: user._id, status }, response => {
            const { result } = response
            const { ticketId } = result.data

            if (result && !result.status) {
                this.setState({ message: result.message, isLoading: false })
            } else if (result) {
                this.setState({ message: result.message, isLoading: false, description: '', ticketId })
            }
        });
    }


    render() {
        const { description, isLoading, message, ticketId } = this.state

        return (
            <div>
                <div>
                    <section className="section lb">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="widget nopadding clearfix">
                                        <div className="panel panel-primary nopadding">
                                            <div className="panel-heading">
                                                <h3 className="panel-title">Create Ticket</h3>
                                            </div>
                                            <div className="panel-body">
                                               
                                                <form className="site-search">
                                                    <div className="form-group label-floating">
                                                        <label className="control-label" htmlFor="focusedInput2">How may I help you today?</label>
                                                        <textarea className="form-control" name="description" value={description} onChange={this.handleChange} rows="3" id="textArea"></textarea>
                                                    </div>
                                                    <div className="form-group clearfix">
                                                        <div className="submit-button pull-right">
                                                            <button type="button" className="btn btn-raised btn-info gr" disabled={isLoading} onClick={this.handleSubmit}>{isLoading ? 'Processing...' : 'Create Ticket'}</button>
                                                        </div>
                                                    </div>
                                                </form>

                                                 {message &&
                                                    <div className="col-md-12">
                                                        <div className="alert alert-dismissible alert-success">
                                                            <button type="button" className="close" data-dismiss="alert">×</button>
                                                            <h4>Info!</h4>
                                                            <p>{message}, Your ticket ID: <b>#{ticketId}</b></p>
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
