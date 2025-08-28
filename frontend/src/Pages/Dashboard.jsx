import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { toast} from 'react-toastify'

export default function Dashboard() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      const res = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setCaption(res.data.post.caption);
    } catch (error) {
      console.log("Something went wrong........", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setImage(null);
    setImagePreview(null);
    setCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      // toast.error("Logout Successfull !!")
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleLogout}
            className="
              bg-red-600 text-white font-medium py-2 px-5 rounded-lg
              shadow-md hover:bg-red-700 hover:shadow-lg
              transition-colors duration-200 ease-in-out
              absolute z-50 right-[2.5rem]
              cursor-pointer
            "
          >
            Logout
          </button>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Vision Analysis
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Upload an image to generate intelligent captions
          </p>
        </div>

        {/* Main upload card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
          {!imagePreview ? (
            // Upload area
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                dragActive
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {dragActive ? "Drop your image here" : "Upload Image"}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Drag and drop your image here, or click to browse
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    Supports JPG, PNG, WebP up to 10MB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Preview and analysis
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl border border-slate-600"
                />
                <button
                  onClick={resetUpload}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex gap-4">
                {/* Generate Caption */}
                <button
                  onClick={handleUpload}
                  disabled={isLoading}
                  className="cursor-pointer flex-1
                    bg-gradient-to-r from-blue-600 to-cyan-600
                    hover:from-blue-700 hover:to-cyan-700
                    disabled:from-slate-600 disabled:to-slate-600
                    px-6 py-3 rounded-xl font-semibold text-white
                    transition-all duration-200 ease-in-out
                    disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                    active:scale-95
                  "
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="animate-pulse">Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Generate Caption
                    </>
                  )}
                </button>

                {/* Reset */}
                <button
                  onClick={resetUpload}
                  className="cursor-pointer px-6 py-3 border border-slate-600
                    rounded-xl font-semibold text-slate-300
                    hover:bg-slate-800 hover:border-slate-500
                    transition-all duration-200 ease-in-out
                    active:scale-95 flex items-center justify-center gap-2
                  "
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Caption result */}
          {caption && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Generated Caption
                  </h4>
                  <p className="text-slate-200 leading-relaxed">{caption}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigator.clipboard?.writeText(caption)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tech indicators */}
        <div className="mt-8 flex justify-center items-center gap-6 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Vision AI Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
            <span>Secure Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
            <span>Multi-language Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
