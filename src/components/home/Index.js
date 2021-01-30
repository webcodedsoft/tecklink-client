import React, { Component } from 'react'
import { getSingleTicket } from '../../services'
import { SingleTicket } from '../common';

export default class Index extends Component {

    state = {
        search: '',
        isLoading: false,
        message: null,
        ticket: [],
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input
        this.setState({ [name]: value })
    }

     handleSubmit = (e) => {
        e.preventDefault();
         const { search } = this.state;
        this.setState({ isLoading: true })

         getSingleTicket({ ticketId: search }, response => {
            const { result } = response
            if (result && !result.status) {
                this.setState({ message: result.message, isLoading: false })
            } else if (result) {
                this.setState({ isLoading: false, ticket: [result.data] })
            }
        });
    }

    render() {
        const { isLoading, message, ticket } = this.state
        
        return (
            <div>
                <section className="section lb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="widget nopadding clearfix">
                                    <div className="panel panel-primary nopadding">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Search Ticket</h3>
                                        </div>
                                        <div className="panel-body">
                                            <form className="site-search">
                                                <div className="form-group label-floating">
                                                    <label className="control-label" htmlFor="focusedInput2">Enter your ticket ID</label>
                                                    <input className="form-control" name="search" onChange={this.handleChange} id="focusedInput2" type="text" />
                                                </div>
                                                <div className="form-group clearfix"> 
                                                    <div className="submit-button pull-right">
                                                        <button className="btn btn-raised btn-info gr" disabled={isLoading} onClick={this.handleSubmit}>{isLoading ? 'Searching...' : 'Search'}</button>
                                                    </div>
                                                </div>
                                            </form>
                                            {message &&
                                                <div className="col-md-12">
                                                    <div className="alert alert-dismissible alert-success">
                                                        <button type="button" className="close" data-dismiss="alert">×</button>
                                                        <h4>Info!</h4>
                                                        <p>{message}</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                { ticket && ticket.length > 0 && 
                                    <div className="home-tab clearfix">
                                        <ul className="nav nav-tabs">
                                            <li className="active"><a href="#knowledge_tab">Raise Ticket</a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <SingleTicket tickets={ticket} type="Single" />
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
