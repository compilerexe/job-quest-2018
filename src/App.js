import React, { Component } from 'react'
import Navbar from './components/Navbar.jsx'
import Joke from './components/Joke'
import LazyLoad from 'react-lazyload'
import Footer from './components/Footer.jsx'

const axios = require('axios')

let firstName = 'Prayut'
let lastName = ''
let resultJokes = 50

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
        result.push(
          <LazyLoad key={d.id} height={100}>
            <Joke joke={d.joke}/>
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
    this.fetchData()
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
                <select className="form-select" id="result-jokes" defaultValue={resultJokes} onChange={e => resultJokes = e.target.value}>
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
