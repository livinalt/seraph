import React from 'react';

const Header = () => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-700">Seraph</div>
            <nav className="space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Home</a>
                <a href="#check" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Check</a>
                <a href="#directory" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Scam List</a>
                <a href="#report" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Report a Scam</a>
                <a href="#blog" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Blog</a>
            </nav>
        </header>
    );
};

export default Header;
