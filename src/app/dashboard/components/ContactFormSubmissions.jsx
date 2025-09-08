import React from "react";
import { FaSearch, FaTimesCircle, FaInbox, FaSort } from "react-icons/fa";

export default function ContactFormSubmissions({
  searchQuery,
  setSearchQuery,
  isLoadingQueries,
  queryError,
  filteredQueries,
  truncatedMessages,
  setTruncatedMessages,
  handleViewMessage,
}) {
  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden border border-[#3a3a3a]">
      {/* Header Section */}
      <div className="px-6 py-5 bg-[#1e1e1e] border-b border-[#3a3a3a]">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">
              Contact Form Submissions
            </h2>
            {/* <p className="text-[#a0a0a0] text-base">View and manage all contact form submissions</p> */}
          </div>
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#a0a0a0] h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              className="bg-[#292929] text-white pl-10 pr-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#54bb74] border border-[#3a3a3a] focus:border-[#54bb74] transition-colors text-base placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-0">
        {isLoadingQueries ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
            <p className="text-gray-300">Loading contact queries...</p>
          </div>
        ) : queryError ? (
          <div className="mx-6 my-4 bg-red-900/20 border border-red-700/30 text-red-200 px-4 py-3 rounded-md flex items-center">
            <FaTimesCircle className="mr-3 flex-shrink-0" />
            <span className="text-base">{queryError}</span>
          </div>
        ) : filteredQueries.length === 0 ? (
          <div className="bg-[#292929] mx-6 my-4 p-10 rounded-lg text-center border border-[#3a3a3a]">
            <FaInbox className="mx-auto text-4xl text-[#a0a0a0] mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">
              No queries found
            </h3>
            <p className="text-[#a0a0a0] text-base">
              {searchQuery
                ? "No results match your search. Try different keywords."
                : "No contact form submissions have been received yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#3a3a3a]">
                <thead className="bg-[#292929]">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white  tracking-wider cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        <FaSort className="text-gray-500 text-xs" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-lg  font-bold text-gray-300 hover:text-white  tracking-wider cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Email</span>
                        <FaSort className="text-gray-500 text-xs" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white  tracking-wider cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Subject</span>
                        <FaSort className="text-gray-500 text-xs" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white  tracking-wider cursor-pointer">
                      <div className="flex items-center space-x-1">
                        <span>Message</span>
                        <FaSort className="text-gray-500 text-xs" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#1e1e1e] divide-y divide-[#3a3a3a]">
                  {filteredQueries.map((query, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-[#1e1e1e]" : "bg-[#252525]"
                      } hover:bg-[#2d2d2d] transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-[#93cfa2] font-medium">
                          {query.name || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-400 group">
                          <a
                            href={`mailto:${query.email}`}
                            className="hover:text-[#93cfa2] transition-colors"
                            title="Click to email"
                          >
                            {query.email || "N/A"}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-400">
                          {query.subject || "No Subject"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div
                            id={`message-${index}`}
                            className="text-base text-gray-400 max-w-xs truncate"
                            ref={(el) => {
                              if (el && query.message) {
                                const isTruncated =
                                  el.scrollWidth > el.clientWidth ||
                                  el.scrollHeight > el.clientHeight;
                                if (
                                  isTruncated !==
                                  truncatedMessages[`message-${index}`]
                                ) {
                                  setTruncatedMessages((prev) => ({
                                    ...prev,
                                    [`message-${index}`]: isTruncated,
                                  }));
                                }
                              }
                            }}
                          >
                            {query.message || "No message content"}
                          </div>
                          {truncatedMessages[`message-${index}`] && (
                            <button
                              onClick={() =>
                                handleViewMessage(
                                  query.message,
                                  `message-${index}`
                                )
                              }
                              className=" text-[#54BB74] hover:text-[#48a064] focus:outline-none transition-colors"
                              title="View full message"
                            >
                              <span>view more</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - Add this if you implement pagination later */}
            {/* <div className="bg-[#2d2d2d] px-6 py-3 flex items-center justify-between border-t border-[#3a3a3a]">
            <div className="text-sm text-[#a0a0a0]">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">{filteredQueries.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-md bg-[#3a3a3a] text-[#a0a0a0] hover:bg-[#4a4a4a] disabled:opacity-50" disabled={true}>
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-[#54bb74] text-white hover:bg-[#4aaa64] disabled:opacity-50" disabled={filteredQueries.length <= 10}>
                Next
              </button>
            </div>
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
