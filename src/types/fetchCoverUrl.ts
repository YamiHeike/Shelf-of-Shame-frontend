import axios from "axios";

export const fetchCoverUrl = async (isbn: string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
      {
        responseType: "blob",
      }
    );
    if (response.status === 200) {
      return URL.createObjectURL(response.data);
    } else {
      return "";
    }
  } catch (error) {
    console.log(`Error fetching cover for ${isbn}`, error);
    return "";
  }
};
