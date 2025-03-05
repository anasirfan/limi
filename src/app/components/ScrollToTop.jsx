import useScrollTop from "../hooks/use-scroll-top";
import { IoIosArrowRoundUp } from "react-icons/io";

const ScrollToTop = () => {
    const { stick, onClickHandler } = useScrollTop();
    if (stick) {
        return (
            <button
  aria-label="Scroll to top"
  type="button"
  className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300"
  onClick={onClickHandler}
>
  <IoIosArrowRoundUp className="text-3xl" />
</button>

        );
    }
    return null;
};

export default ScrollToTop;