import { useContext, useEffect, useState } from "react";
import { books } from "../Interface";
import booksContext from "../Context/Context";
import "./InfoBookDesktop.scss";

interface cont {
  com: number;
  classBookInfo: string;
}

export function InfoBookDesktop({ com, classBookInfo }: cont) {
  const { setGetLocaStorage } = useContext(booksContext);
  const [isSave, setIsSave] = useState(false);

  let ISBN = setGetLocaStorage();

  useEffect(() => {
    if (ISBN) {
      setIsSave(ISBN.some((n) => books[com]?.ISBN === n));
    }
  }, []);

  const saveInfo = () => {
    isSave
      ? setGetLocaStorage(books[com].ISBN, true)
      : setGetLocaStorage(books[com].ISBN, false);
    let ISBN = setGetLocaStorage();
    if (ISBN) {
      setIsSave(ISBN.some((n) => books[com].ISBN === n));
    }
  };

  return (
    <div
      className={`info-book-text-dekstop ${classBookInfo ? classBookInfo : ""}`}
    >
      <button
        title={isSave ? "quitar libro" : "gaurdar libro"}
        onClick={saveInfo}
        className={isSave ? "save-books btn-remove-saved" : "save-books"}
      >
        {isSave ? "Quitar" : "Leer mas tarde"}
      </button>
      <div className="firts-part-text-dekstop">
        <p className="synopsis-desktop">{books[com].synopsis}</p>
        <p className="gender-desktop">
          <span className="span-info">Genero:</span> {books[com].genre}
        </p>
        <p className="author-desktop">
          <span className="span-info">autor:</span>{" "}
          <i>{books[com].author.name}</i>
        </p>
        <p className="page-desktop">
          <span className="span-info">paginas: </span>
          {books[com].pages}
        </p>
        <p className="year-desktop">
          <span className="span-info">año: </span>
          {books[com].year}
        </p>
        <p className="ISBN-desktop">
          <span className="span-info">ISBN:</span> {books[com].ISBN}
        </p>
        <p>Otros Libros escrito por el autor: {books[com].author.name}</p>
        <ol className="list-autor-desktop">
          {books[com].author.otherBooks.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ol>
      </div>
      <div className="second-part-text-dekstop"></div>
    </div>
  );
}
