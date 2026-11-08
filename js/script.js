console.log("script.js loaded");

const apiKey = "BrGgQ7v4lVB8kKQnmr0Bh3KVT4nG1f5T";
const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=8`;

// Fetch GIFs from GIPHY
async function fetchGifs() {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch GIFs");
    }

    const data = await response.json();

    const images = data.data.map(gif => gif.images.original.url);
    console.log("GIF URLs:", images);

    return images;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
}


const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Fetch and display GIFs when the button is clicked
fetchButton.addEventListener("click", async () => {
 const searchTerm = searchInput.value.trim();
 
 // Show a message if the search box is empty
if (searchTerm === "") {
  gifContainer.innerHTML = "<p>Please enter a keyword to search for GIFs.</p>";
  return;
}

  const searchEndpoint =
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=8`;

  try {
    gifContainer.innerHTML = "<p>Loading GIFs...</p>";

    const response = await fetch(searchEndpoint);

    if (!response.ok) {
      throw new Error("Could not fetch GIFs");
    }

    const data = await response.json();
    const images = data.data.map(gif => gif.images.original.url);

    console.log("GIF URLs:", images);

    gifContainer.innerHTML = "";

    images.forEach(imageUrl => {
      gifContainer.innerHTML +=
        `<img src="${imageUrl}" class="col-3 mb-3" alt="GIF result">`;
    });
  } catch (error) {
    console.error(error);
    gifContainer.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
});

