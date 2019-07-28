import React from "react";

function Footer() {
  return (
    <footer className="text-white py-10 w-3/4 md:w-1/2 mx-auto text-center border-t border-teal-800 flex-shrink-0">
      {"crafted with "}
      <span className="text-red-600">❤</span>
      {" by "}
      <a
        className="no-underline hover:text-red-600"
        href="https://github.com/tmns"
        target="_blank"
        rel="noopener noreferrer"
      >
        @tmns
      </a>
    </footer>
  );
}

export default Footer;
