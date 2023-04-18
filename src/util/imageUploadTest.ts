import axios from "axios";

export const imageUpload = async (uploadImage: Blob) => {
  const apiKey = process.env.NEXT_IMG_API_KEY;
  const imageFormData = new FormData();
  imageFormData.append("image", uploadImage);
  imageFormData.append("album", "nahonbob");

  const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
  const res = await axios.post(apiUrl, imageFormData, {
    withCredentials: false,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data.url;
};
