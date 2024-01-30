"use client";

import dynamic from "next/dynamic";
import "../../src/styles/App.css";
import "../../src/styles/tile-colors.css";
import useStore from "../../src/store/store";
import { useRouter } from "next/navigation";

import { gql, useMutation } from "@apollo/client";

const CREATE_SCORE = gql`
  mutation CreateScore($username: String!, $points: Int!) {
    createScore(username: $username, points: $points) {
      user {
        username
      }
      points
    }
  }
`;

const GameBoard = dynamic(() => import("../../src/components/GameBoard"), {
  ssr: false,
});

export default function Page() {
  const username = useStore((state) => state.username);
  const router = useRouter();
  if (!username) router.push("/");

  const [createScore, { data, loading, error }] = useMutation(CREATE_SCORE);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <GameBoard
        onFinish={(points) =>
          createScore({
            variables: {
              username,
              points,
            },
          })
        }
      />
    </div>
  );
}
