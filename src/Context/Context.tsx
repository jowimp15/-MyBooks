import { createContext, ReactNode, useState } from "react";
import { iniInfoState, inBooks } from "../Interface";

interface contextProps {
  children: ReactNode;
}

type callbackLocalstorage = () => void;

export interface BooksTypeContext {
  allBooks: boolean;
  setAllBooks: React.Dispatch<React.SetStateAction<boolean>>;
  saves: boolean;
  setSaves: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  info: inBooks;
  setInfo: React.Dispatch<React.SetStateAction<inBooks>>;
  reset: number;
  setReset: React.Dispatch<React.SetStateAction<number>>;
  isSearch: boolean | "saved";
  setIsSearch: React.Dispatch<React.SetStateAction<boolean | "saved">>;
  searchInfo: string;
  setSearchInfo: React.Dispatch<React.SetStateAction<string>>;
  valueSelect: string;
  setValueSelect: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  query: boolean;
  setQuery: React.Dispatch<React.SetStateAction<boolean>>;
  com: number;
  setCom: React.Dispatch<React.SetStateAction<number>>;

  setGetLocaStorage: (
    data?: string,
    boo?: boolean,
    calback?: callbackLocalstorage
  ) => null | string[];
}

const booksContext = createContext<BooksTypeContext>({} as BooksTypeContext);

const BooksProvider = ({ children }: contextProps) => {
  const [reset, setReset] = useState(0);

  // para cambiar a explorar o ver todos
  const [allBooks, setAllBooks] = useState<boolean>(false);

  // Para mostral el apartado de guardado
  const [saves, setSaves] = useState<boolean>(false);

  // Para mandar informe al BookInfo del libro
  const [info, setInfo] = useState<inBooks>(iniInfoState);

  // para activar la ventada de informacion
  const [show, setShow] = useState<boolean>(false);

  // Para activar el el COntainerBooks en modo de busqueda o enseñal todos
  const [isSearch, setIsSearch] = useState<boolean | "saved">(false);

  // Pasando informacion del campo de buscado al COntainerBooks
  const [searchInfo, setSearchInfo] = useState<string>("");

  // enviar informacion del select al ContainerBooks
  const [valueSelect, setValueSelect] = useState<string>("Titulo");

  // Para Enviar la cantidad del tipo
  const [quantity, setQuantity] = useState<number>(0);

  // para saver si el hancho d ela pantalla es dekstop o tablets para abajo
  const [query, setQuery] = useState<boolean>(window.innerWidth >= 1200);

  const [com, setCom] = useState<number>(0);

  // esto avisa cuando este en dekstop o no
  let desktopQuery = window.matchMedia("(min-width: 1200px)");
  desktopQuery.addEventListener("change", (e) => setQuery(e.matches));

  // para guardar los datos en el localStorage
  const setGetLocaStorage = (data?: string, boo?: boolean) => {
    //creando el localStorage
    if (!localStorage.getItem("books")) {
      let Books: string[] = [];
      localStorage.setItem("books", JSON.stringify(Books));
    }

    if (data && boo) {
      // Quitando
      let datos: string | null = localStorage.getItem("books");

      if (datos) {
        let json: string[] = JSON.parse(datos);
        if (json) {
          json = json.filter((el: string) => el !== data);
          datos = JSON.stringify(json);
          localStorage.setItem("books", datos);
        }
      }
    } else if (data && !boo) {
      // Guardando
      let datos: string | null = localStorage.getItem("books");
      if (datos) {
        let json: string[];
        json = JSON.parse(datos);
        if (json) {
          json.push(data);
          datos = JSON.stringify(json);
          localStorage.setItem("books", datos);
        }
      }
    } else {
      // retornando el Arreglo de Guardados
      let datos: string | null = localStorage.getItem("books");
      if (datos) {
        return JSON.parse(datos);
      }
    }
    return null;
  };

  const data: BooksTypeContext = {
    allBooks,
    setAllBooks,
    saves,
    setSaves,
    info,
    setInfo,
    show,
    setShow,
    setGetLocaStorage,
    reset,
    setReset,
    isSearch,
    setIsSearch,
    searchInfo,
    setSearchInfo,
    valueSelect,
    setValueSelect,
    quantity,
    setQuantity,
    query,
    setQuery,
    com,
    setCom,
  };

  return <booksContext.Provider value={data}>{children}</booksContext.Provider>;
};

export { BooksProvider };
export default booksContext;
