import React from 'react'
import ReactDOM from 'react-dom'
import Main from 'Main'
import StoreContext, {store} from 'store/Context'

const App = () => (
  <StoreContext.Provider value={store}>
    <Main />
  </StoreContext.Provider>)
const root = document.getElementById('root');
ReactDOM.render(<App />, root);