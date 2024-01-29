'use client';

import { Card, StyledBody, StyledAction } from "baseui/card";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { ProgressBar } from "baseui/progress-bar";
import { Button } from "baseui/button";
import { useState } from "react";

import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    username
    password
  }
}
`;

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, {data, loading, error}] = useMutation(CREATE_USER);

  return (
    <div
      style={{
        minWidth: 400,
      }}
    >
      <Card>
        <h2 style={{ textAlign: "center" }}>Register</h2>
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
          <FormControl positive={data?.createUser ? "User created!" : ""} error={error ? error.message  : ""}>
          <StyledAction>
            <Button
              onClick={()=>{
                createUser({variables: {
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
              Register
            </Button>
          </StyledAction></FormControl>
        )}
      </Card>
    </div>
  );
}
