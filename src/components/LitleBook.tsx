import "./LitleBook.scss";
import { faBookmark, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { inBooks, books } from "../Interface";
import booksContext from "../Context/Context";
import { MouseEventHandler, useContext, useEffect, useState } from "react";

interface element {
  el?: inBooks;
  isInsSave?: boolean;
  deletIt?: boolean;
}

export default function LitleBook({ el, isInsSave, deletIt }: element) {
  const {
    setGetLocaStorage,
    setInfo,
    setShow,
    info,
    reset,
    setReset,
    query,
    setAllBooks,
    setCom,
  } = useContext(booksContext);
  const [isSave, setIsSave] = useState<boolean>(false);

  let ISBN = setGetLocaStorage();

  const sendInfo: MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      (e.target as Element).matches(".btn-delete-litleBook") ||
      (e.target as Element).matches(".btn-delete-litleBook *")
    ) {
      setGetLocaStorage(el?.ISBN, true);
      setReset(reset + 1);
    } else {
      if (el && setInfo && !query) {
        setInfo(el);
        setShow(true);
      }
      if (query) {
        setAllBooks(false);

        books.forEach((ele, index) => {
          if (el?.ISBN === ele.ISBN) {
            return setCom(index);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (ISBN) {
      setIsSave(ISBN.some((n) => el?.ISBN === n));
    }
  }, [info, reset]);

  return (
    <div
      className={
        isSave && !isInsSave
          ? "container-litleBook-saved"
          : "container-litleBook"
      }
      onClick={sendInfo}
    >
      {deletIt && isSave && (
        <FontAwesomeIcon
          className="btn-delete-litleBook"
          icon={faCircleXmark}
        />
      )}
      <h4 className="title-litleBook">{el?.title}</h4>
      <img src={el?.cover} alt="img-book" className="img-litleBook" />

      {isSave && !isInsSave && (
        <FontAwesomeIcon
          className="saves-icon saves-icon-litleBook"
          icon={faBookmark}
        />
      )}
    </div>
  );
}
