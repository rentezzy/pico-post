"use client";
import { signUp } from "@/api/user";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const formSchema = yup.object({
  Email: yup.string().email().required().max(100).min(5),
  Name: yup.string().required().max(100),
  Password: yup.string().required().max(50).min(5),
  Role: yup.string<"Author" | "Commentator">().required(),
});

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      Email: "",
      Name: "",
      Password: "",
      Role: "Author",
    },
  });
  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: signUp,
  });
  const onSubmit = handleSubmit((values) =>
    mutate({
      email: values.Email,
      password: values.Password,
      name: values.Name,
      role: values.Role,
    })
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
          {...register("Name")}
          error={!!errors.Name}
          label={errors.Name?.message || "Name"}
          placeholder="Public name"
        />
        <TextField
          {...register("Password")}
          error={!!errors.Password}
          label={errors.Password?.message || "Password"}
          type="password"
          placeholder="••••••••"
        />
        <FormControl>
          <FormLabel id="radio-buttons-group-label">Role</FormLabel>
          <Controller
            rules={{ required: true }}
            control={control}
            name="Role"
            render={({ field }) => (
              <RadioGroup
                {...field}
                aria-labelledby="radio-buttons-group-label"
                defaultValue="Author"
                row
              >
                <FormControlLabel
                  value="Author"
                  control={<Radio />}
                  label="Author"
                />
                <FormControlLabel
                  value="Commentator"
                  control={<Radio />}
                  label="Commentator"
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <Button variant="outlined" type="submit">
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};
