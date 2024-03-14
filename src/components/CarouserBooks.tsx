import "./CarouserBooks.scss";
import Books from "./Books";
import ContainerBooks from "./ContainerBooks.tsx";
import {
  faChevronRight,
  faMagnifyingGlass,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { inBooks, books } from "../Interface.tsx";
import booksContext from "../Context/Context.tsx";
import { InfoBookDesktop } from "./InfoBookDesktop.tsx";

/*
 *  allBooks: para cambiar al modo de ver todos los libros o exploral
 * setAllBooks:
 * setSaves:
 * setGetLocaStorage:
 * setIsSearch:
 * isSearch:
 * setSearchInfo:
 * valueSelect:
 * setValueSelect:
 * quantity:
 * reset:
 * setReset:
 */
export default function CarouserBooks() {
  const {
    allBooks,
    setAllBooks,
    setSaves,
    setGetLocaStorage,
    setIsSearch,
    isSearch,
    setSearchInfo,
    valueSelect,
    setValueSelect,
    quantity,
    reset,
    setReset,
    query,
    com,
    setCom,
  } = useContext(booksContext);
  const [contador, setContador] = useState<boolean>(true);

  // evento storage /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const handleStorageChange = () => {
      // resetear los coponentes cuando este evento se ejecuta
      setReset(reset + 1);
    };

    // Agregar event listener cuando el componente se monta
    window.addEventListener("storage", handleStorageChange);

    // Quitar event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // se usa cuando se active el evento storage para poder resetear el componente y guardar los nuevs elementos gaurdados
  useEffect(() => {
    ISBN = setGetLocaStorage();
  }, [reset]);

  // intersectionObserver/////////////////////////////////////////////////////////////////////////////

  /*********** se extrae el elemento del componente que contiene los componente que observaremos***********/

  let refCarousel = useRef<HTMLDivElement | null>(null);
  /*
   * mediaQuery: se crea el matchMedia
   * watch: se crea la variable del intersectingIObserver
   */

  const mediaQuery = window.matchMedia(
    "(min-device-width: 768px) and (min-device-height: 500px)"
  );
  let watch: IntersectionObserver;

  /******* Se crea el callmack del intersecintObserver********/
  const observer: IntersectionObserverCallback = (etrie) => {
    etrie.forEach((entries) => {
      // veriicamos si esta intersectando
      if (entries.isIntersecting) {
        entries.target.classList.add("books-observe");
      } else {
        entries.target.classList.remove("books-observe");
      }
    });
  };

  /********** esta funcion es para instalar el observer, lo encerre en una funcion por que se repetira dos veses***********/
  const truePartObserver = () => {
    // la opciones del intersectingObserver
    const opt: IntersectionObserverOptions = {
      root: refCarousel?.current,
      rootMargin: "0px -50%",
    };

    // se declara el IntersectionObserver poniendo el callback(observer) y las opciones(opt)
    if (!watch) watch = new IntersectionObserver(observer, opt);

    // se extrae los elementos del contenedor que contiene los elementos se guarda en elementsBooks como HTMLCollection, se convierte en arreglo con el spreat y se recorre con un foreach y luego llamamos el metodo observe del IntersectionObserver que esta en watch
    const elementsBooks = refCarousel?.current?.children;
    if (elementsBooks) [...elementsBooks].forEach((e) => watch.observe(e));
  };

  /******* se crea la interface de la opcion del IntersectionObserver********/
  interface IntersectionObserverOptions {
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number | number[];
  }

  /******* Se crea el handler que hara la comparacion del matchMedia********/
  const handlerQueryChange = (e: MediaQueryListEvent) => {
    // cuando es verdadero se instalara el observer y cuando sea false de desinstalara el observer
    if (e.matches) truePartObserver();
    else if (watch) {
      watch.disconnect();
    }
  };

  /******* se agrega el evento al mediaQuery de escuchar cuando matchMedia coincida y ejecutamos el handler que creamos ********/
  mediaQuery.addEventListener("change", handlerQueryChange);

  /******* se pone este efecto es para cuando cargue el coponente se agrege el Observer ********/
  useEffect(() => {
    // comparamos que el hancho de la pantalla sea el adecuado y tambien que no este activado el modo de ver todos los elementos
    if (
      window.innerWidth >= 700 &&
      window.innerHeight >= 500 &&
      !allBooks &&
      !query
    )
      truePartObserver();
  }, [allBooks]);

  // Opteniedo datos del localStare///////////////////////////////////////////////////////////////////////////////////

  /*
   *  ISBN: se madna a llamar la funcion setGetLocaStorage para extrael los datos guardados
   *  generalOrSaved: se crea para gaurdar el valor de true o "saved" que nos ayudara a manejar el campo de busqueda de libros si se busca en guardado o en general
   */
  let ISBN = setGetLocaStorage();
  let generalOrSaved: "saved" | boolean;

  /******* se verifica si el valor de isSearch es "saved" o true para guardarlo en generalOrSaved, se hiso esto para no guardar el valor false por que no lo nesesitamos *******/
  if (!query)
    if (isSearch === true || isSearch === "saved") generalOrSaved = isSearch;
  // else generalOrSaved = isSearch;

  /****** se crea el manejador del para el campo de busqueda *******/
  const handlerSearchBook: React.FormEventHandler<HTMLInputElement> = (e) => {
    // se gaurda en value el valor del input cada vez que insertamos un caracter
    let value = (e.target as HTMLInputElement).value;

    // esta parte se hace para activar el modo de busqueda que en el componente se activa la forma de buscar en los componentes general(true) o en los guardados("saved")
    if (!query) {
      if (isSearch === false) {
        generalOrSaved = true;
      }
      setIsSearch(generalOrSaved);
    } else {
      setIsSearch(isSearch);
    }

    // se activa la ventana donde se mostrara los elementos
    setAllBooks(true);

    // se manda el valor del campo al componente containerBooks
    setSearchInfo(value);
  };

  /****** se crea el handler de manejar si elejir ver  los componentes guardados o generales al buscar ******/
  const handlerSavedOrGeneral: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    // si el btn es general se activa el modo de busqueda general(true) y se resetea el componete
    if ((e.target as Element).matches(".general")) {
      setIsSearch(true);
      setReset(reset + 1);
    }
    // si el btn es general se activa el modo de busqueda es guardado("saved") y se resetea el componete
    if ((e.target as Element).matches(".saved")) {
      setIsSearch("saved");
      setReset(reset + 1);
    }
    if ((e.target as Element).matches(".all")) {
      setIsSearch(false);
      setReset(reset + 1);
    }
  };

  // seleccion de busqueda////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * setValueSelect: mandar el valor de select al componete containerBook
   *setReset: para resetear el componente cada vez que elegimos el modo de buscar
   * **/

  // caundo toque all se busca por titulo y asi con los otros, por defecto se busca por titulo
  const handlerSelectValue: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    switch (e.target.value) {
      case "all":
        setValueSelect("Titulo");
        setReset(reset + 1);
        break;
      case "gender":
        setValueSelect("Genero");
        setReset(reset + 1);
        break;
      case "author":
        setValueSelect("Autor");
        setReset(reset + 1);
        break;
      default:
        setValueSelect("Titulo");
        setReset(reset + 1);
        break;
    }
  };

  // seleccion de busqueda para Dekstop////////////////////////////////////////////////////////////////////////////////////////////////////

  /*****  *****/
  const handlerSelectValueDekstop: React.MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    let Target = e.target as Element;

    e.currentTarget.classList.remove("titulo");
    e.currentTarget.classList.remove("genero");
    e.currentTarget.classList.remove("autor");

    if (Target.matches(".first-p")) {
      e.currentTarget.classList.add("titulo");
      setValueSelect("Titulo");
      setReset(reset + 1);
    } else if (Target.matches(".second-p")) {
      e.currentTarget.classList.add("genero");
      setValueSelect("Genero");
      setReset(reset + 1);
    } else if (Target.matches(".third-p")) {
      e.currentTarget.classList.add("autor");
      setValueSelect("Autor");
      setReset(reset + 1);
    } else {
      e.currentTarget.classList.add("titulo");
      setValueSelect("Titulo");
      setReset(reset + 1);
    }
  };
  //-------------------------------------------- ejecucioon
  return (
    <article className="carouser-father">
      <div className="container-search-book">
        <div className="container-data-book">
          {isSearch ? (
            <p>{`${quantity} Libros (${valueSelect})`}</p>
          ) : (
            <>
              <p>
                {`${books.length - (ISBN ? ISBN.length : 0)} Libros Disponible`}
              </p>
              <p>{`${ISBN?.length} Libros Guardados`}</p>
            </>
          )}
        </div>
        <div className="container-input-search">
          <input
            onInput={handlerSearchBook}
            type="text"
            placeholder={`Buscar por: ${valueSelect}`}
            className="search-books"
          />
          <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
        </div>
        {/* Seleccion de tipo de busqueda */}
        {query ? (
          <div
            className="select-search-books-div"
            onClick={handlerSelectValueDekstop}
          >
            <p className="first-p">Titulo</p>
            <p className="second-p">Genero</p>
            <p className="third-p">Autor</p>
          </div>
        ) : (
          <select
            className="select-search-books"
            title="Buscar por Autor, Titulo o Genero"
            onChange={handlerSelectValue}
          >
            <option
              style={{ backgroundColor: "#140236", color: "#e6e6e6bd" }}
              value="all"
            >
              Todos
            </option>
            <option
              style={{ backgroundColor: "#140236", color: "#e6e6e6bd" }}
              value="gender"
            >
              Genero
            </option>
            <option
              style={{ backgroundColor: "#140236", color: "#e6e6e6bd" }}
              value="author"
            >
              Autor
            </option>
          </select>
        )}
      </div>
      <div className="options">
        <button
          title={allBooks ? "Lsta detallada de los libro" : "Exploral libros"}
          className="all-books"
          onClick={() => {
            setAllBooks(!allBooks);
            if (query) {
              setIsSearch(!isSearch);
            } else {
              setIsSearch(true);
            }
            setSearchInfo("");
          }}
        >
          {allBooks
            ? "Exploral"
            : `${query ? "Ver lista detallada" : "Ver lista"}`}
        </button>
      </div>
      <div>
        {!allBooks ? (
          <p className="title-carousel">Exploral</p>
        ) : isSearch && !query ? (
          <div
            className={
              isSearch === true
                ? "container-countgeneral"
                : "container-countgeneral container-countgeneral-after"
            }
            onClick={handlerSavedOrGeneral}
          >
            <p className="general">General</p>
            <p className="saved">Guardados</p>
          </div>
        ) : (
          <div
            className={`container-countgeneral ${
              isSearch === true && "container-countgeneral-general"
            } ${isSearch === "saved" && "container-countgeneral-saved"}`}
            onClick={handlerSavedOrGeneral}
          >
            <p className="all">Todos</p>
            <p className="general">General</p>
            <p className="saved">Guardados</p>
          </div>
        )}
      </div>
      <div
        ref={refCarousel}
        className={
          allBooks
            ? "carouser-container widthContainerBooks"
            : "carouser-container "
        }
      >
        {allBooks ? (
          <ContainerBooks />
        ) : query ? (
          /////////////////////////////////////////////////////////////////////////////////// Comienzo del contenedor del slayer
          <>
            {contador ? (
              <>
                {books[com - 1] && (
                  <InfoBookDesktop
                    key={com - 1}
                    com={com - 1}
                    classBookInfo={"left-text"}
                  />
                )}
                <InfoBookDesktop
                  key={com}
                  com={com}
                  classBookInfo={"right-text"}
                />
              </>
            ) : (
              <>
                {books[com - 1] && (
                  <InfoBookDesktop
                    key={com + 1}
                    com={com + 1}
                    classBookInfo={"left-text"}
                  />
                )}
                <InfoBookDesktop
                  key={com}
                  com={com}
                  classBookInfo={"right-text"}
                />
              </>
            )}

            <div className="container-btn-book">
              {/***********************************************************************************************  btn back */}

              {!allBooks && books[com - 1] && (
                <FontAwesomeIcon
                  className="previus-componet"
                  icon={faAnglesLeft}
                  onClick={() => {
                    if (books[com - 1]) setCom(com - 1);
                    setContador(false);
                  }}
                />
              )}
              <div className="container-dekstop-book">
                {books[com - 2] && (
                  <Books
                    key={com - 2}
                    el={books[com - 2]}
                    classBook={`${contador && "last-book"}`}
                  />
                )}
                {books[com - 1] && (
                  <Books
                    key={com - 1}
                    el={books[com - 1]}
                    classBook={`${
                      contador ? "left-book" : "last-book-reverse"
                    }`}
                  />
                )}

                <Books
                  key={com}
                  el={books[com]}
                  classBook={`${
                    contador ? "center-book" : "left-book-reverse"
                  }`}
                />

                {books[com + 1] && (
                  <Books
                    key={com + 1}
                    el={books[com + 1]}
                    classBook={`${
                      contador ? "right-book" : "center-book-reverse"
                    }`}
                  />
                )}
                {books[com + 2] && (
                  <Books
                    key={com + 2}
                    el={books[com + 2]}
                    classBook={`${!contador && "right-book-reverse"}`}
                  />
                )}
              </div>
              {/************************************************************************************************ boton de next */}
              {!allBooks && books[com + 1] && (
                <FontAwesomeIcon
                  className="next-componet"
                  icon={faAnglesRight}
                  onClick={() => {
                    if (books[com + 1]) setCom(com + 1);
                    setContador(true);
                  }}
                />
              )}
            </div>
          </>
        ) : (
          /////////////////////////////////////////////////////////////////////////////////// final del contenedor del slayer

          <>
            {books.length ===
            JSON.parse(localStorage.getItem("books") as string).length ? (
              <div className="empty-books-container">
                <div className="empty-img-container">
                  <h2 className="empty-title">No hay libros Disponible</h2>
                </div>
              </div>
            ) : (
              books.map((el: inBooks, index: number) => {
                if (ISBN?.indexOf(el.ISBN) === -1)
                  return <Books key={index} el={el} />;
              })
            )}
          </>
        )}
      </div>
      {!query && (
        <button
          title="Abril panel de guardado"
          className="open-save-btn"
          onClick={() => setSaves && setSaves(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </article>
  );
}
