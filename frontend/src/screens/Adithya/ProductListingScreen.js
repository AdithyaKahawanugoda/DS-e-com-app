import React, { useEffect } from "react";

const ProductListingScreen = () => {
  let category;

  useEffect(() => {
    category = localStorage.getItem("selectedCategory");
  }, []);
  return (
    <div>
      <h3>Product Listing with Pagination</h3>
    </div>
  );
};

export default ProductListingScreen;
