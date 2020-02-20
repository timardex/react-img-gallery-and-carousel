import React from 'react';
import { Col } from 'react-bootstrap';
import '../../assets/styles/_grid.scss';

const Grid = props => {
  const list = props.imageList.map(img => {
    return(
    <Col key={img.id} style={{background: `url(${img.path})`}} className={`img-container img-${img.id}`}>
      <div className="info-overlay" onClick={() => {props.changeModalContent(img); props.scrollToPos(img.id);}}>
        <span>{img.name}</span>
      </div>
    </Col>
    )
  });
  return (
    <section>
      {list}
    </section>
  )
}

export default Grid;