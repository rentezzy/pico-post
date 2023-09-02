"use client";
import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";
import HomeIcon from "@mui/icons-material/Home";
import {
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState<"signup" | "signin">("signup");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "signup" | "signin"
  ) => {
    console.log(newAlignment);
    setForm(newAlignment);
  };

  return (
    <>
      <Link
        href="/"
        className="rounded-[5px] hover:opacity-[0.9] fixed top-[10px] left-[10px] bg-background"
      >
        <HomeIcon className="w-[30px] h-[30px]" color="secondary" />
      </Link>
      <Container className="flex justify-center h-screen items-center">
        <Stack gap="20px" alignItems={"center"}>
          {form === "signin" ? <SignInForm /> : <SignUpForm />}
          <ToggleButtonGroup
            value={form}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="signin" aria-label="left aligned">
              <Typography>Sign In</Typography>
            </ToggleButton>
            <ToggleButton value="signup" aria-label="centered">
              <Typography>Sign Up</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Container>
    </>
  );
}
