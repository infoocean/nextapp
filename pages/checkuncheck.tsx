import React,{ useEffect, useState } from "react";

function Deletemultiplerow()
{    
    const [userData, setUserdata]= useState<any>([]);
    const url = `https://api-school.mangoitsol.com/api/getactivity`;
        const fetchData = async () => {
          try {
            const response = await fetch(url, {
              headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4",
              },
            });
            const json = await response.json();
            console.log(json.data);
            setUserdata(json.data);
          } catch (error) {
            console.log("error", error);
          }
        };
    useEffect( ()=>{
        fetchData();
    },[]);

    const handleChange=(e:any)=>{ 
        const { name, checked}= e.target;
      if(name==="allselect")
      {
      const checkedvalue = userData.map( (user:any)=>{ return {...user, isChecked:checked}});
      console.log(checkedvalue);
      setUserdata(checkedvalue);
      } else{
       const checkedvalue= userData.map( (user:any)=>
       user.name ===name? {...user, isChecked:checked}:user);
       console.log(checkedvalue);
       setUserdata(checkedvalue);
      }


    }

    const handlealldelete = async()=>{
        const checkedinputvalue=[];
      for(let i=0; i<userData.length; i++)
      {
        if(userData[i].isChecked===true)
        {
            checkedinputvalue.push(parseInt(userData[i].id));
        }
        else
        {
         alert("Please select at least one checkbix");
        }
      }
    }
   
    return(
        <React.Fragment>
         <div className="row">
          <div className="col-sm-12">
          <h2 className="mt-4 mb-4 fw-bold">
              Delete Multiple row data in React Js  
            </h2>
            <button className="btn btn-danger mb-3" onClick={ ()=>{ handlealldelete()}}>All Delete </button>
            <form className="form w-100">
            <table className="table">
            <thead>            
            <tr>
            <th>
            <input type="checkbox" name="allselect" checked= { !userData.some( (user:any)=>user?.isChecked!==true)} onChange={ handleChange}  />                
            </th>
            <th>Sr. No</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
              { userData.map( (getusers:any, index:any)=>(         
            <tr  key={index}>
            <th> <input type="checkbox" name={ getusers.name} checked={getusers?.isChecked|| false } onChange={ handleChange }  /></th>
            <td>{ index+1} </td>
            <td>{ getusers.name} </td>
            <td><button className="btn btn-danger">Delete</button></td>
            </tr>
              ))
            }
   
            </tbody>
            </table>
            </form>
            </div>
            </div>
            
        </React.Fragment>
    );
}

export default Deletemultiplerow;
