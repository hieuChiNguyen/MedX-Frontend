import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex flex-col items-center mt-5">
            <div className="flex">
                <button
                    className={`mx-1 px-3 py-1 font-semibold bg-gray-300 rounded w-20 ${currentPage === 1 ? 'text-gray-400' : 'text-black'}`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Trước
                </button>
                <p className="mx-1 px-3 py-1 font-semibold"> Trang {currentPage} / {totalPages} </p>
                <button
                      className={`mx-1 px-3 py-1 font-semibold bg-gray-300 rounded w-20 ${currentPage === totalPages ? 'text-gray-400' : 'text-black'}`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default Pagination