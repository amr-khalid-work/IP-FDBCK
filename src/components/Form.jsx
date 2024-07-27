import { useState, useRef, useContext, useEffect } from "react";
import Card from "./shared/Card";
import RatingRadios from "./RatingRadios";
import FeedbackContext from "../context/FeedbackContext";

function Form() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback, resetFeedbackEdit } =
    useContext(FeedbackContext);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      autoResizeTextarea(); // Adjust textarea size based on existing text
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    if (inputText === "" || inputText.length < 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newItemCard = { text, rating };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newItemCard);
        resetFeedbackEdit(); // Reset the edit state after updating
      } else {
        addFeedback(newItemCard);
      }

      setText("");
      setRating(10);
      setBtnDisabled(true);
      resetTextareaSize(); // Reset textarea size after submit
    }
  };

  const resetTextareaSize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How Would You Rate Us?</h2>
        <RatingRadios select={(rating) => setRating(rating)} />
        <textarea
          ref={textareaRef}
          onChange={handleTextChange}
          placeholder="Text our services..."
          value={text}
          rows="1"
          style={{ resize: "none", overflow: "hidden" }}
        />
        <button className="sub" type="submit" disabled={btnDisabled}>
          Submit
        </button>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default Form;
