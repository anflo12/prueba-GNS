import React from 'react'
import * as XLSX from 'xlsx' 
import * as FileSaver from "file-saver"
export default function Modal({book}) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel=()=>{
        let ws = XLSX.utils.json_to_sheet([book]);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, book.title + fileExtension);
    }

    return (
        <div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Image Book</h5>
        
      </div>
      <div class="modal-body d-block mx-auto">
      <img src={book.image}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" onClick={exportToExcel} class="btn btn-primary">Dowload Info.</button>
      </div>
    </div>
  </div>
  </div>
        </div>
    )
}
