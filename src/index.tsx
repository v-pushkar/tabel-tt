import ReactDOM from "react-dom";
import React,{useMemo} from "react";
import { Column, useTable, useFlexLayout } from 'react-table'
import { BasicTable } from "views/Components/Common/Table/BasicTable/BasicTable";

import App from "./App/App"



ReactDOM.render(
    <React.StrictMode><App/></React.StrictMode>,
    document.getElementById("root")
  );