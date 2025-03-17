import axios from "axios";
import defaultCover from "../assets/default_cover.png";

export const fetchCoverUrl = async (isbn: string) => {
  try {
    const response = await axios.get(
      `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
      {
        responseType: "blob",
      }
    );
    if (response.status === 200) {
      const imageUrl = URL.createObjectURL(response.data);
      const isBroken = await checkImageDimensions(imageUrl);
      if (isBroken) {
        return defaultCover;
      }
      return imageUrl;
    } else {
      return defaultCover;
    }
  } catch (error) {
    console.log("Error fetching cover:", error);
    return defaultCover;
  }
};

const checkImageDimensions = (imageUrl: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (img.width <= 30 && img.height <= 50) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
    img.onerror = () => resolve(true);
  });
};
