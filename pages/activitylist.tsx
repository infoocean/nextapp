import {
    Card,
    Table,
    Stack,
    Avatar,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TableHead,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    OutlinedInput,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  //import { Pagination } from "@material-ui/lab";
  
  import Link from "next/link";
  import React, { useEffect, useState } from "react";
  import { BiShow } from "react-icons/bi";
  import { FiEdit } from "react-icons/fi";
  import { RiDeleteBin5Fill } from "react-icons/ri";
  import { useTheme } from "@mui/material/styles";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import Pagination from '@mui/material/Pagination';
import usePagination from "./layouts/pagination";
  
  export default function Activitylist(){
    const [activites, setactivites] = useState([]);
    const [searchquery, setsearchquery] = useState("");
    const [searchdata,setsearchdata] = useState([]);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleSearch=(e:any)=>{
      setsearchquery(e.target.value);
      if(e.target.value===""){
        setactivites(searchdata);
      }else{
        const filterres = searchdata.filter((item:any)=>{
          return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        const dtd = filterres;
        setactivites(dtd);
      }
    }


  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(activites.length / PER_PAGE);
  const DATA = usePagination(activites, PER_PAGE);

  const handleChange = (e:any, p:any) => {
    setPage(p);
    DATA.jump(p);
  };
  
    const handleClickOpen = (id:any) => {
      setOpen(true);
      console.log(id);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [status, setstatus] = React.useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
      setstatus(event.target.value as string);
      if(event.target.value===""){
        setactivites(searchdata);
      }else{
        const filterresult = searchdata.filter((item:any)=>{
          return item.status.includes(event.target.value);
        });
        const dtdd = filterresult;
        setactivites(dtdd);
      }
    };
  
    useEffect(() => {
      const url ="https://api-school.mangoitsol.com/api/getactivity";
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4",
            },
          });
          const json = await response.json();
          //console.log(json.data);
          setactivites(json.data);
          setsearchdata(json.data);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }, []);
    return (
      <>
        <Container component="main" style={{ backgroundColor: "white" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container>
            <Card>
            <OutlinedInput
                    onInput={(e) => handleSearch(e)}
                    id="search"
                    type="search"
                    name="search"
                    value={searchquery}
                    placeholder="Search..."
                    multiline
                  />
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>Activity Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DATA.currentData() &&
                      DATA.currentData().map((item:any, key:any) => {
                        const {
                          id,
                          name,
                          price,
                          status,
                          type,
                          startdate,
                          enddate,
                          description,
                        } = item;
                        return (
                          <TableRow
                            key={key}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{price}</TableCell>
                            <TableCell align="left">{status}</TableCell>
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">{startdate}</TableCell>
                            <TableCell align="left">{enddate}</TableCell>
                            <TableCell align="left">
                              <Link href={`/activitydetails/${id}`}>
                                <Button variant="outlined" size="small">
                                  <BiShow />
                                </Button>
                              </Link>
                              <Link href="/editactivity">
                                <Button variant="outlined" size="small">
                                  <FiEdit />
                                </Button>
                              </Link>
                              <Button
                                onClick={()=>handleClickOpen(id)}
                                variant="outlined"
                                size="small"
                              >
                                <RiDeleteBin5Fill />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
            </Card>
          </Container>
          <div>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Delete Activity?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose} autoFocus>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      
        </Container>
      </>
    );
  };
  
