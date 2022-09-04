import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSignIn } from "../hooks/api";
import { setToken } from "../hooks/Token";
import { useGetLabel } from "../hooks/api";
import SignIn from "../components/SignIn";
import { Toast } from "../components/Feedback";

export function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<boolean>(false);
  const mutaionSignIn: any = useSignIn({ email, password });
  const responseLabel: any = useGetLabel(0);
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };
  const handleClose = () => {
    console.log("close");
    setToast(false);
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      mutaionSignIn.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  useEffect(() => {
    if (mutaionSignIn.isError) {
      console.log("error......");
      setToast(true);
    }
  }, [mutaionSignIn.isError]);

  useEffect(() => {
    if (mutaionSignIn.isLoading) {
      console.log("mutaionSignIn.isLoading:", mutaionSignIn.isLoading);
    } else {
      console.log("data:", mutaionSignIn.data);
      if (mutaionSignIn.data?.accessToken) {
        // localStorage
        console.log(window.sessionStorage.getItem("token"));
        //이동
        setToken(mutaionSignIn.data?.accessToken);
        responseLabel.refetch();
        navigate("/todos");
      }
      // queryClient.invalidateQueries('getTodo');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutaionSignIn.data, mutaionSignIn.isLoading, responseLabel, navigate]);
  return (
    <>
      <SignIn onSubmit={handleSubmit} />
      <Toast
        open={toast}
        severity={"warning"}
        message="email or password is different"
        onClose={handleClose}
      />
    </>
  );
}
