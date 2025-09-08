import React from "react";
import { FaSearch, FaTimes, FaInbox } from "react-icons/fa";

export default function DistributorApplications({
  searchDistributorQuery,
  setSearchDistributorQuery,
  isLoadingDistributorQueries,
  distributorQueryError,
  distributorQueries,
  setSelectedDistributor,
  setNotes,
  setIsDistributorModalOpen,
}) {
  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden border border-[#3a3a3a]">
      {/* Header Section */}
      <div className="px-6 py-5 bg-[#1e1e1e] border-b border-[#3a3a3a]">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">
              Distributor Applications
            </h2>
          </div>
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#a0a0a0] h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search by company, contact name, or email..."
              className="bg-[#292929] text-white pl-10 pr-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#54bb74] border border-[#3a3a3a] focus:border-[#54bb74] transition-colors text-base placeholder-gray-500"
              value={searchDistributorQuery}
              onChange={(e) => setSearchDistributorQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-0">
        {isLoadingDistributorQueries ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
            <p className="text-gray-300">
              Loading distributor applications...
            </p>
          </div>
        ) : distributorQueryError ? (
          <div className="mx-6 my-4 bg-red-900/20 border border-red-700/30 text-red-200 px-4 py-3 rounded-md flex items-center">
            <FaTimes className="mr-3 flex-shrink-0" />
            <span className="text-base">{distributorQueryError}</span>
          </div>
        ) : distributorQueries.length === 0 ? (
          <div className="bg-[#292929] mx-6 my-4 p-10 rounded-lg text-center border border-[#3a3a3a]">
            <FaInbox className="mx-auto text-4xl text-[#a0a0a0] mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">
              No applications found
            </h3>
            <p className="text-[#a0a0a0] text-base">
              {searchDistributorQuery
                ? "No results match your search."
                : "No distributor applications have been received yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-[#3a3a3a]">
                <thead className="bg-[#292929]">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider">
                      Company Details
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider">
                      Contact Information
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider">
                      Location & Experience
                    </th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-[#1e1e1e] divide-y divide-[#3a3a3a]">
                  {distributorQueries
                    .filter((query) => {
                      if (!searchDistributorQuery) return true;
                      const search = searchDistributorQuery.toLowerCase();
                      return (
                        query.company?.toLowerCase().includes(search) ||
                        "" ||
                        query.name?.toLowerCase().includes(search) ||
                        "" ||
                        query.contactName?.toLowerCase().includes(search) ||
                        "" ||
                        query.email?.toLowerCase().includes(search) ||
                        ""
                      );
                    })
                    .map((query, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#292929] transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">
                              {query.company || "N/A"}
                            </span>
                            {query.website && (
                              <a
                                href={
                                  query.website.startsWith("http")
                                    ? query.website
                                    : `https://${query.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#54bb74] hover:underline text-xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                ({query.website.replace(/^https?:\/\//, "")})
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="block text-white">
                              {query.name || query.contactName || "N/A"}
                            </span>
                            <span className="block text-xs text-gray-400">
                              {query.title || ""}
                            </span>
                            <a
                              href={`mailto:${query.email}`}
                              className="text-[#54bb74] hover:underline text-xs block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {query.email || "N/A"}
                            </a>
                            {query.phoneNumber && (
                              <a
                                href={`tel:${query.phoneNumber}`}
                                className="text-[#54bb74] hover:underline text-xs block"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {query.phoneNumber}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="block text-white">
                              {query.country || "N/A"}
                            </span>
                            <span className="block text-xs text-gray-400">
                              {query.experience || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDistributor(query);
                              setNotes(query.notes || "");
                              setIsDistributorModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-[#54bb74] hover:bg-[#3da05e] text-white rounded-md text-xs font-medium transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
