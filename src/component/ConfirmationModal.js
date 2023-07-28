import React from "react";

const ConfirmationModal = ({ message, onCancel, onConfirm, isDarkMode }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode ? "bg-black bg-opacity-50" : "bg-black bg-opacity-50"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-lg ${
          isDarkMode ? "dark bg-gray-800" : ""
        }`}
      >
        <p
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? "text-black" : ""
          }`}
        >
          {message}
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className={`text-gray-600 px-4 py-2 rounded mr-2 ${
              isDarkMode ? "dark text-gray-700" : ""
            }`}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`bg-red-500 text-white px-4 py-2 rounded ${
              isDarkMode ? "dark bg-red-700" : ""
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
