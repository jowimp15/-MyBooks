import "./Books.scss";
import { inBooks } from "../Interface";
import React, { useContext, useEffect, useState } from "react";
import booksContext from "../Context/Context";

interface BooksProps {
  el?: inBooks;
  classBook?: string;
}

export default function Books({ el, classBook }: BooksProps) {
  const { setInfo, setShow, setGetLocaStorage, query } =
    useContext(booksContext);
  const [isSave, setIsSave] = useState<boolean>(false);

  let ISBN = setGetLocaStorage();

  useEffect(() => {
    if (ISBN) {
      setIsSave(ISBN.some((n) => el?.ISBN === n));
    }
  }, []);

  // metodo para guardar libro en el local y tambien para mandar informaciondel libr al componete BookInfo
  const saveInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).matches(".save-books")) {
      isSave
        ? setGetLocaStorage(el?.ISBN, true)
        : setGetLocaStorage(el?.ISBN, false);
      let ISBN = setGetLocaStorage();
      if (ISBN) {
        setIsSave(ISBN.some((n) => el?.ISBN === n));
      }
    } else {
      if (el && setInfo && !query) {
        setInfo(el);
        setShow(true);
      }
    }
  };

  return (
    <div
      className={`books ${
        !query && "books-fade-in"
      } ${classBook} books-observe `}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => saveInfo(e)}
      onAnimationEnd={(e) => {
        (e.target as Element).classList.remove("books-fade-in");
      }}
    >
      <h2 className="title-book">{el?.title}</h2>
      {!query ? (
        <button
          title={isSave ? "Quitar libro de guardado" : "Guardar libro"}
          className={isSave ? "save-books btn-remove-saved" : "save-books"}
        >
          {isSave ? "Quitar" : "Leer mas tarde"}
        </button>
      ) : (
        ""
      )}
      <div className="container-img ">
        <img src={el?.cover} alt="img-books" className="img-books" />
      </div>
      {!query && (
        <>
          <p className="footer-book">{el?.synopsis}</p>
          <div className="data-book">
            <p className="page">page: {el?.pages}</p>
            <div className="aunthor-date-genre">
              <p className="gender">Genero: {el?.genre}</p>
              <p>
                autor: <i>{el?.author.name}</i>
              </p>
            </div>
            <p className="year">año: {el?.year}</p>
          </div>
        </>
      )}
    </div>
  );
}
