import React, { useState } from 'react'

export default function Pagination({onchangePageNext,onchangePagePrevious}) {
let page =2
   
    return (
        <nav className="mt-4">
  <ul class="pagination justify-content-center">
   {page<=1 ?  
   <button type="button" className="btn btn-success" disabled>Previous</button>
    
 :  
 <button type="button" className="btn btn-success"  onClick={onchangePagePrevious}>Previous</button>

   }
   
    <li class="page-item mx-5">
    <button type="button" className="btn btn-success"  onClick={onchangePageNext}>Next</button>

    </li>
  </ul>
</nav>
    )
}
