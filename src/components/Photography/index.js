import React, {Component} from 'react';
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
      selectedImgId: "",
      selectedCategory: "",
      initialItem: 8,
      showSpinner: false
    }
  }
  getCategories = () => {
    return getCat(this.state.imageList);
  }

  filteredCategory = () => {
    return categoryFilter(this.state.currentCategory, this.state.imageList);
  }
  getBtnValue = item => {
    this.setState({
      currentCategory: item.item
    })
    this.getCategories().map(value => value.id === item.id ? {...value, active: true} : {...value, active: false})
  }
  changeModalContent = item => {
    this.initialList().find(value => value.id === item.id ? value.active = true : value.active = false);
    this.setState({
      showModal: true,
      selectedImgSrc: item.path,
      selectedImgTitle: item.name,
      selectedImgId: item.id
    })
    console.log(this.initialList().find(value => value.id === item.id));
  }
  nextPrevImg = direction => {
    let idImg = getIndex(this.state.selectedImgId, direction);
    
    let newImg = this.initialList().find(item => item.id === idImg);
    
    this.initialList().find(value => value.id === newImg.id ? value.active = true : value.active = false);
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
  initialList = () => {
    return this.filteredCategory().slice(0, this.state.initialItem)
  }
  imageLeftToLoad = () => {
    return this.filteredCategory().length - this.initialList().length
  }
  loadMore = () => {
    this.setState({showSpinner: true})
    setTimeout(() => {
      this.setState({
        initialItem: this.state.initialItem + 8,
        showSpinner: false
      })
    }, 2000)
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

        <ul className="btn-filter">
          {this.getCategories().map(el => {
            return (
            <li
              key={el.id}
              value={el.item} className={el.active ? 'active' : ''}
              onClick={() => this.getBtnValue(el)}>
                <input type="radio" id={el.item} value={el.item} name="selector" />
                <label htmlFor={el.item}>{el.item}</label>
              </li>
            )
          })}
        </ul>

        <Grid
            imageList={this.filteredCategory()}
            changeModalContent={this.changeModalContent}
            scrollToPos={this.scrollToPos}
            initialList={this.initialList()}
            initialItem={this.state.initialItem}
            imageLeftToLoad={this.imageLeftToLoad()}
            loadMore={this.loadMore}
            showSpinner={this.state.showSpinner}/>

        {this.state.showModal && <Modal
          selectedImgSrc={this.state.selectedImgSrc}
          selectedImgTitle={this.state.selectedImgTitle}
          selectedImgId={this.state.selectedImgId}
          imageList={this.initialList()}
          changeModalContent={this.changeModalContent}
          modalToggle={this.modalToggle}
          nextPrevImg={this.nextPrevImg}
        />}
      </div>
    )
  }
}

export default Photography;