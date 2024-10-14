document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "uzN4q9um3jdFaSOpXNGk_kQjRwEcttoAup8MjexHChw"; // Replace with your Unsplash API key

  async function fetchImagesFromUnsplash(searchTerm) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=uzN4q9um3jdFaSOpXNGk_kQjRwEcttoAup8MjexHChw`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Unsplash API Response:", data); // Log the fetched data
      return data.results; // Return only the array of image results
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return an empty array on error
    }
  }

  async function displayImages(searchTerm) {
    const images = await fetchImagesFromUnsplash(searchTerm);
    console.log("Images from Unsplash:", images); // Log the images array
    const imageResult = document.getElementById("imageResult");
    if (images.length > 0) {
      imageResult.src = images[(0, 3)].urls.regular; // Display the first image from the results
    } else {
      imageResult.src = ""; // Clear the image if no results are found
    }
  }

  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission
      const searchTerm = document.getElementById("bar").value.trim();
      await displayImages(searchTerm);
    });
  } else {
    console.error("Element '#searchForm' not found.");
  }

  const scrollToTopButton = document.querySelector("button");
  if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", () => {
      document.querySelector("h2").scrollIntoView({ behavior: "smooth" });
    });
  } else {
    console.error("Button element not found.");
  }
});
