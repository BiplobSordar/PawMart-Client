import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null;

  return (
    <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
   
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 bg-primary text-white rounded-lg disabled:bg-gray-300 transition"
      >
        <ChevronLeft size={20} />
      </button>

      
      {Array.from({ length: totalPages }, (_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${Number(currentPage) === pageNum
                ?   "!bg-white !border !border-gray-300 !text-black" 
                :"!bg-primary !text-white"
              }`}
          >
            {pageNum}
          </button>
        );
      })}

     
      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 bg-primary text-white rounded-lg disabled:bg-gray-300 transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
