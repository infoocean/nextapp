import {
    Card,
    Table,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    Box,
    Typography,
    Stack,
    Breadcrumbs,
    BoxProps,
    FormControl,
    TextField,
    Menu,
    MenuItem,
    Grid,
    InputLabel,
    Container,
    Select,
    SelectChangeEvent,
    IconButton,
  } from "@mui/material";
  import Link from "next/link";
  import React, { useEffect, useState } from "react";
  import { useForm, SubmitHandler } from "react-hook-form";
  import { FiEdit } from "react-icons/fi";
  import { RiDeleteBin5Fill } from "react-icons/ri";
  
  function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return <Box sx={{}} {...other} />;
  }
  
  enum custStatusEnum {
    Active = "1",
    InActive = "0",
    All="2"
  }

  enum custTypeEnum {
    All = "All",
    Free = "Free",
    Paid="Paid"
  }

  type FormValues = {
    status: custStatusEnum;
    type:custTypeEnum
  };
  
  export default function CustomerList() {
    const [users, setUsers] = useState([]);
    const [All, setAll] = useState(0);
    const [searchquery, setsearchquery] = useState("");
    const [searchdata, setsearchdata] = useState([]);
    const { register, handleSubmit } = useForm<FormValues>();
  

  
    //apply filter
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      console.log(data);
      setUsers([]);
      const reqData = {
        status: data.status,
      };
    };

  
    return (
      <>
       <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack style={{ marginTop: "10px" }}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                          <Stack spacing={1}>
                                            <InputLabel htmlFor="name">
                                              Customer Type
                                            </InputLabel>
                                            <FormControl fullWidth>
                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                size="small"
                                                defaultValue={"All"}
                                                {...register("type")}
                                              >
                                                <MenuItem value={"All"}>
                                                  All
                                                </MenuItem>
                                                <MenuItem value={"Free"}>
                                                  Free
                                                </MenuItem>
                                                <MenuItem value={"Paid"}>
                                                  Paid
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Stack>
                                        </Grid>
                                        <Grid item xs={12} lg={3}>
                                          <Stack spacing={1}>
                                            <InputLabel htmlFor="enddate">
                                              Customer Status
                                            </InputLabel>
                                            <FormControl fullWidth>
                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={2}
                                                {...register("status")}
                                                size="small"
                                              >
                                                 <MenuItem value={2}>
                                                  All
                                                </MenuItem>
                                                <MenuItem value={1}>
                                                  Active
                                                </MenuItem>
                                                <MenuItem value={0}>
                                                  InActive
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Stack>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          style={{ marginBottom: "10px" }}
                                        >
                                          <Button
                                            size="small"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ width: 150 }}
                                          >
                                            <b>Apply Filter</b>
                                            <span
                                              style={{
                                                fontSize: "2px",
                                                paddingLeft: "10px",
                                              }}
                                            >
                                              {/* {spinner === true ? (
                                              <CircularProgress color="inherit" />
                                            ) : (
                                              ""
                                            )} */}
                                            </span>
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Stack>
                                  </form>
      </>
    );
  }

  
///sql query
// const status = 1;
    
// let search_sql = "";
// if (status === 1) {
//   search_sql += `and status = ${status}`;
// } else if (status === 0) {
//   search_sql = `and status =${status}`;
// } else {
//   search_sql = "";
// }

// var sql = `select users.id, users.firstname, users.lastname, users.email, users.contact, users.status, roles.name as "role" from users LEFT outer join roles on roles.id = users.role_id LEFT outer join students on students.user_id = users.id where 1=1 ${search_sql}`;
// console.log(sql);

