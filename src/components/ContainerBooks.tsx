import "./ContainerBooks.scss";
import LitleBook from "./LitleBook";
import booksContext from "../Context/Context";

import { inBooks, books } from "../Interface";
import { useContext, useEffect } from "react";

export default function ContainerBooks() {
  /*
  setGetLocaStorage: funcion para poder guardar, quitar extrael los datos de localStorage
  isSearch: 
  searchInfo:
  valueSelect:
  setQuantity:
  */
  const {
    setGetLocaStorage,
    isSearch,
    searchInfo,
    valueSelect,
    setQuantity,
    reset,
  } = useContext(booksContext);

  //ISBN:extraemos el localStorage
  //count: para contar la cantidad de libros filtrados, la misma cantidad de libros que aparecen en el tipo buscado se almacenara en esta variable count
  let ISBN = setGetLocaStorage();
  let count = 0;

  // este efecto es para cuando el count ya halla pasado por el proseso de filtrado, se envie al componente CarouselBooks
  useEffect(() => {
    setQuantity(count);
  }, [searchInfo, reset]);

  // El segundo parámetro es un array vacío para que el efecto se ejecute solo una vez al montar el componente

  // Esta funcion sirve para el filtrado de libros al igual qeu gracias por la variable cont tambien sirve para sacar la cantidad de libros que se esta filtrando en el tipo que pertenecen
  const typeOfSearch = (
    el: inBooks,
    index: number,
    valueSelect: string,
    isDesktop: boolean = false
  ): JSX.Element | undefined => {
    switch (valueSelect) {
      case "Titulo":
        if (new RegExp(`${searchInfo}`, "img").test(el.title)) {
          count++;
          return <LitleBook key={index} el={el} isInsSave={isDesktop} />;
        }

        break;
      case "Genero":
        if (new RegExp(`${searchInfo}`, "img").test(el.genre)) {
          count++;
          return <LitleBook key={index} el={el} isInsSave={isDesktop} />;
        }

        break;
      case "Autor":
        if (new RegExp(`${searchInfo}`, "img").test(el.author.name)) {
          count++;
          return <LitleBook key={index} el={el} isInsSave={isDesktop} />;
        }

        break;
      default:
        return <LitleBook key={index} el={el} />;
    }
  };

  return (
    <article className="grid-books">
      {isSearch ? (
        isSearch === "saved" ? (
          <>
            {books.map((el: inBooks, index: number) => {
              if (ISBN?.indexOf(el.ISBN) !== -1) {
                return typeOfSearch(el, index, valueSelect, true);
              }
            })}
          </>
        ) : (
          <>
            {books.map((el: inBooks, index: number) => {
              if (ISBN?.indexOf(el.ISBN) === -1) {
                return typeOfSearch(el, index, valueSelect);
              }
            })}
          </>
        )
      ) : (
        books.map((el: inBooks, index: number) =>
          // <LitleBook key={index} el={el} />
          typeOfSearch(el, index, valueSelect)
        )
      )}
    </article>
  );
}
