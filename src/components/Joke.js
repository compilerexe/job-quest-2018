import React, { Component } from 'react'
import database from '../Firebase'

const axios = require('axios')

let permissionLike = false
let permissionDislike = false
let ip, refIP, ref
let initLog = false
let snapshotLog

export default class Joke extends Component {

  constructor (props) {
    super(props)
    this.joke_id = props.id
    this.state = {like: 0, dislike: 0}
  }

  firebaseStore (action) {

    refIP.once('value', snapshot => {
      if (snapshot.val() === null) {
        initLog = true
      } else {
        snapshotLog = snapshot
        initLog = false
      }
    }).then(() => {
      // console.log('begin process')

      // ===== process 1 =====
      if (initLog === false) {

        if (action === 'like') {
          permissionLike = !snapshotLog.val().like
          refIP.update({like: !snapshotLog.val().like, dislike: false})
        } else {
          permissionDislike = !snapshotLog.val().dislike
          refIP.update({dislike: !snapshotLog.val().dislike, like: false})
        }

      } else {
        /* ===== create log ===== */
        refIP.set({
          like: (action === 'like'),
          dislike: (action === 'dislike')
        })

        if (action === 'like') {
          permissionLike = true
        } else {
          permissionDislike = true
        }
        /* ===== end create log ===== */
      }

      // ===== process 2 =====
      ref.once('value', snapshot => {
        if (snapshot.val() !== null) {

          if (action === 'like') {

            let snapLike = snapshot.val().like
            let snapDislike = snapshot.val().dislike

            if (permissionLike) {
              snapLike++
              if (snapDislike > 0) {
                snapDislike--
              }
            } else {
              snapLike--
            }

            ref.update({like: snapLike, dislike: snapDislike})
            this.setState({like: snapLike, dislike: snapDislike})

          } else {

            let snapLike = snapshot.val().like
            let snapDislike = snapshot.val().dislike

            if (permissionDislike) {
              snapDislike++
              if (snapLike > 0) {
                snapLike--
              }
            } else {
              snapDislike--
            }

            ref.update({dislike: snapDislike, like: snapLike})
            this.setState({dislike: snapDislike, like: snapLike})

          }

        } else {
          // init joke data
          ref.set({
            like: (permissionLike) ? 1 : 0,
            dislike: (permissionDislike) ? 1 : 0
          })

          if (permissionLike) this.setState({like: 1})
          if (permissionDislike) this.setState({dislike: 1})
        }
      }) // end ref

    }) // end then() refIP

    // console.log('process completed')
  }

  onPressButton (e, action) {
    e.preventDefault()

    axios.get('https://jsonip.com').then(response => {
      ip = (response.data.ip).replace(/[.:]/g, '-')
      refIP = database.ref(`/job-quest-2018/logs/${ip}/${this.joke_id}`)
      ref = database.ref(`/job-quest-2018/jokes/${this.joke_id}`)
      this.firebaseStore(action)
    }).catch(function (err) {
      console.log(err)
      return err
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
            <button type="button" className="btn btn-success" style={styles.btnLike}
                    onClick={e => this.onPressButton(e, 'like')}>
              <i className="icon icon-emoji"/> {this.state.like}
            </button>
            <button type="button" className="btn btn-error" onClick={e => this.onPressButton(e, 'dislike')}>
              <i className="icon icon-flag"/>&nbsp;
              {this.state.dislike}
            </button>
          </div>
        </div>
      </article>
    )
  }

}