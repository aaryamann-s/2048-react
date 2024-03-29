'use client';

import { Card, StyledBody, StyledAction } from "baseui/card";
import { useRouter } from "next/navigation";
import useStore from "../../src/store/store";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { ProgressBar } from "baseui/progress-bar";
import { Button } from "baseui/button";
import { useState } from "react";

import { gql, useLazyQuery } from "@apollo/client";

const LOGIN_USER = gql`
query LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    username
    password
  }
}
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  const [ loginUser, {data, loading, error}] = useLazyQuery(LOGIN_USER, {
    onCompleted: ()=>{
      setUser(data.loginUser.username);
      router.push("/game");
    }
  });

  return (
    <div
      style={{
        minWidth: 400,
      }}
    >
      <Card>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <FormControl label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            clearOnEscape
          />
        </FormControl>
        <FormControl label="Password">
          <Input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            clearOnEscape
          />
        </FormControl>
        {loading ? (
          <ProgressBar infinite />
        ) : (
          <FormControl positive={data?.loginUser ? "Login successful!" : ""} error={error ? error.message  : ""}>
          <StyledAction>
            <Button
              onClick={()=>{
                loginUser({variables: {
                  username,
                  password
                }})
              }}
              overrides={{
                BaseButton: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Login
            </Button>
          </StyledAction></FormControl>
        )}
      </Card>
    </div>
  );
}
