import React from "react";
import { FaSearch, FaTimes, FaInbox, FaSortUp, FaSortDown } from "react-icons/fa";

export default function CommunitySubscriptions({
  searchRegistration,
  setSearchRegistration,
  registrationsLoading,
  registrationsError,
  registrations,
  registrationSortField,
  registrationSortDirection,
  handleRegistrationSort,
  registrationCurrentPage,
  setRegistrationCurrentPage,
  registrationsPerPage,
}) {
  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden border border-[#3a3a3a]">
      {/* Header Section */}
      <div className="px-6 py-5 bg-[#1e1e1e] border-b border-[#3a3a3a]">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-white">
              Community Subscriptions
            </h2>
            <p className="text-[#a0a0a0] text-base">
              View and manage all community email subscriptions
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[#a0a0a0] h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Search by email or community type..."
              className="bg-[#292929] text-white pl-10 pr-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#54bb74] border border-[#3a3a3a] focus:border-[#54bb74] transition-colors text-base placeholder-gray-500"
              value={searchRegistration}
              onChange={(e) => setSearchRegistration(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-0">
        {registrationsLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 border-t-4 border-[#93cfa2] border-solid rounded-full animate-spin mb-6"></div>
            <p className="text-gray-300">Loading subscriptions...</p>
          </div>
        ) : registrationsError ? (
          <div className="mx-6 my-4 bg-red-900/20 border border-red-700/30 text-red-200 px-4 py-3 rounded-md flex items-center">
            <FaTimes className="mr-3 flex-shrink-0" />
            <span className="text-base">{registrationsError}</span>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-[#292929] mx-6 my-4 p-10 rounded-lg text-center border border-[#3a3a3a]">
            <FaInbox className="mx-auto text-4xl text-[#a0a0a0] mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">
              No subscriptions found
            </h3>
            <p className="text-[#a0a0a0] text-base">
              {searchRegistration
                ? "No results match your search."
                : "No community subscriptions have been made yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-[#3a3a3a]">
                <thead className="bg-[#292929]">
                  <tr>
                    <th
                      className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider cursor-pointer"
                      onClick={() => handleRegistrationSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {registrationSortField === "email" &&
                          (registrationSortDirection === "asc" ? (
                            <FaSortUp className="ml-1" />
                          ) : (
                            <FaSortDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider cursor-pointer"
                      onClick={() => handleRegistrationSort("communityType")}
                    >
                      <div className="flex items-center">
                        Community Type
                        {registrationSortField === "communityType" &&
                          (registrationSortDirection === "asc" ? (
                            <FaSortUp className="ml-1" />
                          ) : (
                            <FaSortDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-lg font-bold text-gray-300 hover:text-white tracking-wider cursor-pointer"
                      onClick={() => handleRegistrationSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Date Subscribed
                        {registrationSortField === "createdAt" &&
                          (registrationSortDirection === "asc" ? (
                            <FaSortUp className="ml-1" />
                          ) : (
                            <FaSortDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#1e1e1e] divide-y divide-[#3a3a3a]">
                  {registrations
                    .filter((reg) => {
                      if (!searchRegistration) return true;
                      const search = searchRegistration.toLowerCase();
                      return (
                        reg.email?.toLowerCase().includes(search) ||
                        "" ||
                        reg.communityType?.toLowerCase().includes(search) ||
                        ""
                      );
                    })
                    .sort((a, b) => {
                      let valueA = a[registrationSortField];
                      let valueB = b[registrationSortField];

                      if (registrationSortField === "createdAt") {
                        valueA = new Date(valueA);
                        valueB = new Date(valueB);
                      } else {
                        valueA = String(valueA).toLowerCase();
                        valueB = String(valueB).toLowerCase();
                      }

                      if (valueA < valueB) {
                        return registrationSortDirection === "asc" ? -1 : 1;
                      }
                      if (valueA > valueB) {
                        return registrationSortDirection === "asc" ? 1 : -1;
                      }
                      return 0;
                    })
                    .slice(
                      (registrationCurrentPage - 1) * registrationsPerPage,
                      registrationCurrentPage * registrationsPerPage
                    )
                    .map((reg, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#292929] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-white">
                            {reg.email || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#54bb74] bg-opacity-20 text-[#93cfa2]">
                            {reg.communityType || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {new Date(reg.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {Math.ceil(registrations.length / registrationsPerPage) > 1 && (
              <div className="px-6 py-4 bg-[#1e1e1e] border-t border-[#3a3a3a] flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing{" "}
                  <span className="font-medium">
                    {(registrationCurrentPage - 1) * registrationsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      registrationCurrentPage * registrationsPerPage,
                      registrations.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {registrations.length}
                  </span>{" "}
                  results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setRegistrationCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    disabled={registrationCurrentPage === 1}
                    className={`px-3 py-1 rounded-md ${
                      registrationCurrentPage === 1
                        ? "bg-[#333333] text-gray-600 cursor-not-allowed"
                        : "bg-[#333333] text-white hover:bg-[#444444]"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setRegistrationCurrentPage((prev) => prev + 1)
                    }
                    disabled={
                      registrationCurrentPage * registrationsPerPage >=
                      registrations.length
                    }
                    className={`px-3 py-1 rounded-md ${
                      registrationCurrentPage * registrationsPerPage >=
                      registrations.length
                        ? "bg-[#333333] text-gray-600 cursor-not-allowed"
                        : "bg-[#333333] text-white hover:bg-[#444444]"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
