import React, { Component } from 'react'
import dislike from '../images/dislike.svg'

export default class Joke extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    const styles = {
      column: {marginTop: '20px'},
      btnLike: {marginRight: '10px'}
    }

    return (
      <div className="column col-12" style={styles.column}>
        <div className="card">
          <div className="card-header">
            <div className="card-title h5">{ this.props.joke }</div>
            {/*<div className="card-subtitle text-gray">...</div>*/}
          </div>
          {/*<div className="card-body">*/}
            {/*{ this.props.joke }*/}
          {/*</div>*/}
          <div className="card-footer">
            <button className="btn btn-success" style={styles.btnLike}>
              <i className="icon icon-emoji"/> { (Math.random() * 1000).toFixed(0) }
            </button>
            <button className="btn btn-error">
              <i className="icon icon-flag"/>&nbsp;
              { (Math.random() * 1000).toFixed(0) }
            </button>
          </div>
        </div>
      </div>
    )
  }

}