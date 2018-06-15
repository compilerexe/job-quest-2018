import React from 'react'
import ReactDOM from 'react-dom'
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-icons.min.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
