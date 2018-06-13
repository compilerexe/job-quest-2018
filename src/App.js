import React, { Component } from 'react'
import Navbar from './components/Navbar.jsx'
import Joke from './components/Joke'

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

    axios.get('http://api.icndb.com/jokes/random/4?firstName=John&amp;lastName=Doe')
      .then(response => {
        let v = response.data.value

        v.forEach(d => {
          result.push(<Joke key={d.id} joke={d.joke}/>)
        })

        this.setState({jokes: result})
      })

  }

  render () {
    return (
      <div className='container grid-lg'>

        <Navbar/>

        <div className="columns">

          {this.state.jokes.map(joke => joke)}

        </div>
      </div>
    )
  }
}

export default App
