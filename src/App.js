import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import Stats from "./components/Stats";
import Form from "./components/Form";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <>
        <Header />
        <div className="container">
          <Form />
          <Stats />
          <FeedbackList />
        </div>
      </>
    </FeedbackProvider>
  );
}

export default App;
