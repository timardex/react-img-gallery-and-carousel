import React, {Component} from 'react';
import { Row, Col, InputGroup, Button } from 'react-bootstrap';

import { getCat, categoryFilter } from "./helpers.js";
import Grid from './Grid';
//import Modal from './Modal';

class Photography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: this.props.imageList,
      currentCategory: "All",
      showModal: false,
      selectedImgSrc: "",
      selectedImgTitle: "",
      selectedImgId: null,
      selectedCategory: "",
      activeThumb: false
    }
  }
  getCategories = () => {
    return getCat(this.state.imageList);
  }
  filteredCategory = () => {
    return categoryFilter(this.state.currentCategory, this.state.imageList);
  }
  getBtnValue = (e) => {
    this.setState({
      currentCategory: e.target.value
    })
  }
  render() {
    return (
      <div id="photography">
        <Row>
          <Col>
            <InputGroup className="btn-filter text-center mt-3">
              <InputGroup.Prepend>
                {this.getCategories().map((item, index) => {
                  return (
                    <Button key={index} variant="warning" value={item} onClick={e => this.getBtnValue(e)}>{item}</Button>
                  )
                })}
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Grid imageList={this.filteredCategory()} />
        </Row>
      </div>
    )
  }
}

export default Photography;