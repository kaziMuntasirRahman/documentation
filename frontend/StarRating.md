
/**
 * StarRating Component
 * 
 * This component renders a star rating system using Font Awesome stars.
 * 
 * Props:
 * - rating (number): The current rating value.
 * - setRating (function): Function to update the rating value.
 * 
 * State:
 * - displayRating (number): The rating value to be displayed, which can change on hover.
 * 
 * Usage:
 * ```jsx
 * import { useState } from "react";
 * import StarRating from "./StarRating";
 * 
 * const App = () => {
 *   const [rating, setRating] = useState(0);
 * 
 *   return (
 *     <div>
 *       <StarRating rating={rating} setRating={setRating} />
 *     </div>
 *   );
 * };
 * 
 * export default App;
 * ```
 * 
 * The component displays 5 stars. When a star is hovered over, the `displayRating` state is updated to reflect the hovered star.
 * When the mouse leaves the star, the `displayRating` state reverts to the current `rating` prop.
 * When a star is clicked, the `setRating` function is called to update the rating.
 * 
 * CSS Classes:
 * - `text-[#e49d34]`: Applied to stars that are part of the current rating or hovered over.
 * - `text-[#D0D0D0]`: Applied to stars that are not part of the current rating.
 * - `cursor-pointer`: Changes the cursor to a pointer when hovering over the stars.
 * - `brightness-100`: Sets the brightness of the stars.
 * - `px-1`: Adds horizontal padding to the stars.
 * - `text-7xl`: Sets the size of the stars.
 */
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const [displayRating, setDisplayRating] = useState(rating);

  return (
    <section className="flex items-center justify-center mx-auto">
      {
        Array(5).fill().map((_, index) =>
          <FaStar
            key={index}
            onMouseOver={() => setDisplayRating(index + 1)}
            onMouseLeave={() => setDisplayRating(rating)}
            onClick={() => setRating(index + 1)}
            className={`${displayRating > index ? "text-[#e49d34]" : "text-[#D0D0D0]"} cursor-pointer brightness-100 px-1 text-7xl`} />
        )
      }
    </section>
  );
};

export default StarRating;