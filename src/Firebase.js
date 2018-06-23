import React from 'react';
import LazyLoad from 'react-lazyload';
import actionTypes from './redux/actions';
import JokeActions from './components/JokeActions';
import store from './redux/store';

const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/database');

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDjKtk-mfuS_g3ZnWI4NX2x5ynUQU1Y3og',
  authDomain: 'performance-182414.firebaseapp.com',
  databaseURL: 'https://performance-182414.firebaseio.com',
  projectId: 'performance-182414',
  storageBucket: 'performance-182414.appspot.com',
  messagingSenderId: '779931616641',
});

const database = app.database();

const dataWithFirebase = () => {
  const storeData = store.getState();

  axios.get(`https://api.icndb.com/jokes/random/${storeData.resultJokes}?firstName=${storeData.firstName}&lastName=${storeData.lastName}`).then((response) => {
    (storeData.jokes.length > 0) && store.dispatch({ type: actionTypes.CLEAR_DATA_JOKES });

    const result = [];
    const icndb = response.data.value;

    icndb.forEach((d) => {
      const joke_id = d.id;
      const refIP = database.ref(`/job-quest-2018/logs/${storeData.ip}/${joke_id}`);
      const refJoke = database.ref(`/job-quest-2018/jokes/${joke_id}`);

      let data = {
        joke_id,
        joke: d.joke,
        refIP,
        refJoke,
        like: 0,
        dislike: 0,
        log: {
          like: false,
          dislike: false,
        },
      };

      /* >>>>>>>>> init log */
      let initLog = false;
      refIP.once('value', (snapshot) => {
        if (snapshot.val() === null) {
          initLog = true;
        } else {
          data.log = {
            like: snapshot.val().like,
            dislike: snapshot.val().dislike,
          };
        }
      }).then(() => {
        if (initLog) {
          refIP.set({
            joke_id,
            like: 0,
            dislike: 0,
          });
          refJoke.set({
            joke_id,
            like: 0,
            dislike: 0,
          });
        } else {
          refJoke.once('value', (snapshot) => {
            data = {
              ...data,
              like: snapshot.val().like,
              dislike: snapshot.val().dislike,
            };
          });
        }
      });
      /* >>>>>>>>> end init log */

      result.push(
        <LazyLoad key={joke_id} height={100}>
          <JokeActions data={data} />
        </LazyLoad>,
      );
    });

    store.dispatch({
      type: actionTypes.SET_RESULT_JOKES,
      data: result,
    });
  });
};

export { dataWithFirebase };
