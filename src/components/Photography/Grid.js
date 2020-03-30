import React from 'react';
import { Col, Button, Spinner } from 'react-bootstrap';
import '../../assets/styles/_grid.scss';

const Grid = props => {
  const list = props.initialList.map(img => {
    return(
    <Col key={img.id} style={{background: `url(${img.path})`}} className={`img-container img-${img.id}`}>
      <div className="info-overlay" onClick={() => {props.changeModalContent(img); props.scrollToPos(img.id)}}>
        <span>{img.name}</span>
      </div>
    </Col>
    )
  });
  return (
    <div className="grid">
      <section>
        {list}
      </section>
      {(props.initialItem < props.imageList.length || props.imageList.length > props.initialItem) && <div className="load-more">
        <div>
          <Button variant="warning" onClick={() => props.loadMore()}>{props.imageLeftToLoad} <small>left to load</small></Button>
          {props.showSpinner && <Spinner animation="grow" variant="warning" className="spinner"/>}
        </div>
      </div>}
    </div>
  )
}

export default Grid;