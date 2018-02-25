import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { WidgetLayoutConnected } from './components/WidgetLayoutComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          {/* <WidgetLayoutConnected height="calc(100vh)" width="calc(100vw)" /> */}
          <WidgetLayoutConnected height="610px" width="400px" />
        </Provider>
      </div>
    );
  }
}

export default App;
