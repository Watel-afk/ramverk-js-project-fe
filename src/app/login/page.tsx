"use client";
import { useLogin } from "@/features/login/hooks/useLogin";
import { Box, Button, TextField, Typography } from "@mui/material";
import MUILink from "@mui/material/Link";
import { useCallback, useState } from "react";

export default function Login() {
  const [showRegisterUser, setShowRegisterUser] = useState<boolean>(false);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={"5rem"}
    >
      <Typography variant="h2" marginBottom={"1rem"}>
        Retro Media
      </Typography>

      {showRegisterUser ? (
        <RegisterUserForm setShowRegisterUser={setShowRegisterUser} />
      ) : (
        <LoginForm setShowRegisterUser={setShowRegisterUser} />
      )}
    </Box>
  );
}

const RegisterUserForm = ({
  setShowRegisterUser,
}: {
  setShowRegisterUser: (show: boolean) => void;
}) => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const canRegisterNewUser = useCallback(() => {
    return (
      username.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    );
  }, [confirmPassword, password, username]);

  const cancel = useCallback(() => {
    setShowRegisterUser(false);
  }, [setShowRegisterUser]);

  const registerUser = useCallback(() => {
    console.log("Register user");
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        registerUser();
      }}
    >
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h5">Register user</Typography>
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          sx={{ width: "20rem" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "20rem" }}
        />
        <TextField
          label="Confirm password"
          variant="outlined"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "20rem" }}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Button onClick={cancel}>Cancel</Button>

          <Button
            variant="contained"
            disabled={!canRegisterNewUser()}
            type="submit"
          >
            Register
          </Button>
        </Box>
      </Box>
    </form>
  );
};

const LoginForm = ({
  setShowRegisterUser,
}: {
  setShowRegisterUser: (show: boolean) => void;
}) => {
  const { doLogin, isLoading } = useLogin();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const showRegisterUser = useCallback(() => {
    setShowRegisterUser(true);
  }, [setShowRegisterUser]);

  const loginUser = useCallback(() => {
    const response = doLogin({ username: username, password: password });
    console.log(response);
  }, [doLogin, password, username]);

  const canLogin = useCallback(() => {
    return username.length > 0 && password.length > 0;
  }, [password, username]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}
    >
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          sx={{ width: "20rem" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "20rem" }}
        />
        <MUILink component="button" variant="body2" onClick={showRegisterUser}>
          Register new user
        </MUILink>
        <Button
          variant="contained"
          type="submit"
          disabled={!canLogin()}
          loading={isLoading}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};
