import React, { useEffect } from 'react'
import * as XLSX from 'xlsx' 
import * as FileSaver from "file-saver"
export default function Modal({book, showModal, toggleModal}) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

console.log("book",book)
const dismissModal =()=>{
  toggleModal(false)
}
const exportToExcel=()=>{
        let ws = XLSX.utils.json_to_sheet([book]);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, book.title + fileExtension);
    }

    return (
        <div>
<div className={` modal  ${showModal ? 'd-block' : ''}`} tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Image Book</h5>
        
      </div>
      <div class="modal-body d-block mx-auto">
      <img src={book.image}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={dismissModal}>Close</button>
        <button type="button" onClick={exportToExcel} class="btn btn-primary">Dowload Info.</button>
      </div>
    </div>
  </div>
  </div>
        </div>
    )
}
