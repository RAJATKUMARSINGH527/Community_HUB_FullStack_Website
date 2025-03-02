import AppRouter from "./routes/AppRouter";
import './index.css';
import ChatBox from "./components/ChatBox";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <AppRouter />
      <ChatBox/>
      <Footer/>
    </div>
  );
}

export default App;
