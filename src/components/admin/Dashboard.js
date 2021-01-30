import React, { Component } from 'react'
import { getTicket, getToken, getCurrentUserObject, changeTicketStatus } from '../../services'
import { SingleTicket } from '../common';


export default class Dashboard extends Component {

  state = {
      user: null,
      status: '',
      isLoading: false,
      message: null,
      tickets: [],
    }

  componentDidMount = () => {
    const user = getCurrentUserObject();
    this.setState({ user })
    const token = getToken();
    this.getTicket()
    if (!token || !user.userType) window.location = "/";
  }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input
        this.setState({ [name]: value })
    }

    getTicket = () => {
      getTicket(response => {
        const { result } = response
        if (result && !result.status) {
          this.setState({ message: result.message })
        } else if (result) {
          this.setState({ tickets: result.data })
        }
      });
    }
  
    handleSubmit = (id) => {
        const { status } = this.state;
      
        changeTicketStatus({ status, id }, res => {
          const { result } = res
          if (result && !result.status) {
            this.setState({ message: result.message })
          } else if (result) {
            this.getTicket()
            this.setState({ tickets: result.data })
          }
        })
    }
  
  
  render() {
    const { message, tickets } = this.state

        return (
          <div>
            <section className="section lb">
              <div className="container">
                {message &&
                  <div className="col-md-12">
                    <div className="alert alert-dismissible alert-success">
                      <h4>Info!</h4>
                      <p>{message}</p>
                    </div>
                  </div>
                }
                <div className="row">
                  <div className="col-md-12">
                    <div className="topic-page topic-list blog-list">
                      <SingleTicket tickets={tickets} type="Multiple" handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
    }
}
