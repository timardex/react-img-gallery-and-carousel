import React from 'react';
import { Col } from 'react-bootstrap';
import '../../assets/styles/_grid.scss';

const Grid = ({imageList}) => {
  const list = imageList.map((img, index) => {
    return(
    <Col key={index} style={{backgroundImage: `url(${img.path})`}} className="img-container">
      <div className="info-overlay">
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