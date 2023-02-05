import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
  } from "@mui/material";  
  import React, { useEffect, useState } from "react";
  import { useForm, SubmitHandler } from "react-hook-form";

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

type FormValues = {
    name: string;
    status:number;
    password:string;
    customertype:string
  };

  export default function Editactivity(){
    const [custtype, setcusttype] = React.useState<any>([]);
    let ct=1;
    const [dt,setdt] =  React.useState<any>(4);
    const {register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {
      console.log(data);
    }

    const url = `https://api-school.mangoitsol.com/api/getuserdetails/91`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4",
          },
        });
        const json = await response.json();
        console.log(json.data[0]);
        setValue("name",json.data[0].name)
        //setValue("status",json.data[0].status)
        ct = json.data[0].name;
        //setValue("customertype",json.data[0].typeId)
        setdt(json.data[0].typeId);
      } catch (error) {
        console.log("error", error);
      }
    }
    useEffect(() => {
      fetchData();
      getType();
    }, [])
  
    //get type
    const getType = async () => {
      const url = `https://api-school.mangoitsol.com/api/getType`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4",
          },
        });
        const res = await response.json();
        setcusttype(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    
    return (
      <>
        <Container component="main" style={{ backgroundColor: "white" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">
                    Activity Name <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="name"
                    size="small"
                    placeholder="Activity Name..."
                    fullWidth
                    {...register("name", {
                        required: true,
                        validate: (value) => { return !!value.trim()}
                      })}
                     
                  />
                </Stack>
                <span style={style}>
                  {errors.name?.type==="required" && <span>Feild is Required **</span>}
                </span>
                <span style={style}>
                  {errors.name?.type==="validate" && <span>White Space not allowed **</span>}
                </span>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="status">
                    Status <span className="err_str">*</span>
                  </InputLabel>
                  <FormControl>
                    <Select
                      size="small"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      {...register("status",{
                        required: true
                      })}
                      defaultValue={ct}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>InActive</MenuItem>
                     
                    </Select>
                    <span style={style}>
                  {errors.status && <span>status  Feild is Required **</span>}
                </span>
                  </FormControl>
                </Stack>
              </Grid> 
              <Grid item xs={12} md={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Customer Type</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            defaultValue={dt}
                            {...register("customertype")}
                          >
                            <MenuItem value={0}>Individual</MenuItem>
                            {custtype &&
                              custtype.map((data: any, key: any) => {
                                return (
                                  <MenuItem key={key} value={data.id}>
                                    {data.name}
                                  </MenuItem>
                                );
                              })}
                          </Select>
                        </FormControl>
                      </Stack>
                    </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">
                    Password <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="password"
                    id="password"
                    size="small"
                    fullWidth
                    {...register("password", {
                        required: true,
                        validate: (value) => { return !!value.trim()},
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
                      })}
                  />
                </Stack>
                <span style={style}>
                  {errors.password?.type==="required" && <span>password is Required **</span>}
                </span>
                <span style={style}>
                  {errors.password?.type==="validate" && <span>White Space not allowed **</span>}
                </span>
                <span style={style}>
                  {errors.password?.type==="pattern" && <span>password should have at least 8 character and contain one uppercase, one lowercase, one number and one special characte **</span>}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update Activity
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </>
    );
  };
  
 