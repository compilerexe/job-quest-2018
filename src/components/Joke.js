import React, { Component } from 'react'

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
      <article className="form-group" style={styles.column} role="article">
        <div className="card">
          <div className="card-header">
            <div className="card-title h5">{this.props.joke}</div>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-success" style={styles.btnLike}>
              <i className="icon icon-emoji"/> {(Math.random() * 1000).toFixed(0)}
            </button>
            <button type="button" className="btn btn-error">
              <i className="icon icon-flag"/>&nbsp;
              {(Math.random() * 1000).toFixed(0)}
            </button>
          </div>
        </div>
      </article>
    )
  }

}