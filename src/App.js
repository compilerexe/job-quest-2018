import React, { Component } from 'react'
import Navbar from './components/Navbar.jsx'
import Joke from './components/Joke'
import Footer from './components/Footer.jsx'

const axios = require('axios')

let firstName = 'Prayut'
let lastName = ''
let resultJokes = 20

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      jokes: []
    }
  }

  fetchData () {

    (this.state.jokes.length > 0) && this.setState({jokes: []})

    let result = []

    axios.get(`http://api.icndb.com/jokes/random/${resultJokes}?firstName=${firstName}&lastName=${lastName}`)
      .then(response => {
        let v = response.data.value

        v.forEach(d => {
          result.push(<Joke key={d.id} joke={d.joke}/>)
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
      <div className="columns fixed centered" style={{top: '50%', left: '50%'}}>
        <div className="loading loading-lg"/>
      </div>
    )

    const Content = () => (
      <div>
        <Navbar/>

        <div className="columns">
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <input type="text" className="form-input" placeholder="First name"
                     defaultValue={firstName}
                     onChange={e => firstName = e.target.value}/>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <input type="text" className="form-input" placeholder="Last name"
                     defaultValue={lastName}
                     onChange={e => lastName = e.target.value}/>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <select className="form-select" onChange={e => resultJokes = e.target.value}>
                <option value="20">20 ~ jokes</option>
                <option value="50">50 ~ jokes</option>
                <option value="100">100 ~ jokes</option>
                <option>more then 100</option>
              </select>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <button type="button" className="btn btn-primary" style={{width: '100%'}} onClick={e => this.onSubmit(e)}>Random</button>
          </div>
        </div>

        <div className="columns">
          {this.state.jokes.map(joke => joke)}
        </div>

        <Footer/>
      </div>
    )

    return (
      <div className="container grid-lg">
        {(this.state.jokes.length <= 0) ? <AppLoading/> : <Content/>}
      </div>
    )
  }
}

export default App
