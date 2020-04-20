export const categoryFilter = (category, list) => {
  if (category !== "All") {
    let filteredList = list.filter(value => value.category === category);
    return filteredList.map((u, i) => Object.assign({}, u, { id: i + 1 }));
  } else {
    return list;
  }
};

export const getCat = list => {
  const array = list.map(val => val.category);
  const unique = [...new Set(array)];
  unique.unshift("All");
  return unique.map((item, id) => {
    const active = false 
    return {id, item, active}
  })
};

export const getIndex = (idImg = 1, direction) => {
  switch (direction) {
    case "next":
      return idImg + 1;
    case "prev":
      return idImg - 1;
    default:
      return idImg;
  }
};
