document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const searchBar = document.getElementById("searchBar");
    let allProducts = [];
  
    // Fetch products from API
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        allProducts = data;
        displayProducts(allProducts);
      });
  
    // Filter products based on search
    searchBar.addEventListener("input", () => {
      const searchTerm = searchBar.value.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
      displayProducts(filtered);
    });
  
    // Display products in UI
    function displayProducts(products) {
      productList.innerHTML = "";
      products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" />
          <h4>${product.title}</h4>
          <p>$${product.price}</p>
          <div class="description">${product.description.substring(0, 100)}...</div>
          <button class="add-cart">Add to Cart</button>
          <button class="buy-now">Buy Now</button>
        `;
        productList.appendChild(div);
      });
    }
  });
  
