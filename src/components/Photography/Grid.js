import React from 'react';
import '../../assets/styles/_grid.scss';

const Grid = props => {
  const list = props.initialList.map(img => {
    return(
    <div key={img.id} style={{background: `url(${img.path})`}} className={`img-container img-${img.id}`}>
      <div className="info-overlay" onClick={() => {props.changeModalContent(img); props.scrollToPos(img.id)}}>
        <span>{img.name}</span>
      </div>
    </div>
    )
  });
  return (
    <div className="grid">
      <section>
        {list}
      </section>
      {(props.initialItem < props.imageList.length || props.imageList.length > props.initialItem) && <div className="load-more">
        <div>
          <button onClick={() => props.loadMore()}>{props.imageLeftToLoad} <small>left to load</small></button>
          {props.showSpinner && <div className="spinner">loading</div>}
        </div>
      </div>}
    </div>
  )
}

export default Grid;