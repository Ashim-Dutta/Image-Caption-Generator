import { useState } from "react";
// import { API } from "../api";
import { gsap } from "gsap";
import axios from "axios"

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("/caption", formData);
      setCaption(res.data.caption);
      gsap.fromTo(
        "#caption",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    } catch (err) {
      alert("Caption generation failed",err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Generate Caption
      </button>
      {caption && (
        <p id="caption" className="mt-6 text-xl font-semibold">
          {caption}
        </p>
      )}
    </div>
  );
}
