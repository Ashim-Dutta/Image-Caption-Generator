import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6 py-24">
      <div className="max-w-md mx-auto text-center">
        {/* Animated 404 */}
        <div
          className={`mb-8 transform transition-all duration-1000 ${
            mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* Error message */}
        <div
          className={`mb-8 transform transition-all duration-1000 delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            The page you're looking for seems to have vanished into the digital
            void. Don't worry, even the best AI sometimes loses track of things!
          </p>
        </div>

        {/* Floating elements animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-70"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-50"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce delay-1000 opacity-80"></div>
        </div>

        {/* Action buttons */}
        <div
          className={`space-y-4 transform transition-all duration-1000 delay-500 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            ← Back to Home
          </Link>

          
        </div>

        {/* Fun AI-themed message */}
        <div
          className={`mt-12 transform transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <p className="text-sm text-gray-400 italic">
              "I've analyzed millions of web pages, but this one seems to be
              missing from my database."
              <br />
              <span className="text-purple-400">— ImageCaption AI</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
