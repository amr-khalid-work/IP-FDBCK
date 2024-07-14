import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function ItemCard({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card reverse={false}>
      <div className="itmNum">{item.rating}</div>
      <div className="icon-container">
        <button
          onClick={() => editFeedback(item)}
          className="editIco"
          aria-label="Edit Feedback"
        >
          <FaEdit color="black" />
        </button>
        <button
          onClick={() => deleteFeedback(item.id)}
          className="closeIco"
          aria-label="Delete Feedback"
        >
          <FaTimes color="black" />
        </button>
      </div>
      <div className="itmContent">{item.text}</div>
    </Card>
  );
}

export default ItemCard;
