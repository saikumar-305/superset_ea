import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState("kh");

  const changeLanguage = (event) => {
    setLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <React.Fragment>
      <TextField
        size="small"
        fullWidth
        variant="outlined"
        value={lang}
        onChange={(event) => changeLanguage(event)}
        select
      >
        <MenuItem value="" key="">
          {" "}
        </MenuItem>
        <MenuItem value="en" key="en">
          English
        </MenuItem>
        <MenuItem value="kh" key="kh">
          Khmer
        </MenuItem>
      </TextField>
    </React.Fragment>
  );
};

export default LanguageSelector;
