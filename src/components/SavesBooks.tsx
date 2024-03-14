import "./SavesBooks.scss";
import LitleBook from "./LitleBook";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import booksContext from "../Context/Context";
import { useContext, useEffect, useState } from "react";
import { books, inBooks } from "../Interface";

if (!localStorage.getItem("delete-book-save")) {
  localStorage.setItem("delete-book-save", "false");
}

let local: boolean = JSON.parse(
  localStorage.getItem("delete-book-save") as string
);

export default function SavesBooks() {
  const { saves, setSaves, setGetLocaStorage, reset } =
    useContext(booksContext);

  const [deletIt, setDeletIt] = useState<boolean>(local);

  const isInsSave = true;
  let ISBN = setGetLocaStorage();

  useEffect(() => {
    ISBN = setGetLocaStorage();
    localStorage.setItem("delete-book-save", JSON.stringify(deletIt));
  }, [deletIt, reset]);

  return (
    <aside className={saves ? "Saves-books savesBooks-active" : "Saves-books"}>
      <h2 className="saves-title">Lista de Lecturas</h2>
      <p className="quantity-books-saved">
        {`${ISBN?.length} Libros Guardados`}
      </p>
      <button
        
        title="remover este libro"
        className="btn-remove-book-saves"
        onClick={() => {
          setDeletIt(!deletIt);
        }}
      >
        <span
          className={
            deletIt ? "circle-select-saved-active" : "circle-select-saved"
          }
        ></span>
        Remover
      </button>

      <div className="container-saved-books">
        {ISBN?.length ? (
          books.map((el: inBooks, index: number) => {
            if (ISBN?.some((n) => el?.ISBN === n))
              return (
                <LitleBook
                  key={index}
                  el={el}
                  isInsSave={isInsSave}
                  deletIt={deletIt}
                />
              );
          })
        ) : (
          <p className="not-saves-text">No hay Libros Guardados</p>
        )}
      </div>
      <button
        className="btn-quit-saves"
        title="salir de la pestaña de guardado"
        onClick={() => setSaves && setSaves(!saves)}
      >
        <i className="fas fa-heart"></i>

        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </aside>
  );
}
