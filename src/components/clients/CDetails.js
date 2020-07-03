import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft, FaPen } from "react-icons/fa";
import PropTypes from "prop-types";
import classnames from "classnames";

class CDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: "",
  };

  balanceSubmit = (e) => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    };
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  onDeleteClick = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(() => history.push("/"));
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                className="btn btn-outline-dark"
                value="Update"
              />
            </div>
          </div>
        </form>
      );
    } else {
    }
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <FaArrowCircleLeft /> Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID: {""}{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0,
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate,
                          })
                        }
                      >
                        <FaPen />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  Client Email: {client.email}
                </li>
                <li className="list-group-item">
                  Client Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading..</h1>;
    }
  }
}

CDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect((props) => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id,
    },
  ]),
  connect(({ firestore: { ordered } }, props) => {
    return {
      client: ordered.client && ordered.client[0],
    };
  })
)(CDetails);
