import React from "react";

import Products from "../Products/Products";

const Category = (props) => {
  const list = props.products;

  return <Products products={list} amount={list.length} columns={4} />;
};

export default Category;
