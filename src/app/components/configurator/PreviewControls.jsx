"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaEye,
  FaSave,
  FaFolderOpen,
  FaMousePointer,
  FaMouse,
  FaArrowsAlt,
  FaSearchPlus,
  FaSearchMinus,
  FaInfo,
  FaHeart,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromFavorites,
  clearFavorites,
} from "../../redux/slices/favoritesSlice";

export const PreviewControls = ({
  isPreviewMode,
  setIsPreviewMode,
  config,
  cables,
  onSaveConfig,
  onLoadConfig,
  handleOpenSaveModal,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow] = useState(3); // Number of items to show at once
  const wishlistRef = useRef(null);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  // Reset when favorites change
  useEffect(() => {
    // No need for carousel state anymore
  }, [favorites]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setShowWishlistModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wishlistRef]);

  const guideRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    console.log("favorites", favorites.items);
    const checkIfMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleTouch = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <>
      {/* Navigation Guide */}
      <div
        className="absolute top-24 left-8 z-50 flex gap-2"
        ref={guideRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouch}
      >
        <button
          className={`p-2 rounded-full bg-[#50C878] text-white transition-all shadow-lg ${
            isHovered ? "bg-gray-700" : "hover:scale-110 hover:bg-gray-700"
          }`}
          title="View Navigation Guide"
          aria-expanded={isHovered}
        >
          <FaInfo size={16} />
        </button>

        {(isHovered || (isMobile && isHovered)) && (
          <div className="absolute -left-4 top-12 z-[101] w-64 p-4 bg-white rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
            <h3 className="font-bold text-gray-800 mb-3">Navigation Guide</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {isMobile ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">
                      👆
                    </span>
                    <span>One finger drag to rotate</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">✌️</span>
                    <span>Two fingers drag to pan</span>
                  </li> */}
                  <li className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium shrink-0">
                      🤏
                    </span>
                    <span>Pinch to zoom in/out</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <FaMousePointer className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Left-click and drag to rotate</span>
                  </li>
                  {/* <li className="flex items-start gap-2">
                    <FaMouse className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Right-click and drag to pan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaArrowsAlt className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Middle-click and drag to zoom</span>
                  </li> */}
                  <li className="flex items-start gap-2">
                    <FaSearchPlus className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Scroll up to zoom in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaSearchMinus className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Scroll down to zoom out</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="absolute top-24 right-8 z-50 flex gap-2">
        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          title={isPreviewMode ? "Exit Preview Mode" : "Enter Preview Mode"}
        >
          <FaEye size={16} />
        </button>

        {/* Wishlist Button */}
        <div className="relative" ref={wishlistRef}>
          <button
            className={`p-2 rounded-full ${
              showWishlistModal
                ? "bg-rose-500 text-white"
                : "bg-gray-800 text-rose-400 hover:bg-rose-900"
            } transition-all relative`}
            onClick={() => setShowWishlistModal(!showWishlistModal)}
            title="View Wishlist"
          >
            <FaHeart size={16} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {showWishlistModal && (
            <div className="absolute -right-14 sm:right-12 mt-2 w-80 bg-black rounded-lg shadow-xl z-50">
              <div className="p-3 flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <FaHeart className="text-rose-500" /> Wishlist
                  {favorites.length > 0 && (
                    <span className="text-xs font-normal text-white">
                      ({favorites.length}{" "}
                      {favorites.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </h3>
                {favorites.length > 0 && (
                  <button
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(clearFavorites());
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="max-h-80 flex">
                {favorites.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 mb-3">
                      <FaHeart className="h-6 w-6 text-rose-500" />
                    </div>
                    <p className="text-sm text-gray-500">
                      No pendants in your wishlist yet.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-nowrap overflow-x-auto pb-4 px-2">
                    {favorites.map((pendant) => (
                      <div key={pendant.id} className="group relative p-2 ">
                        <div className="flex flex-col items-center text-center">
                          {pendant.image ? (
                            <div className="relative h-14 w-14 rounded-full bg-gray-900 overflow-visible mb-1 group">
                              <img
                                src={pendant.image}
                                alt={pendant.name}
                                className="h-full w-full object-cover"
                              />
                              <button
                                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-rose-500 rounded-full text-white text-xs font-bold hover:bg-rose-600 transition-colors"
                                title="Remove from Wishlist"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(removeFromFavorites(pendant.id));
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                              <FaHeart className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <p className="text-xs font-medium text-white line-clamp-2 h-8 flex items-center">
                            {pendant.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => {
            onSaveConfig(config, cables);
            handleOpenSaveModal(); // This will hide the nav
          }}
          title="Save Configuration"
        >
          <FaSave size={16} />
        </button>

        <button
          className="p-2 rounded-full bg-gray-800 text-gray-300 hover:opacity-90 transition-all"
          onClick={() => {
            onLoadConfig();
            handleOpenSaveModal();
          }}
          title="Load Configuration"
        >
          <FaFolderOpen size={16} />
        </button>
      </div>
    </>
  );
};

export default PreviewControls;
