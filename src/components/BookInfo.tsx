import "./BookInfo.scss";
import { faCircleXmark, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useContext, useEffect, useState } from "react";
import { iniInfoState } from "../Interface";
import booksContext from "../Context/Context";

export default function BookInfo() {
  const { show, setShow, info, setInfo, setGetLocaStorage, reset } =
    useContext(booksContext);
  const [isSave, setIsSave] = useState<boolean>(false);

  // saver si el libro esta guardado
  let ISBN = setGetLocaStorage();

  useEffect(() => {
    ISBN = setGetLocaStorage();

    if (ISBN) {
      setIsSave(ISBN.some((n) => info.ISBN === n));
    }
  }, [info, reset]);

  // metodo para guardar el libro en el local
  const saveBook = () => {
    isSave
      ? setGetLocaStorage(info.ISBN, true)
      : setGetLocaStorage(info.ISBN, false);

    let ISBN = setGetLocaStorage();
    if (ISBN) {
      setIsSave(ISBN.some((n) => info.ISBN === n));
    }
  };

  return (
    <aside className={show ? "aside-info" : "aside-info-ative"}>
      <button
        title={show ? "" : "Cerral informacion"}
        className="quit-info-book"
      >
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="quit-info-book-btn"
          onClick={() => {
            if (setInfo) setInfo(iniInfoState);
            setShow(false);
          }}
        />
      </button>
      <h2 className="title-book-info">{info.title}</h2>
      <div className="container-img-info-book">
        <img
          src={info.cover}
          alt="imagen de la pelicula"
          className="img-book-info"
        />
        <p className="about-book-info">{info.synopsis}</p>
      </div>

      <div className="info-container-book">
        <p className="page-book-info">
          <span className="span-info">paginas:</span> {info.pages}
        </p>
        <p className="gender-book-info">
          <span className="span-info">genero:</span> {info.genre}
        </p>
        <p className="year-book-info">
          <span className="span-info">año:</span> {info.year}
        </p>
        <p className="ISBN-book-info">
          <span className="span-info">ISBN:</span> {info.ISBN}
        </p>
        <div className="author-container">
          <p className="author-book-info">
            <span className="span-info">autor:</span> {info.author.name}
          </p>
          <h4 className="title-otherBooks-info">
            Otros libros del Autor: {info.author.name}
          </h4>
          <ol className="other-book-info">
            {info.author.otherBooks.map((element: string, index: number) => (
              <li key={index}>{element}</li>
            ))}
          </ol>
        </div>
        <button className="save-btn-info" onClick={saveBook}>
          {isSave ? "Quital Libro" : "Guardar Libro"}
        </button>
        {isSave && (
          <FontAwesomeIcon
            className="saves-icon saves-icon-BookInfo"
            icon={faBookmark}
          />
        )}
      </div>
    </aside>
  );
}
