import React, { Component } from 'react'
import database from './Firebase'

import Navbar from './components/Navbar.jsx'
import Joke from './components/Joke'
import LazyLoad from 'react-lazyload'
import Footer from './components/Footer.jsx'

const axios = require('axios')

let firstName = 'Prayut'
let lastName = ''
let resultJokes = 2
let ip

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      jokes: []
    }
  }

  async asyncAPI () {
    const res = await axios(`http://api.icndb.com/jokes/random/${resultJokes}?firstName=${firstName}&lastName=${lastName}`)
    return await res
  }

  fetchData () {
    this.asyncAPI().then(response => {
      (this.state.jokes.length > 0) && this.setState({jokes: []})
      let result = []
      let v = response.data.value
      v.forEach(d => {
        let joke_id = d.id
        let refIP = database.ref(`/job-quest-2018/logs/${ip}/${joke_id}`)
        let refJoke = database.ref(`/job-quest-2018/jokes/${joke_id}`)

        let data = {
          joke_id: d.id,
          joke: d.joke,
          refIP: refIP,
          refJoke: refJoke,
          like: 0,
          dislike: 0,
          log: {
            like: false,
            dislike: false
          }
        }

        /* >>>>>>>>> init log */
        let initLog = false
        refIP.once('value', snapshot => {
          if (snapshot.val() === null) {
            initLog = true
          } else {
            data.log = {
              like: snapshot.val().like,
              dislike: snapshot.val().dislike
            }
          }
        }).then(() => {
          if (initLog) {
            refIP.set({
              like: 0,
              dislike: 0
            })
            refJoke.set({
              like: 0,
              dislike: 0
            })
          } else {
            refJoke.once('value', snapshot => {
              data = {
                ...data,
                like: snapshot.val().like,
                dislike: snapshot.val().dislike
              }
            })
          }
        })
        /* >>>>>>>>> end init log */

        result.push(
          <LazyLoad key={joke_id} height={100}>
            <Joke data={data}/>
          </LazyLoad>
        )
      })
      this.setState({jokes: result})
    })
  }

  onSubmit (e) {
    e.preventDefault()
    this.fetchData()
  }

  componentDidMount () {
    axios.get('https://jsonip.com').then(response => {
      ip = (response.data.ip).replace(/[.:]/g, '-')
      this.fetchData()
    }).catch(function (err) {
      console.log(err)
      return err
    })
  }

  render () {

    const AppLoading = () => (
      <div className="loading fixed loading-lg" style={{top: '50%', left: '50%'}}/>
    )

    const Content = () => (
      <main role="main">
        <Navbar/>

        <header className="columns">
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <label htmlFor="first-name" className="form-label">First name</label>
              <input type="text" className="form-input" id="first-name" placeholder="First name"
                     defaultValue={firstName}
                     onChange={e => firstName = e.target.value}/>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <label htmlFor="last-name" className="form-label">Last name</label>
              <input type="text" className="form-input" id="last-name" placeholder="Last name"
                     defaultValue={lastName}
                     onChange={e => lastName = e.target.value}/>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <label htmlFor="result-jokes" className="form-label">Result</label>
              <select className="form-select" id="result-jokes" defaultValue={resultJokes}
                      onChange={e => resultJokes = e.target.value}>
                <option value="50">50 ~ jokes</option>
                <option value="100">100 ~ jokes</option>
                <option value="1000">more then 100</option>
              </select>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <p className="form-label"/>
              <button type="button" className="btn btn-primary" style={{width: '100%'}}
                      onClick={e => this.onSubmit(e)}>Random
              </button>
            </div>
          </div>
        </header>

        {(this.state.jokes.length <= 0) && <AppLoading/>}
        {this.state.jokes.map(joke => joke)}
        {(this.state.jokes.length > 0) && <Footer/>}
      </main>
    )

    return (
      <div className="container grid-lg">
        <Content/>
      </div>
    )
  }
}

export default App
