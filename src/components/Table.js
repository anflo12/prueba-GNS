import Axios from "axios";
import React, { useEffect, useState } from "react";
import CheckBoxs from "./CheckBoxs";
import Modal from "./Modal";
import Pagination from "./Pagination";

export default function Table({ searchData }) {
  const [Books, setBooks] = useState([]);
  const [Page, setPage] = useState(1);
  const [variablesControl, setvariablesControl] = useState({
    Count: "",
    hasData: false,
  });

  let initialChecks = [
    { label: "Title", status: false },
    { label: "Subtitle", status: false },
    { label: "Isbn13", status: false },
    { label: "Price", status: false },
    { label: "Url", status: false },
  ];

  const [checkedItems, setCheckedItems] = useState(initialChecks);
  const [checkBoxs, setcheckBoxs] = useState({});

  const urlBase = "https://api.itbook.store/1.0/search/";

  const getBooksSearch = async () => {
    if (!searchData) {
      searchData = "mongo";
    }

    try {
      let response = await Axios.get(`${urlBase}${searchData}/${Page}`);
      setBooks([...response.data.books]);

      setvariablesControl({
        ...variablesControl,
        Count: response.data.total,
      });
    } catch (error) {}
  };

  useEffect(() => {
    getBooksSearch();
  }, [searchData, Page]);

  const handleChangeChecked = (event) => {
    const {name,checked}= event.target
    let index = checkedItems.findIndex((item => item.label===name))
     let newState =[...checkedItems]
     newState[index]= checkedItems[index].status= checked
    setCheckedItems([newState])
     console.log(checkedItems)
    
  };

 

  const onchangePageNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onchangePagePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="mt-3">{variablesControl.Count} Resultados </p>

        <div>
          <Pagination
            onchangePageNext={onchangePageNext}
            onchangePagePrevious={onchangePagePrevious}
          />
          <p className="mt-3">Pagina {Page}</p>
        </div>
      </div>

      <div className="d-flex flex-row">
        <div>
          {Books.length != 0 ? (
            <table
              className="table-responsive table-bordered table-hover mt-0"
              id="table-books"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={` ${checkedItems.title ? "d-none" : ""}`}
                  >
                    Tittle
                  </th>
                  <th
                    scope="col"
                    className={` ${checkedItems.subtitle ? "d-none" : ""}`}
                  >
                    Subtittle
                  </th>
                  <th
                    scope="col"
                    className={` ${checkedItems.isbn13 ? "d-none" : ""}`}
                  >
                    Isbn13
                  </th>
                  <th
                    scope="col"
                    className={` ${checkedItems.price ? "d-none" : ""}`}
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className={` ${checkedItems.url ? "d-none" : ""}`}
                  >
                    Url
                  </th>
                </tr>
              </thead>
              {Books.map((book) => (
                <tbody>
                  <Modal book={book} />
                  <tr>
                    <td
                      className="w-75"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      className={` ${checkedItems.title ? "d-none" : ""}`}
                    >
                      <a className="text-black"> {book.title}</a>
                    </td>
                    <td className={` ${checkedItems.subtitle ? "d-none" : ""}`}>
                      {book.subtitle}
                    </td>
                    <td className={` ${checkedItems.isbn13 ? "d-none" : ""}`}>
                      {book.isbn13}
                    </td>
                    <td className={` ${checkedItems.price ? "d-none" : ""}`}>
                      {book.price}
                    </td>
                    <td className={` ${checkedItems.url ? "d-none" : ""}`}>
                      {book.url}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          ) : (
            <h1>No se encontraron resultados</h1>
          )}
        </div>

        <div className="flex-column mx-5 fixed">
          <p className="mt-4">
            <button
              class="btn btn-primary mx-auto d-block"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              +
            </button>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              {checkedItems.map((item) => (
                <CheckBoxs
                  name={item.label}
                  checked={item.status}
                  handleChangeChecked={handleChangeChecked}
                />
              ))}
              <button
                type="button"
                class="btn btn-primary mt-2"
                onClick={()=>{}}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
