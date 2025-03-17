import axios from "axios";

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
      return imageUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching cover:", error);
    return null;
  }
};
