import React, { useState } from "react";

export default function CheckBoxs({ name, handleChangeChecked,checked }) {
  return (
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        checked={checked}
        name={name}
        onClick={handleChangeChecked}
      />
      <label class="form-check-label" for="inlineCheckbox1">
        {name}
      </label>
    </div>
  );
}
