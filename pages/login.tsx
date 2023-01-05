import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterLine } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const {register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    const url = "https://api-school-mangoitsol.com/api/userlogin";

    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <>
      <Container className="login-page">
        <header className="header-navbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ fontSize: "32px", fontWeight: "900" }}
          >
            Educorp
          </Typography>
          <nav className="nav-bar">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  backgroundColor: "#26CEB3",
                  textDecoration: "none",
                }}
              >
                <BiArrowBack /> Back to Home
              </Button>
            </Link>
          </nav>
        </header>
      </Container>

      <section className="productive">
        <div className="productive-img">
        </div>
        <div className="productive-content">
          <Container
            component="main"
            style={{
              boxShadow: "1px 1px 10px 0px",
              borderRadius: "20px",
              padding: "25px",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: "900" }}
              >
                <span style={{ color: "#26CEB3" }}>Login</span> to Your Account
              </Typography>
              <Typography variant="body2" style={{ color: "#5F6160" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{ mt: 1 }}
              >
                <Typography>Email Address</Typography>
                <TextField
                  style={{ marginTop: "8px" }}
                  fullWidth
                  size="small"
                  type="email"
                  placeholder="Email Address..."
                  {...register("email", {
                    required: true,
                  })}
                />
                 <span style={style}>
                  {errors.email && <span>Email Feild is Required **</span>}
                </span>
                <Typography style={{ marginTop: "15px" }}>Password</Typography>
                <TextField
                  style={{ marginTop: "8px" }}
                  fullWidth
                  size="small"
                  type="password"
                  placeholder="**************"
                  {...register("password", {
                    required: true,
                  })}
                />
                 <span style={style}>
                  {errors.password && <span>Password Feild is Required **</span>}
                </span>
                <Grid container style={{ marginTop: "10px" }}>
                  <Grid item xs>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me?"
                    />
                  </Grid>
                  <Grid item>
                    <Typography style={{ marginTop: "9px" }}>
                      Forgot Password?{" "}
                      <Link
                        href="auth/forgotpassword"
                        style={{ color: "#26CEB3" }}
                      >
                        Click here
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
                <Button
                  style={{ backgroundColor: "#26CEB3", fontWeight: "900" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  Submit
                </Button>
              </Box>
              </form>
            </Box>
          </Container>
        </div>
      </section>
    </>
  );
}