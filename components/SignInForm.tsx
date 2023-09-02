"use client";
import { signIn } from "@/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
  Email: yup.string().email().required().max(100).min(5),
  Password: yup.string().required().max(50).min(5),
});

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
  });
  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: signIn,
  });
  const onSubmit = handleSubmit((values) =>
    mutate({ email: values.Email, password: values.Password })
  );
  return (
    <form onSubmit={onSubmit}>
      <Stack width={400} gap={1}>
        <TextField
          {...register("Email")}
          error={!!errors.Email}
          label={errors.Email?.message || "Email"}
        />
        <TextField
          {...register("Password")}
          error={!!errors.Password}
          label={errors.Password?.message || "Password"}
          placeholder="••••••••"
          type="password"
        />
        {error ? (
          <Typography color="red" textAlign="center">
            Wrong email or password
          </Typography>
        ) : (
          ""
        )}
        <Button variant="outlined" type="submit">
          Sign In
        </Button>
      </Stack>
    </form>
  );
};
