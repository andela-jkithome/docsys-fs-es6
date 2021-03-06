(function() {
  'use strict';
  var React = require('react'),
    UserActions = require('../../actions/UserActions'),
    UserStore = require('../../stores/UserStore'),
    Header = require('../Dashboard/header.jsx'),
    browserHistory = require('react-router').browserHistory,
    user = JSON.parse(localStorage.getItem('user')),


    Profile = React.createClass({
    getInitialState: function() {
        return {
          user: null
        };
      },

    componentDidMount: function() {
      var token = localStorage.getItem('x-access-token');
        UserActions.getUser((user ? user._id : null), token);
        UserStore.addChangeListener(this.populateUser, 'user');
      },

    componentWillUnmount() {
        UserStore.removeChangeListener(this.populateUser, 'user');
      },

    populateUser: function() {
        var data = UserStore.getUser();
        this.setState({ user: data });
      },

    handleClick: function(event) {
      event.preventDefault();
      // browserHistory.push('/profile/edit/' + (user ? user._id : null))
      window.location.replace('/profile/edit/' + (user ? user._id : null));
    },

    render: function() {
      return (
        <div>
          <Header/>
          {this.state.user ?
            <div className="container">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img max-width="320" max-height="240" className="activator" src={"../../images/freedom.jpg"}/>
                </div>
                <div className="card-content">
                  <span className="teal-text card-heading">{this.state.user.name.first} {this.state.user.name.last}</span>
                  <br/>
                  <span className="role-text">Role: {this.state.user.role.title}</span>
                  <br/>
                  <span className="date-text">Username: {this.state.user.username}</span>
                  <br/>
                  <span className="date-text">{this.state.user.email}</span>
                </div>
                <div className="row search-btn">
                      <div className="col s12">
                        <button id="update" className="btn waves-effect teal center" onClick={this.handleClick}>
                          update
                        </button>
                      </div>
                    </div>
                    <div className="section">
                    </div>
              </div>
            </div> :
          <div></div>}
        </div>
      );
    }
  });
  module.exports = Profile;
})();
