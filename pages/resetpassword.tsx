import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BiArrowBack } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Link from "next/link";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email: string;
  password: string;
};

export default function Resetpassword() {

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required"),
    cpassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords and confirm password not match")
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
  });
  function onSubmit(data : any) {
    console.log(JSON.stringify(data, null, 4))
    return false
  }

  return (
    <>
      <Container className="reset-password">
        <header className="header-navbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <img src="/Vector.png" style={{ width: "62px" }} />
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
              <Button style={{ backgroundColor: "#26CEB3" }}>
                <BiArrowBack /> Back to Home
              </Button>
            </Link>
          </nav>
        </header>
      </Container>
      <section className="productive">
        <div className="productive-img">
          {" "}
          <img src="/loginimg.png" alt="" />{" "}
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
              <Typography variant="h5" gutterBottom>
                <span style={{ color: "#26CEB3", fontWeight: "900" }}>
                  {" "}
                  Reset{" "}
                </span>
                Password
              </Typography>
              <Typography variant="body2" style={{ color: "#5F6160" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 1 }}>
                  <Typography>New Password</Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="********"
                    {...register("password")}
                  />
                  <Typography style={style}>
                    {errors.password?.message}
                  </Typography>
                  <Typography style={{ marginTop: "15px" }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="********"
                    {...register("cpassword")}
                  />
                  <Typography style={style}>
                    {errors.cpassword?.message}
                  </Typography>
                  <Button
                    style={{ backgroundColor: "#26CEB3", fontWeight: "900" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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