import { useEffect } from "react";
import { getClient } from "../../src/lib/client";

import { gql } from "@apollo/client";

const query = gql`
query getScores{
  getScores {
    user {
      username
    }
    points
  }
}
`;

export default async function Page() {
  const client = getClient();
  const { data, loading, error } = await client.query({ query });
  return data.getScores.map((score: any, index: number) => {
    return <h1 style={{color: 'white'}}>{index+1}. {score.user.username} ({score.points})</h1>
  })
}
