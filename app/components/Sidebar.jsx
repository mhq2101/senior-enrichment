import React, { Component } from 'react';

export default class Sidebar extends Component {

  render () {
    return (
      <sidebar>
        <div className="sidebar-header">
          <h3 href="#">
            <div>This App</div>
            <i alt="Brand" className="glyphicon glyphicon-comment">
            </i>
          </h3>
        </div>
      </sidebar>
    );
  }
}