import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkVeil from '../components/DarkVeil'

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate()

  const handleLogin = () => { 
    navigate('/login')
  }

    const handleRegister = () => {
      navigate("/register");
    };

  return (
    <div className="relative">
      <div style={{ width: "100%", height: "100vh", position: "absolute",zIndex:1 }}>
        <DarkVeil />
      </div>

      <div className="min-h-screen relative overflow-hidden bg-black absolute ">


        {/* Floating orbs */}
        <div className="absolute z-10 inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 absolute z-2">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8 animate-fade-in">
              <span className="text-blue-300 text-sm font-medium tracking-wider">
                AI-POWERED VISION ANALYSIS
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 animate-slide-up">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                See it. Caption it.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light animate-fade-in-delay">
              Advanced neural networks decode visual content into intelligent,
              contextual descriptions with unprecedented accuracy and nuance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay">
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleRegister}
                className="cursor-pointer group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-3"
              >
                <span>Register</span>
              </button>

              <button
                onClick={handleLogin}
                className="cursor-pointer px-8 py-4 border border-slate-600 rounded-lg font-semibold text-slate-300 hover:bg-slate-800/50 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
              >
                Login
              </button>
            </div>

            {/* Tech indicators */}
            <div className="mt-16 flex justify-center items-center gap-8 text-slate-500 text-sm animate-fade-in-tech">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Neural Network Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span>GPU Accelerated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                <span>Edge Computing</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out 0.2s both;
          }

          .animate-fade-in-delay {
            animation: fade-in 0.8s ease-out 0.6s both;
          }

          .animate-slide-up {
            animation: slide-up 0.8s ease-out 0.4s both;
          }

          .animate-slide-up-delay {
            animation: slide-up 0.8s ease-out 0.8s both;
          }

          .animate-fade-in-stats {
            animation: fade-in 1s ease-out 1.2s both;
          }

          .animate-fade-in-tech {
            animation: fade-in 1s ease-out 1.6s both;
          }
        `}</style>
      </div>
    </div>
  );
}
