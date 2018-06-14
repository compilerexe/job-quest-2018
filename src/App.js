import React, { Component } from 'react'
import Navbar from './components/Navbar.jsx'
import Joke from './components/Joke'
import Footer from './components/Footer.jsx'

const axios = require('axios')

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      jokes: []
    }
  }

  componentDidMount () {
    let result = []

    axios.get('http://api.icndb.com/jokes/random/20?firstName=Prayut&lastName=')
      .then(response => {
        let v = response.data.value

        v.forEach(d => {
          result.push(<Joke key={d.id} joke={d.joke}/>)
        })

        this.setState({jokes: result})
      })

  }

  render () {

    const AppLoading = () => (
      <div className="columns fixed centered" style={{ top: '50%', left: '50%'}}>
        <div className="loading loading-lg"/>
      </div>
    )

    const Content = () => (
      <div>
        <Navbar/>

        <div className="columns">
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <input type="text" className="form-input" placeholder="First name"/>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <input type="text" className="form-input" placeholder="Last name"/>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <select className="form-select">
                <option>20 ~ jokes</option>
                <option>50 ~ jokes</option>
                <option>100 ~ jokes</option>
                <option>more then 100</option>
              </select>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <button type="button" className="btn btn-primary" style={{width: '100%'}}>Random</button>
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
