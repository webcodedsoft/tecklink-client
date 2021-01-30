import React from 'react';
import moment from 'moment'

export const SingleTicket = ({ tickets, type, handleChange, handleSubmit }) => {

    return (
        <>
            {tickets.length > 0 && tickets.map((ticket, index) => (

                <article className="well btn-group-sm clearfix" key={index}>
                    <div className="topic-desc row-fluid clearfix">
                        <div className="col-sm-12">
                            <header className="topic-footer clearfix">
                                <ul className="list-inline tags">
                                    <li className="status"><a href="#status">{ticket.status}</a></li>
                                </ul>
                            </header>
                            <p>{ticket.description}</p>
                        </div>
                    </div>
                    <div className="blog-meta clearfix">
                        <small>{moment(ticket.created_at).format('MMMM D, YYYY')}</small>
                        <small>Ticket ID: <b>{ticket.ticketId}</b></small>
                    </div>
                    {type === "Multiple" &&
                        <div className="col-sm-6">
                            <label className="control-label">Ticket Status</label>
                            <select className="form-control" name="status" onChange={handleChange}>
                                <option value="Closed">Closed</option>
                                <option value="Open">Open</option>
                                <option value="Waiting Response">Waiting Response</option>
                            </select>
                            <button className="btn btn-raised btn-info gr" onClick={() => handleSubmit(ticket._id)}>Submit</button>
                        </div>
                    }
                </article>
            ))}
        </>
    );
}

export default { SingleTicket }