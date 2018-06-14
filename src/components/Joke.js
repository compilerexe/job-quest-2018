import React, { Component } from 'react'
import database from '../Firebase'

const axios = require('axios')

export default class Joke extends Component {

  constructor (props) {
    super(props)
    this.joke_id = props.id
    this.state = {like: 0}
  }

  pressLike (e) {
    e.preventDefault()
    let approveLike = false

    axios.get('https://jsonip.com').then(response => {
      let ip = (response.data.ip).replace(/:/g, '-')

      let refIP = database.ref(`/job-quest-2018/logs/${ip}/${this.joke_id}`)
      let ref = database.ref(`/job-quest-2018/jokes/${this.joke_id}`)

      refIP.once('value', snapshot => {
        if (snapshot.val() !== null) {
          approveLike = !snapshot.val().like
          refIP.update({like: !snapshot.val().like})
        } else {
          // init user log
          refIP.set({
            like: true,
            dislike: false
          })
          approveLike = true
        }
      }).then(() => {
        ref.once('value', snapshot => {
          if (snapshot.val() !== null) {
            let v = snapshot.val().like

            if (approveLike) {
              ref.update({like: ++v})
            } else {
              ref.update({like: --v})
            }

          } else {
            // init joke data
            ref.set({
              like: 1,
              dislike: 0
            })
          }
        }) // end ref
      }) // end refIP
    }) // end axios
  }

  componentWillMount () {
    let then = this
    database.ref(`/job-quest-2018/jokes/${this.joke_id}`).on('value', snapshot => {
      (snapshot.val() !== null) && then.setState({like: snapshot.val().like})
    })
  }

  render () {

    const styles = {
      column: {marginTop: '20px'},
      btnLike: {marginRight: '10px'}
    }

    return (
      <article className="form-group" style={styles.column}>
        <div className="card">
          <div className="card-header">
            <div className="card-title h5">{this.props.joke}</div>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-success" style={styles.btnLike} onClick={e => this.pressLike(e)}>
              <i className="icon icon-emoji"/> {this.state.like}
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