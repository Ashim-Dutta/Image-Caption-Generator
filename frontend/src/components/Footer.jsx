export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white mt-20">
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ImageCaption AI
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-purple-400 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Terms
          </a>
          <a href="#" className="hover:text-purple-400 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
