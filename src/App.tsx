import CarouserBooks from "./components/CarouserBooks";
import "./App.scss";
import "./normalize.css";
import { useContext } from "react";
import SavesBooks from "./components/SavesBooks";
import BookInfo from "./components/BookInfo";
import booksContext, { BooksProvider } from "./Context/Context";

function App() {
  const { saves } = useContext(booksContext);

  return (
    <>
      <header className="principal-header">
        <h1 className="principal-title">MyBooks</h1>
      </header>

      {/* Component carousel books */}
      <BooksProvider>
        <section className="section-1" id="section-1">
          <CarouserBooks />
          {saves ? <SavesBooks /> : <SavesBooks />}
          <BookInfo />
        </section>
      </BooksProvider>
    </>
  );
}

export default App;
