"use client";
import { FaCamera, FaSave } from "react-icons/fa";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaLock,
  FaBell,
  FaHome,
  FaCreditCard,
  FaCheck,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";
import {
  updatePersonalInfo,
  updateNotificationPreferences,
  addAddress,
  updateAddress,
  updateUserAvatar,
  removeAddress,
  setDefaultAddress,
  addPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
} from "../../../redux/slices/userSlice";

export default function AccountSettings({ user, onUserUpdate }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  console.log(user);
  // Form state for editing (to avoid direct Redux updates until form submission)
  const [formData, setFormData] = useState({
    username: user.data.username || "",
    email: user.data.email || "",
    phone: user.data.phone || "",
    password: user.data.password || "••••••••••",
  });

  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormData, setAddressFormData] = useState({
    type: "Home",
    name: user?.data?.username || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Payment method form state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    type: "Credit Card",
    name: user?.name || "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [editingPaymentId, setEditingPaymentId] = useState(null);

  // Profile picture upload state
  const fileInputRef = useRef(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Handle form submission
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Helper function to fetch fresh user data
  const fetchUserData = async () => {
    const token = localStorage.getItem("limiToken");
    if (!token) return null;

    try {
      const response = await fetch(
        "https://api1.limitless-lighting.co.uk/client/user/profile",
        {
          headers: { Authorization: token },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user data");

      const userData = await response.json();
      localStorage.setItem("limiUser", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");

    try {
      // Prepare the update data
      const updateData = {};
      // updateData.email = formData.email
      // updateData.phone = formData.phone
      // updateData.username = formData.username
      // Only include fields that have changed and are not the password mask
      if (formData.email !== user?.data?.email) {
        updateData.email = formData.email;
      }
      if (formData.phone !== user?.data?.phone) {
        updateData.phone = formData.phone;
      }
      if (formData.username !== user?.data?.username) {
        updateData.username = formData.username;
      }
      if (
        formData.password &&
        formData.password !== "••••••••••" &&
        formData.password.length >= 6
      ) {
        updateData.password = formData.password;
      }

      // If there's nothing to update, just exit edit mode
      if (Object.keys(updateData).length === 0) {
        setEditMode(false);
        return;
      }

      // Get the token from localStorage
      const token = localStorage.getItem("limiToken");
      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      // Make the API call to update profile
      const response = await fetch(
        "https://api1.limitless-lighting.co.uk/client/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Fetch fresh user data after successful update
      const updatedUser = await fetchUserData();
      console.log("updatedUser : ", updatedUser);
      if (!updatedUser) {
        throw new Error("Profile updated but failed to refresh user data");
      }

      // Update the user data in the parent component and Redux store
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      // Update local state
      setFormData({
        username: updatedUser.data.username || "",
        email: updatedUser.data.email || "",
        phone: updatedUser.data.phone || "",
        password: "••••••••••", // Reset to masked password
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveError(
        error.message || "Failed to update profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle notification settings
  const toggleNotification = (type) => {
    dispatch(
      updateNotificationPreferences({
        [type]: !user.notifications[type],
      })
    );
  };

  // Handle address functions
  const handleAddAddress = (newAddress) => {
    dispatch(addAddress(newAddress));
  };

  const handleUpdateAddress = (id, addressData) => {
    dispatch(updateAddress({ id, ...addressData }));
  };

  const handleRemoveAddress = (id) => {
    dispatch(removeAddress(id));
  };

  const handleSetDefaultAddress = (id) => {
    dispatch(setDefaultAddress(id));
  };

  // Handle payment method functions
  const handleAddPaymentMethod = (newPaymentMethod) => {
    dispatch(addPaymentMethod(newPaymentMethod));
  };

  const handleUpdatePaymentMethod = (id, paymentData) => {
    dispatch(updatePaymentMethod({ id, ...paymentData }));
  };

  const handleRemovePaymentMethod = (id) => {
    dispatch(removePaymentMethod(id));
  };

  const handleSetDefaultPaymentMethod = (id) => {
    dispatch(setDefaultPaymentMethod(id));
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit");
      return;
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        "Invalid file type. Please upload a JPG, PNG, or GIF image."
      );
      return;
    }

    setUploadingMedia(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const token = localStorage.getItem("limiToken");
      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      // Upload profile picture using PUT method
      const response = await fetch(
        "https://api1.limitless-lighting.co.uk/client/user/profile/picture",
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("response : ", response);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Upload failed with status: ${response.status}`
        );
      }

      // Get the updated user data from the response
      const updatedUser = await response.json();
      console.log("updatedUser : ", updatedUser);
      if (!updatedUser || !updatedUser.profilePicture) {
        throw new Error("Failed to update profile picture");
      }

      // Update the avatar in Redux store and localStorage
      dispatch(updateUserAvatar(updatedUser.profilePicture.url));

      // Update parent component with new user data
      // if (onLogin) {
      //   onLogin(updatedUser);
      // }
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadError(
        error.message ||
          "Failed to upload profile picture. Please try again or contact support."
      );
    } finally {
      setUploadingMedia(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle remove profile picture
  const handleRemovePicture = async () => {
    if (
      !window.confirm("Are you sure you want to remove your profile picture?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("limiToken");
      if (!token) {
        throw new Error("Authentication required. Please log in again.");
      }

      const response = await fetch(
        "https://api1.limitless-lighting.co.uk/client/user/profile/picture",
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to remove profile picture"
        );
      }

      // Get updated user data
      const profileResponse = await fetch(
        "https://api1.limitless-lighting.co.uk/client/user/profile",
        {
          headers: { Authorization: token },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch updated profile");
      }

      const updatedUser = await profileResponse.json();
      // Update Redux store with empty avatar
      dispatch(updateUserAvatar({ url: "" }));

      // Update parent component with the new user data
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      // Show success message
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Error removing profile picture:", error);
      setUploadError(error.message || "Failed to remove profile picture");
    }
  };

  // Render profile tab
  const renderProfileTab = () => (
    <div className="space-y-8">
      <div className="bg-[#1f1f1f] rounded-xl p-0 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Personal Information
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Update your personal details and contact information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaUser className="text-gray-500 text-sm" />
                </div>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:border-[#54BB74] focus:ring-2 focus:ring-[#54BB74]/20 focus:outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-transparent">
                    {formData.username || (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaEnvelope className="text-gray-500 text-sm" />
                </div>
                {editMode ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:border-[#54BB74] focus:ring-2 focus:ring-[#54BB74]/20 focus:outline-none transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-transparent">
                    {formData.email || (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <span className="text-xs text-gray-500">Optional</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaMobileAlt className="text-gray-500 text-sm" />
                </div>
                {editMode ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-700 focus:border-[#54BB74] focus:ring-2 focus:ring-[#54BB74]/20 focus:outline-none transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <div className="bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-transparent">
                    {formData.phone || (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FaLock className="text-gray-500 text-sm" />
                </div> */}
                {editMode ? (
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="bg-[#292929] text-white w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-700 focus:border-[#54BB74] focus:ring-2 focus:ring-[#54BB74]/20 focus:outline-none transition-all duration-200"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                    {formData.password &&
                      formData.password !== "••••••••••" && (
                        <div className="mt-2">
                          <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                formData.password.length < 4
                                  ? "bg-red-500 w-1/4"
                                  : formData.password.length < 8
                                  ? "bg-yellow-500 w-1/2"
                                  : "bg-green-500 w-full"
                              }`}
                            />
                          </div>
                          <div className="mt-1 text-xs text-gray-400">
                            {formData.password.length < 4
                              ? "Weak password"
                              : formData.password.length < 8
                              ? "Could be stronger"
                              : "Strong password"}
                          </div>
                          {formData.password.length > 0 &&
                            formData.password.length < 8 && (
                              <p className="mt-1 text-xs text-amber-400">
                                Use at least 8 characters for a stronger
                                password
                              </p>
                            )}
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="flex items-center bg-[#292929] text-white w-full pl-10 pr-4 py-2.5 rounded-lg border border-transparent">
                    <span className="tracking-widest">••••••••••••</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!editMode && (
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="inline-flex items-center gap-2 bg-[#292929] hover:bg-[#333] text-white px-4 py-2.5 rounded-lg transition-colors duration-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#54BB74]/20 sm:w-auto w-full"
              >
                <FaEdit className="text-sm" />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
          {editMode && (
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-800 mt-6">
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  // Reset form to original user data
                  setFormData({
                    username: user?.username || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                    password: user?.password || "",
                  });
                }}
                className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-[#292929] hover:bg-[#333] rounded-lg border border-gray-700 transition-colors duration-200 w-full sm:w-auto"
              >
                Cancel
              </button>
              <div className="relative w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#54BB74] to-[#3a9b5a] hover:from-[#48a064] hover:to-[#2e8a4f] rounded-lg shadow-md hover:shadow-[#54BB74]/20 transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto ${
                    isSaving ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="text-sm" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                {saveError && (
                  <div className="absolute left-0 right-0 -bottom-6 text-xs text-red-400 text-center">
                    {saveError}
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700/50">
          Profile Settings
        </h3>

        {/* Profile Picture Section */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800/50 shadow-lg mb-8">
          <h4 className="text-lg font-medium text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#54BB74] rounded-full"></span>
            Profile Picture
          </h4>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-[#333] group-hover:ring-[#54BB74] transition-all duration-300">
                  {user?.data?.profilePicture?.url && (
                    <Image
                      src={user?.data?.profilePicture?.url || ""}
                      alt={user?.data?.username}
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.data?.username || "User"
                        )}&background=54BB74&color=fff`;
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                      <FaCamera className="text-white text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full mt-6 sm:mt-0">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingMedia}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#54BB74] to-[#3a9b5a] hover:from-[#4aaa67] hover:to-[#2d8a4f] text-white px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 w-full sm:w-auto shadow-lg hover:shadow-[#54BB74]/30 hover:-translate-y-0.5"
                >
                  {uploadingMedia ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaEdit />
                      Change Picture
                    </>
                  )}
                </button>

                {user?.data?.profilePicture?.url && (
                  <button
                    type="button"
                    onClick={handleRemovePicture}
                    disabled={uploadingMedia}
                    className="flex items-center justify-center gap-2 bg-[#2a2a2a] hover:bg-[#333] text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 border border-gray-700/50 hover:border-gray-600 w-full sm:w-auto"
                  >
                    <FaTrash className="text-red-500" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-2">
                {uploadError && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="text-red-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="text-green-400 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-green-400 text-sm">
                      Profile picture updated successfully!
                    </p>
                  </div>
                )}

                <p className="text-gray-400 text-xs mt-3">
                  Recommended size: 512x512px. Max file size: 2MB. Formats: JPG,
                  PNG, or GIF.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#54BB74] rounded-full"></span>
            Notification Preferences
          </h4>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "email",
                icon: <FaEnvelope className="text-xl" />,
                title: "Email Notifications",
                description: "Receive order updates and promotions via email",
                checked: user?.notifications?.email || false,
              },
              {
                id: "sms",
                icon: <FaMobileAlt className="text-xl" />,
                title: "SMS Notifications",
                description: "Get important updates and alerts via SMS",
                checked: user?.notifications?.sms || false,
              },
              {
                id: "app",
                icon: <FaBell className="text-xl" />,
                title: "Push Notifications",
                description: "Receive updates in the LIMI mobile app",
                checked: user?.notifications?.app || false,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] hover:bg-[#202020] p-5 rounded-xl border border-gray-800/50 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-[#54BB74]/10 rounded-lg text-[#54BB74]">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-white font-medium">{item.title}</h5>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.checked}
                      onChange={() => toggleNotification(item.id)}
                    />
                    <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 sm:peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-[#54BB74] after:shadow-lg"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render addresses tab
  const renderAddressesTab = () => {
    const handleAddressSubmit = (e) => {
      e.preventDefault();
      if (editingAddressId) {
        handleUpdateAddress(editingAddressId, addressFormData);
      } else {
        handleAddAddress(addressFormData);
      }
      setShowAddressForm(false);
      setEditingAddressId(null);
      setAddressFormData({
        type: "Home",
        name: user?.data?.username || "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    };

    const startEditAddress = (address) => {
      setAddressFormData({
        type: address.type,
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      });
      setEditingAddressId(address.id);
      setShowAddressForm(true);
    };
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Your Addresses
          </h3>

          <div className="space-y-4">
            {user?.addresses?.map((address) => (
              <div key={address.id} className="bg-[#292929] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <FaHome className="text-[#54BB74]" />
                    <div className="font-medium text-white">{address.type}</div>
                    {address.default && (
                      <span className="bg-[#54BB74]/20 text-[#54BB74] text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditAddress(address)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleRemoveAddress(address.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="text-gray-300 mb-4">
                  <div>{address.name}</div>
                  <div>{address.street}</div>
                  <div>
                    {address.city}, {address.state} {address.zip}
                  </div>
                  <div>{address.country}</div>
                </div>

                {!address.default && (
                  <button
                    onClick={() => handleSetDefaultAddress(address.id)}
                    className="text-[#54BB74] text-sm hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}

            {(!user?.addresses || user.addresses.length === 0) && (
              <div className="text-gray-400 text-center py-6">
                No addresses yet. Add your first address below.
              </div>
            )}
          </div>

          <div className="mt-6">
            {showAddressForm ? (
              <form
                onSubmit={handleAddressSubmit}
                className="bg-[#292929] p-4 rounded-lg"
              >
                <h4 className="text-white font-medium mb-4">
                  {editingAddressId ? "Edit Address" : "Add New Address"}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Address Type
                    </label>
                    <select
                      value={addressFormData.type}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          type: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={addressFormData.name}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          name: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-300 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={addressFormData.street}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          street: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">City</label>
                    <input
                      type="text"
                      value={addressFormData.city}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          city: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={addressFormData.state}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          state: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      value={addressFormData.zip}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          zip: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Country</label>
                    <input
                      type="text"
                      value={addressFormData.country}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          country: e.target.value,
                        })
                      }
                      className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddressId(null);
                    }}
                    className="bg-[#1e1e1e] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
                  >
                    {editingAddressId ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
              >
                <FaPlus />
                <span>Add New Address</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render payment methods tab
  const renderPaymentMethodsTab = () => {
    const handlePaymentSubmit = (e) => {
      e.preventDefault();
      const last4 = paymentFormData.cardNumber.slice(-4);
      const paymentMethod = {
        ...paymentFormData,
        last4,
        cardNumber: undefined, // Don't store full card number
      };

      if (editingPaymentId) {
        handleUpdatePaymentMethod(editingPaymentId, paymentMethod);
      } else {
        handleAddPaymentMethod(paymentMethod);
      }

      setShowPaymentForm(false);
      setEditingPaymentId(null);
      setPaymentFormData({
        type: "Credit Card",
        name: user?.name || "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
    };

    return (
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Payment Methods
          </h3>

          <div className="space-y-4">
            {user?.paymentMethods?.map((method) => (
              <div key={method.id} className="bg-[#292929] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <FaCreditCard className="text-[#54BB74]" />
                    <div className="font-medium text-white">
                      {method.type} •••• {method.last4}
                    </div>
                    {method.default && (
                      <span className="bg-[#54BB74]/20 text-[#54BB74] text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPaymentId(method.id);
                        setPaymentFormData({
                          type: method.type,
                          name: method.name,
                          cardNumber: `•••• •••• •••• ${method.last4}`,
                          expiry: method.expiry,
                          cvv: "•••",
                        });
                        setShowPaymentForm(true);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="text-gray-300 mb-4">
                  <div>Expires: {method.expiry}</div>
                  <div>{method.name}</div>
                </div>

                {!method.default && (
                  <button
                    onClick={() => handleSetDefaultPaymentMethod(method.id)}
                    className="text-[#54BB74] text-sm hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            ))}
            {(!user?.paymentMethods || user.paymentMethods.length === 0) && (
              <div className="text-gray-400 text-center py-6">
                No payment methods yet. Add your first payment method below.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          {showPaymentForm ? (
            <form
              onSubmit={handlePaymentSubmit}
              className="bg-[#292929] p-4 rounded-lg"
            >
              <h4 className="text-white font-medium mb-4">
                {editingPaymentId
                  ? "Edit Payment Method"
                  : "Add New Payment Method"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-300 mb-2">Card Type</label>
                  <select
                    value={paymentFormData.type}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        type: e.target.value,
                      })
                    }
                    className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.name}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        name: e.target.value,
                      })
                    }
                    className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.cardNumber}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        cardNumber: e.target.value,
                      })
                    }
                    placeholder="•••• •••• •••• ••••"
                    className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={paymentFormData.expiry}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        expiry: e.target.value,
                      })
                    }
                    placeholder="MM/YY"
                    className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">CVV</label>
                  <input
                    type="text"
                    value={paymentFormData.cvv}
                    onChange={(e) =>
                      setPaymentFormData({
                        ...paymentFormData,
                        cvv: e.target.value,
                      })
                    }
                    placeholder="•••"
                    className="bg-[#1e1e1e] text-white w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#54BB74]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentForm(false);
                    setEditingPaymentId(null);
                  }}
                  className="bg-[#1e1e1e] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#54BB74] text-white px-4 py-2 rounded-md hover:bg-[#48a064] transition-colors"
                >
                  {editingPaymentId
                    ? "Update Payment Method"
                    : "Add Payment Method"}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowPaymentForm(true)}
              className="flex items-center gap-2 bg-[#292929] border border-gray-700 text-white px-4 py-2 rounded-md hover:bg-[#333] transition-colors"
            >
              <FaPlus />
              <span>Add Payment Method</span>
            </button>
          )}
        </div>

        <div className="mt-6 p-4 bg-[#1e1e1e] rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <FaShieldAlt className="text-[#54BB74]" />
            <div className="text-white font-medium">
              Secure Payment Processing
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Your payment information is encrypted and securely stored. We never
            store your full card details on our servers.
          </p>
        </div>
      </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "addresses":
        return renderAddressesTab();
      case "payment":
        return renderPaymentMethodsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Account Settings
            </h1>
            <p className="text-gray-400 mt-1">
              Manage your profile, addresses, and payment methods in one place
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#54BB74] animate-pulse"></span>
              <span>Active</span>
            </span>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="flex overflow-x-auto scrollbar-hide -mb-px">
            {[
              {
                id: "profile",
                icon: <FaUser className="hidden sm:block text-sm sm:text-lg" />,
                label: "Profile",
              },
              {
                id: "addresses",
                icon: <FaHome className="hidden sm:block text-sm sm:text-lg" />,
                label: "Addresses",
              },
              {
                id: "payment",
                icon: (
                  <FaCreditCard className="hidden sm:block text-sm sm:text-lg" />
                ),
                label: "Payment Methods",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3.5 font-medium text-sm flex items-center gap-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-[#54BB74]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#54BB74] to-[#3a9b5a] rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}
