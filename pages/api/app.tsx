import { Table } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import react, { useEffect, useState } from 'react'

export default function MyApp() {
    const [activites, setactivites] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])
    
  //get ACTIVITY data
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
      setactivites(json.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange=(e:any)=>{ 
    const { name, checked}= e.target;
  if(name==="allselect")
  {
  const checkedvalue = activites.map( (user:any)=>{ return {...user, isChecked:checked}});
  console.log(checkedvalue);
  setactivites(checkedvalue);
  } else{
   const checkedvalue= activites.map( (user:any)=>
   user.username ===name? {...user, isChecked:checked}:user);
   console.log(checkedvalue);
   setactivites(checkedvalue);
  }

}


  return (
    <>
      <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                        name="allselect" checked= { !activites.some((user:any)=>user?.isChecked!==true)} onChange={ handleChange} 
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>TYPE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>START DATE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={100}>END DATE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={150}>AMOUNT(if paid)</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    activites.map((item: any, key: any) => {
                        const {
                          id,
                          name,
                          price,
                          type,
                          startdate,
                          status,
                          enddate,
                          description,
                          image,
                        } = item;
                        return (
                          <TableRow
                            key={key}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox  checked={item?.isChecked|| false } onChange={ handleChange } />
                            </TableCell>
                            <TableCell align="left">
                              1
                            </TableCell >
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">{startdate}</TableCell>
                            <TableCell align="left">{enddate}</TableCell>
                            <TableCell align="left">{status}</TableCell>
                            <TableCell align="left">{price}</TableCell>
                            <TableCell align="left">
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
    </>
  )
}