const scrapeButton = document.getElementById("scrapeButton");
const keywordInput = document.getElementById("keyword");
const resultsDiv = document.getElementById("results");

scrapeButton.addEventListener("click", async () => {
  const keyword = keywordInput.value;
  if (!keyword) {
    alert("Please enter a keyword");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
    );
    const products = await response.json();

    if (Array.isArray(products) && products.length > 0) {
      displayProducts(products);
    } else {
      console.error("No products found or invalid data format", products);
      resultsDiv.innerHTML = "<p>No products found for the given keyword.</p>";
    }
  } catch (error) {
    console.error("Error scraping data:", error);
  }
});

function displayProducts(products) {
  resultsDiv.innerHTML = "";

  // Verifica se a lista de produtos está vazia
  if (products.length === 0) {
    resultsDiv.innerHTML = "<p>No products found for the given keyword.</p>";
    return;
  }

  products.forEach((product) => {
    // Verifica se o produto tem dados válidos
    if (!product.title || !product.imageUrl) {
      return; // Ignora produtos com dados ausentes
    }

    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
    <h3>${product.title}</h3>
    <p>${product.rating}</p>
    ${
      product.reviews !== "0 reviews"
        ? `<p>Based on ${product.reviews}</p>`
        : ""
    }
    <img src="${product.imageUrl}" alt="${product.title}" />
  `;
    resultsDiv.appendChild(productElement);
  });
}
