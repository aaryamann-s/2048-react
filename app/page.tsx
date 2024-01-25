'use client';

import {
  DisplayLarge,
} from 'baseui/typography';
import { Button } from "baseui/button";


export default function Page() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      width: '70%'
    }}>
       <div style={{
      width: '60%',
      color: 'white'
    }}>
      <DisplayLarge style={{marginBottom: 32}}>Play 2048!</DisplayLarge>
      <Button style={{minWidth: 150}}>Login</Button>
    </div>
    <div style={{
      display: 'flex',
      backgroundColor: 'red',
      width: '40%'
    }}>
      <img style={{
        maxWidth: '100%',
      }} src="https://i.imgur.com/m5rjiq4.png" />
    </div>
      </div>
  );
}
