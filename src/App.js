import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import Photography from './components/Photography/';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: []
    }
  }
  componentDidMount () {
    this.importAll(require.context("./assets/img/", true, /\.jpg$/));
  }
  importAll = (r) => {
    r.keys().forEach((key, id) => {
      this.setState({
        imageList: this.state.imageList.push({
          path: r(key),
          name: key
            .replace("./", "")
            .replace(".jpg", "")
            .replace(/-/g, " ")
            .substr(key.indexOf("-") - 1), // remove './', '.jpg', '-' and first word
          category: key
            .replace("./", "")
            .replace(".jpg", "")
            .replace(/-/g, " ")
            .replace(/ .*/, ""), // remove './', '.jpg', '-' and get first word as category
          id: id + 1,
          active: false
        })
      })
    });
  }
  render() {
    return (
      <div id="app">
        <Container fluid>
        <Photography imageList={this.state.imageList} />
        </Container>
      </div>
    )
  }
}

export default App;
