
import React, { useState } from "react";
<link rel="stylesheet" href="index.css" />
export default function Sum() {


  //Usestate section ----
  const [mobileNumber, setmobileNumber] = useState("");
  const [SearchmobileNumber, setSearchmobileNumber] = useState("");

  const [map, setmap] = useState([]);
  const [call,setcall]=useState([]);

  const[searchcall,setsearchcall]=useState([]);

  const [table,settable]=useState(false);








  // searching  information 

  const callInfo = () => {
    let arr=[];
    for(let i=0;i<call.length;i++)
    {
      if(call[i][0]===SearchmobileNumber)
      {
        for(let j=0;j<call[i].length;j++)
        {
           arr.push(call[i][j]);
        }
      }
    }
    if(arr.length===0 || arr.length===1)
    {
      settable(false);
      alert( "sorry "+ SearchmobileNumber +" is not found any record!!");
      setSearchmobileNumber("");
    }
    else
    {
         settable(true);
         setSearchmobileNumber("");
         setsearchcall([...arr]);
    }
  };



  //process call info ----

  const processCall = () => {
    const val = checkNumber(mobileNumber);
    if (val === 0) 
    {
      alert("please type  10 digit number");
      settable(false);
    } 
    else 
    {

      const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
      let x = findoccarance(mobileNumber);
      const current = new Date();
      const date = ` ${ monthNames[current.getMonth()]} ${current.getDate()} , ${current.getHours()}:${current.getMinutes()+1}:${current.getSeconds()}`;
      if (x === 0) 
      {
        map.unshift({id:x+1,value:mobileNumber});
        call.push([mobileNumber,[date]]);
        setcall([...call]);
        setmap([...map]);
        setmobileNumber("");
        settable(false);
      } 
      else 
      {
         for(let i=0;i<map.length;i++)
         {
           if(map[i].value==mobileNumber)
           {
            let id=map[i].id+1;
            let value=map[i].value;
            for(let j=i-1;j>=0;j--)
            {
              map[j+1]=map[j];
            }
            map[0]={id,value};
            setmap([...map]);
            break;
           }
         }

         for(let i=0;i<call.length;i++)
         {
          if(call[i][0]===mobileNumber)
          {
            call[i].push(date);
            setcall([...call]);
            break;
          }
         }
         setmobileNumber("");
         settable(false);
      }
    }
  };


  function checkNumber(callNo) 
  {
    let j;
    for (j = 0; j < callNo.length; j++) 
    {
      if (callNo[j] >= "0" && callNo[j] <= "9") 
      {
        continue;
      } 
      else 
      {
        break;
      }
    }
    if (j < callNo.length || j < 10 || j > 10) 
    {
      return 0;
    }
    return 1;
  }



  function findoccarance(callNo) 
  {
    let count = 0;
    for (let i = 0; i < map.length; i++) 
    {
      if (map[i].value == callNo) 
      {
        count++;
      }
    }
    return count;
  }





//delete phone number 

const Delete = (id,Mobile)=>{
  let narr = map.filter((user, index) => {
    return index !== id;
  });
  setmap([...narr]);

  let arr=call.filter((user,index)=>{
    return (call[index][0]!=Mobile) ;
  });

  settable(false);
  setcall([...arr]);

}
//delete indivisual call record

const Deletecall = (Mobile,ind)=>{

    let narr=searchcall.filter((value,i)=>{
      return i!=ind;
    })
    setsearchcall([...narr]);
    
    for(let i=0;i<map.length;i++)
    {
       if(map[i].value==Mobile)
       {
         map[i].id=map[i].id-1;
       }
    }
    setmap([...map]);
    
    for(let i=0;i<call.length;i++)
    {
      if(call[i][0]==Mobile)
      {
         let arr=call[i].filter((value,j)=>{
           return j!=ind;
         })
         call[i]=arr;
         setcall([...call]);
      }
    }


  }











  return (
    <>
      <div className="header">
        <h3>Call Log for your system</h3>
      </div>
      <div className="main">
        <div className="child1">
          <div className="c1d1">
            <div className="mini1">
              <form name="form1">
                <label htmlFor="pCall">Process Call : </label>
                <input
                  type="text"
                  id="callNo"
                  placeholder="Enter a number"
                  value={mobileNumber}
                  onChange={(e) => {
                    setmobileNumber(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={processCall}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="mini2">
              <form name="form2">
                <label htmlFor="pCall ">Call History : </label>
                <input
                  type="text"
                  id="findNo"
                  placeholder="Enter a number"
                  value={SearchmobileNumber}
                  onChange={(e) => {
                    setSearchmobileNumber(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-warning mx-2"
                  onClick={callInfo}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="c1d2">
            {
            (table==true)?
            <table className="table2 ">
              <tbody id="cInfo">
               {
                  searchcall.map((value,ind)=>(
                    <th key={ind}>
                      {
                          (ind==0)? <td ><button type="button" className="btn btn-light col">{value}</button></td> :
                          <td ><button type="button" className="btn btn-danger col" onClick={(e)=>Deletecall(searchcall[0],ind)}>{value}</button></td>
                      }
                    </th>
                  ))
                }
              </tbody>
            </table>:" "
          }
          </div>
          
        </div>
        <div className="child2">
          <div className="c2center">
            <table id="myTable">
              <thead>
                <tr>
                  <td className="htr" colSpan="2">
                    <h4>Call Log For Your System-</h4>
                  </td>
                </tr>
              </thead>
              <tbody id="callLog">
                {map.map((name, index) => (
                  <tr key={index}>
                    <th scope="row" style={{fontSize: 30}}>{name.value}</th>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success mx-2 rounded-circle"
                      >
                        {" "}
                        {name.id}
                      </button>
                      <button
                  className="btn btn-danger mx-4"
                  onClick={(e) => Delete(index,name.value)}
                >
                  Delete User
                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
