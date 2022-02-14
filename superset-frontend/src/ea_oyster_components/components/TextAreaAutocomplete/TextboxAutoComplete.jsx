// Copyright 2021 (C), Express Analytics

import React from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "@webscopeio/react-textarea-autocomplete/style.css";
import "./TextAreaAutoComplete.css";

const Item = ({ entity }) => {
  return <div>{`${entity}`}</div>;
};

export default function TextboxAutoComplete({placeholder, value, onChangeHandler, choices}) {
  
  return (
      <ReactTextareaAutocomplete
        placeholder={placeholder}
        value={value}
        style={{ minHeight: "40px" }}
        onChange={onChangeHandler}
        loadingComponent={() => <span>Loading</span>}
        spellCheck="false"
        minChar={0}
        trigger={{
          "@": {
            dataProvider: (token) => {
              return choices.filter((item) => item.startsWith(token));
            },
            component: Item,
            output: (item) => item
          }
        }}
      />
  );
}