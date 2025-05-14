"use client";
import { useSnackbar } from "@/components/snackbar/SnackbarProvider";
import { SESSION_ID } from "@/features/cookies/constants";
import { useLogin } from "@/features/login/hooks/useLogin";
import { useRegisterUser } from "@/features/user/hooks/useRegisterUser";
import { PAGES } from "@/utils/pages";
import { Box, Button, TextField, Typography } from "@mui/material";
import MUILink from "@mui/material/Link";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Login() {
  const [showRegisterUser, setShowRegisterUser] = useState<boolean>(false);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
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
  const { doRegisterUser, isLoading } = useRegisterUser();
  const { addMessage } = useSnackbar();

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

  const registerUser = useCallback(async () => {
    const response = await doRegisterUser({
      username: username,
      password: password,
      confirmNewPassword: confirmPassword,
    });

    if (response.ok) {
      addMessage("User created", "success");
      setShowRegisterUser(false);
    }
  }, [
    addMessage,
    confirmPassword,
    doRegisterUser,
    password,
    setShowRegisterUser,
    username,
  ]);

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
            loading={isLoading}
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
  const cookies = useCookies();
  const router = useRouter();

  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const showRegisterUser = useCallback(() => {
    setShowRegisterUser(true);
  }, [setShowRegisterUser]);

  const loginUser = useCallback(async () => {
    const response = await doLogin({ username: username, password: password });

    if (response?.ok && response.loginResponse != null) {
      cookies.set(SESSION_ID, response.loginResponse.session);
      router.push(PAGES.HOME);
    }
  }, [cookies, doLogin, password, router, username]);

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
        <MUILink
          component="button"
          type="button"
          variant="body2"
          onClick={showRegisterUser}
        >
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
