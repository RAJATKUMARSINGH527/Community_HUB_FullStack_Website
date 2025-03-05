import AppRouter from "./routes/AppRouter";
import "./index.css";
import ChatBox from "./components/ChatBox";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AppRouter />
      <ChatBox />
      <Footer />
    </>
  );
}

export default App;
