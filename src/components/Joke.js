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
            <button className="btn btn-primary" style={styles.btnLike}>
              <i className="icon icon-emoji"/> Like
            </button>
            <button className="btn btn-primary">
              <i className="icon icon-cross"/> Not pass
            </button>
          </div>
        </div>
      </div>
    )
  }

}