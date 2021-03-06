import React, { Component } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import actionTypes from './redux/actions';
import store from './redux/store';
import dataWithFirebase from './Firebase.jsx';
import Navbar from './components/Navbar.jsx';
import Joke from './components/Joke.jsx';
import Footer from './components/Footer.jsx';

/* =====  Firebase Realtime Database Config ===== */
// Change your firebase initializeApp in Firebase.js file.
const firebaseEnabled = true; // Change to false if your don't want this feature.
/* ============================================== */

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);

    this.data = { // use default value from store
      firstName: props.firstName,
      lastName: props.lastName,
      resultJokes: props.resultJokes,
    };
  }

  async asyncAPI() {
    const { firstName, lastName, resultJokes } = this.data;
    const res = await axios.get(`https://api.icndb.com/jokes/random/${resultJokes}?firstName=${firstName}&lastName=${lastName}`);
    return await res;
  }

  dataOnly() {
    this.asyncAPI().then((response) => {
      (this.props.jokes.length > 0) && store.dispatch({ type: actionTypes.CLEAR_DATA_JOKES });
      const result = [];
      const icndb = response.data.value;
      icndb.forEach((d) => {
        const jokeId = d.id;
        const data = {
          jokeId,
          joke: d.joke,
        };
        result.push(
          <LazyLoad key={jokeId} height={100}>
            <Joke data={data} />
          </LazyLoad>,
        );
      });
      store.dispatch({
        type: actionTypes.SET_RESULT_JOKES,
        data: result,
      });
    });
  }

  onSubmit(e) {
    e.preventDefault();
    store.dispatch({
      type: actionTypes.SET_CONFIG,
      data: { ...this.data },
    });

    if (firebaseEnabled) {
      dataWithFirebase();
    } else {
      this.dataOnly();
    }
  }

  componentWillMount() {
    if (firebaseEnabled) {
      axios.get('https://jsonip.com').then((response) => {
        store.dispatch({
          type: actionTypes.SET_IP,
          data: {
            ip: (response.data.ip).replace(/[.:]/g, '-'),
          },
        });
        dataWithFirebase();
      }).catch((err) => {
        console.log(err);
        return err;
      });
    } else {
      this.dataOnly();
    }
  }

  render() {
    const AppLoading = () => (
      <div className="loading fixed loading-lg" style={{ top: '50%', left: '50%' }} />
    );

    const Content = () => (
      <main role="main">
        <Navbar />

        <header className="columns">
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <label htmlFor="first-name" className="form-label">
First name
              </label>
              <input
                type="text"
                className="form-input"
                id="first-name"
                placeholder="First name"
                defaultValue={this.props.firstName}
                onChange={e => this.data.firstName = e.target.value}
              />
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <label htmlFor="last-name" className="form-label">
Last name
              </label>
              <input
                type="text"
                className="form-input"
                id="last-name"
                placeholder="Last name"
                defaultValue={this.props.lastName}
                onChange={e => this.data.lastName = e.target.value}
              />
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <label htmlFor="result-jokes" className="form-label">
Result
              </label>
              <select
                className="form-select"
                id="result-jokes"
                defaultValue={this.props.resultJokes}
                onChange={e => this.data.resultJokes = e.target.value}
              >
                <option value="50">
50 ~ jokes
                </option>
                <option value="100">
100 ~ jokes
                </option>
                <option value="1000">
more then 100
                </option>
              </select>
            </div>
          </div>
          <div className="column col-2 col-xs-6">
            <div className="form-group">
              <p className="form-label" />
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={e => this.onSubmit(e)}
              >
Random
              </button>
            </div>
          </div>
        </header>

        {(this.props.jokes.length <= 0) && <AppLoading />}
        {this.props.jokes.map(joke => joke)}
        {(this.props.jokes.length > 0) && <Footer />}
      </main>
    );

    return (
      <div className="container grid-lg">
        <Content />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jokes: state.jokes,
  firstName: state.firstName,
  lastName: state.lastName,
  resultJokes: state.resultJokes,
  ip: state.ip,
});

export default connect(mapStateToProps)(App);
