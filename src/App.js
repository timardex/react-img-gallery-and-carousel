import React, {useState, useEffect, useCallback} from 'react';
import Photography from './components/Photography/';

import './App.scss';

const App = () => {
  let initialImageList = [];
  const [imageList, getImageList] = useState(initialImageList);
  
  const importAll = useCallback((r) => {
    r.keys().forEach((key, id) => {
      initialImageList.push({
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
    });
  }, [initialImageList])

  useEffect(() => {
    getImageList(importAll(require.context("./assets/img/", true, /\.jpg$/)))
  }, [getImageList, importAll])
  
  return (
    <div id="app">
      <Photography imageList={imageList} />
    </div>
  )
}

export default App;
