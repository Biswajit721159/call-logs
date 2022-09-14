import "./App.css";
import Sum from "./component/Sum";
import React,{useState} from "react";
function App() {


  let [arr, setarray] = useState([
    { name: "Biswajit Ghosh", mobile: "1111111111" },
    { name: "Subhankar Kumar Yadav", mobile: "2222222222" },
    { name: "SKY", mobile: "3333333333" },
    { name: "Subhan Senapati", mobile: "4444444444" },
    { name: "Saroj Kumar Manna", mobile: "5555555555" },
    { name: "Soumyadip Kar", mobile: "6666666666" },
    { name: "Indranil Chowdhury", mobile: "7777777777" },
    { name: "Akshy bera", mobile: "88888888888" },
    { name: "Arijit Das", mobile: "9999999999" },
    { name: "krishina Show", mobile: "1234567891" },
  ]);
  
  return (
    <>

      <Sum  nums={arr} />
    </>
  );
}

export default App;
