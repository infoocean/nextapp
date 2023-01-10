import {
    Button,
    Container,
    FormControl,
    getCardHeaderUtilityClass,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextareaAutosize,
  } from "@mui/material";  
  import React, { useEffect, useState } from "react";
  import { useForm, SubmitHandler } from "react-hook-form";

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

  enum TypeEnum {
    Active = "Active",
    Archive = "Archive",
    Draft = "Darft"
  }

type FormValues = {
    name: string;
    price: number;
    startdate:string;
    enddate:string;
    shortdescription:string;
    description:string;
    image:string;
    status:TypeEnum;
  };

  export default function Editactivity(){

    const [activites, setactivites] = useState<any>([]);
    const url = `https://api-school.mangoitsol.com/api/getactivitydetails/19`;
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
      } catch (error) {
        console.log("error", error);
      }
    }
    useEffect(() => {
      fetchData();
    }, [])
    
    console.log(activites);
    const {register, handleSubmit, formState: { errors } } = useForm<FormValues>({ defaultValues: {
      name: activites.name,
      price:23,
      startdate:"2022-12-10",
      enddate:"2022-12-20",
      shortdescription:"kjdfhdkjzfhakshfk",
      description:"djkfksgvksdhfkshdkjfhskjfhsdjfhdsufghsduigfsyefidsyiofsydfhdsi",
    }});
    const onSubmit: SubmitHandler<FormValues> = data => {
      console.log(data);
    }
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
                      })}
                     
                  />
                </Stack>
                <span style={style}>
                  {errors.name && <span>Name Feild is Required **</span>}
                </span>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="price">
                    Activity Price <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="price"
                    type="price"
                    size="small"
                    placeholder="Price..."
                    {...register("price", {
                        required: true,
                      })}
                  />
                </Stack>
                <span style={style}>
                  {errors.price && <span>Price Feild is Required **</span>}
                </span>
              </Grid>
             <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="type">
                    Type <span className="err_str">*</span>
                  </InputLabel>
                  <FormControl>
                    <Select 
                      size="small"
                      placeholder="Enter Car Brand"
                      
                    >
                      <MenuItem value="Free">Free</MenuItem>
                      <MenuItem value="Paid">Paid</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
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
                        required: true,
                      })}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Archive">Archive</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                    </Select>
                    <span style={style}>
                  {errors.status && <span>status  Feild is Required **</span>}
                </span>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="startdate">
                    Start Date <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="date"
                    id="startdate"
                    {...register("startdate", {
                        required: true,
                      })}
                  />
                   <span style={style}>
                  {errors.startdate && <span>Start Date Feild is Required **</span>}
                </span>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="enddate">
                    End Date <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="date"
                    id="enddate"
                    {...register("enddate", {
                        required: true,
                      })}
                  />
                </Stack>
                <span style={style}>
                  {errors.enddate && <span>End Date Feild is Required **</span>}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image">
                    Upload Image <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="file"
                    size="small"
                    fullWidth
                    id="image"
                    placeholder="image."
                    {...register("image", {
                        required: true,
                      })}
                  />
                </Stack>
                <span style={style}>
                  {errors.image && <span>Image Feild is Required **</span>}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="shortdescription">
                    Short Description <span className="err_str">*</span>
                  </InputLabel>
                  <TextareaAutosize minRows={3} {...register("shortdescription", {
                        required: true,
                      })} />
                </Stack>
                <span style={style}>
                  {errors.shortdescription && <span>Short Description Feild is Required **</span>}
                </span>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">
                    Description <span className="err_str">*</span>
                  </InputLabel>
                  <TextareaAutosize minRows={5} {...register("description", {
                        required: true,
                      })} />
                </Stack>
                <span style={style}>
                  {errors.description && <span>Description Feild is Required **</span>}
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
  
 