import React, {Component} from 'react';
import { Row, Col, InputGroup, Button } from 'react-bootstrap';

import { getCat, categoryFilter, getIndex } from "./helpers.js";
import Grid from './Grid';
import Modal from './Modal';

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
    }
  }
  getCategories = () => {
    return getCat(this.state.imageList);
  }
  filteredCategory = () => {
    return categoryFilter(this.state.currentCategory, this.state.imageList);
  }
  getBtnValue = e => {
    this.setState({
      currentCategory: e.target.value
    })
  }
  changeModalContent = item => {
    this.filteredCategory().map(value => (value.active = false));
    item.active = true;
    this.setState({
      showModal: true,
      selectedImgSrc: item.path,
      selectedImgTitle: item.name,
      selectedImgId: item.id
    })
  }
  nextPrevImg = direction => {
    let idImg = getIndex(this.state.selectedImgId, direction);
    let newImg = this.filteredCategory().find(item => item.id === idImg);
    this.filteredCategory().map(value => (value.active = false));
    newImg.active = true;
    const modalThumbs = document.getElementById("modal-thumbs");
    direction === "next"
      ? (modalThumbs.scrollLeft += 50)
      : (modalThumbs.scrollLeft -= 50);
    this.setState({
      selectedImgSrc: newImg.path,
      selectedImgTitle: newImg.name,
      selectedImgId: newImg.id
    })
  }
  modalToggle = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }
  scrollToPos = id => {
    setTimeout(() => {
      const modalThumbs = document.getElementById("modal-thumbs");
      let scrollPos = id * 50;
      modalThumbs.scrollLeft += scrollPos;
    }, 1000);
  }
  render() {
    return (
      <div id="photography">
        <Row>
          <Col>
            <InputGroup className="btn-filter">
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
          <Grid imageList={this.filteredCategory()} changeModalContent={this.changeModalContent} scrollToPos={this.scrollToPos}/>
        </Row>

        {this.state.showModal && <Modal
          selectedImgSrc={this.state.selectedImgSrc}
          selectedImgTitle={this.state.selectedImgTitle}
          selectedImgId={this.state.selectedImgId}
          imageList={this.filteredCategory()}
          changeModalContent={this.changeModalContent}
          modalToggle={this.modalToggle}
          nextPrevImg={this.nextPrevImg}
        />}
      </div>
    )
  }
}

export default Photography;