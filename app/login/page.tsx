"use client";

import { Card, StyledBody, StyledAction } from "baseui/card";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { ProgressBar } from "baseui/progress-bar";
import { Button } from "baseui/button";
import { useState } from "react";
import useStore from "../../src/store/store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore(state => state.setUser);
  const [res, setRes] = useState({data: null, loading: false, error: null});
  const {data, loading, error} = res;
  return (
    <div
      style={{
        minWidth: 400,
      }}
    >
      <Card>
        <h2 style={{ textAlign: "center" }}>Play 2048er</h2>
        <FormControl label="Username" error="Username not found in database!">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            clearOnEscape
          />
        </FormControl>
        <FormControl label="Password" error="Incorrect password!">
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
          <StyledAction>
            <Button
              onClick={()=>{
                setRes({
                  ...res,
                  loading: true
                });
                setTimeout(()=>{
                  setUser(username);
                  setRes({
                    ...res,
                    loading: false
                  })
                }, 1000);
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
          </StyledAction>
        )}
      </Card>
    </div>
  );
}
