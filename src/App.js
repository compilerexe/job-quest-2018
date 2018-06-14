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

    axios.get('http://api.icndb.com/jokes/random/20?firstName=John&amp;lastName=Doe')
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
          <div className="column col-2 col-ml-auto">
            <div className="form-group">
              <select className="form-select">
                <option>20 ~ jokes</option>
                <option>50 ~ jokes</option>
                <option>100 ~ jokes</option>
                <option>more then 100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="columns">

          {this.state.jokes.map(joke => joke)}

        </div>

        <Footer/>
      </div>
    )
  }
}

export default App
