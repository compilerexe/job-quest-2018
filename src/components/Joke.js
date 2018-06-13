import React, { Component } from 'react'

export default class Joke extends Component {

  render () {

    const styles = {
      btnLike: {marginRight: '10px'}
    }

    return (
      <div className="column col-xs-12 col-xl-6">
        <div className="card">
          <div className="card-image">
            <img src="https://picturepan2.github.io/spectre/img/macos-sierra.jpg" className="img-responsive"/>
          </div>
          <div className="card-header">
            <div className="card-title h5">
              Microsoft
            </div>
            <div className="card-subtitle text-gray">
              Software and hardware
            </div>
          </div>
          <div className="card-body">
            Empower every person and every organization on the planet to achieve more.
          </div>
          <div className="card-footer text-right">
            <button className="btn btn-primary" style={styles.btnLike}>
              <i className="icon icon-emoji"/> Like
            </button>
            <button className="btn btn-primary">
              <i className="icon icon-cross"/> Not Pass
            </button>
          </div>
        </div>
      </div>
    )
  }

}