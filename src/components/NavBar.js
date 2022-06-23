import React, { Component } from 'react'

export class NavBar extends Component {
 

  render() {
    return (
      <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">NewsAdda</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Bussiness</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Entertainment</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Genrel</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Health</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Science</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Sport</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Technolgy</a>
            </li>
          </ul>
          
        </div>
      </div>
    </nav></div>
    )
  }
}

export default NavBar