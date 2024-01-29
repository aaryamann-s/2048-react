import { useEffect } from "react";
import { getClient } from "../../src/lib/client";

import { gql } from "@apollo/client";

export const revalidate = 5;
const query = gql`
query HighScores {
  highScores {
    username
    score
  }
}
`;

export default async function Page() {
  const client = getClient();
  const { data, loading, error } = await client.query({ query });
  return data.highScores.map((highScore: any) => {
    return <h1 style={{color: 'white'}}>{highScore.username}</h1>
  })
}
