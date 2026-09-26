export function getFilterParams() {
  let minPrice = document.querySelector('input[name="minPrice"]').value;
  let maxPrice = document.querySelector('input[name="maxPrice"]').value;
  let brand = document.querySelector('select[name="brand"]').value;
  let inStock = document.querySelector('input[name="inStock"]').checked;
  let isNew = document.querySelector('input[name="isNew"]').checked;
  let rating = document.querySelector('select[name="rating"]').value;
  
  minPrice = Number(minPrice * 362) || false;
  maxPrice = Number(maxPrice * 362) || false;
  brand = brand || false;
  rating = Number(rating) || false;
   
  return { minPrice, maxPrice, brand, inStock, isNew, rating };
}
