import React from 'react';
import '../../assets/styles/_modal.scss';

const Modal = (props) => {
  const list = props.imageList.map((img, index) => {
    return(
      <div
        key={index}
        style={{background: `url(${img.path})`}}
        id={`thumbs-${img.id}`}
        title={img.name}
        className={`thumbs-img background-img ${img.active ? 'active' : ''}`}
        onClick={() => props.changeModalContent(img)}></div>
    )
  });
  
  return (
    <div id="modal">
      <p className="title">
        <span>{props.selectedImgTitle }</span>
      </p>
      <div className="close-modal">
        <i className="fas fa-times-circle" onClick={() => props.modalToggle()}></i>
      </div>
      <div className="modal-inner">
        <div className="modal-image background-img" style={{background: `url(${props.selectedImgSrc})`}} key={props.selectedImgId}></div>
        <div className="actions">
          {props.selectedImgId > 1 && <span className="prev" onClick={() => props.nextPrevImg('prev')}>
            <i className="fas fa-chevron-left"></i>
          </span>}
          {props.selectedImgId < props.imageList.length && <span className="next" onClick={() => props.nextPrevImg('next')}>
            <i className="fas fa-chevron-right"></i>
          </span>}
        </div>
      </div>

      <div className="footer">
        <div id="modal-thumbs">
          {list}
        </div>
      </div>
    </div>
  )
}

export default Modal;