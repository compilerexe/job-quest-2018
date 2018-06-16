import React, { Component } from 'react'
import styled from 'styled-components'

export default class Joke extends Component {

  constructor (props) {
    super(props)
    this.data = props.data
  }

  componentDidMount () {
    console.log(`componentDidMount >>>> ${this.data.joke_id}`)
  }

  render () {

    const styles = {
      column: {marginTop: '20px'}
    }

    const StyledBgColor = styled.div`
      background: linear-gradient(to right, #b4d0fd, #c2e9fb);
      box-shadow: 4px 4px #888888;
    `

    const Joke = () => (
      <article className="form-group" style={styles.column}>
        <div className="card">
          <StyledBgColor className="card-header">
            <div className="card-title h5">{this.data.joke}</div>
          </StyledBgColor>
        </div>
      </article>
    )

    return <Joke/>
  }

}