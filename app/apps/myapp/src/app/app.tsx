import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Card, Grid } from '@material-ui/core';
import './app.scss';
// import { Picker } from 'emoji-mart';

export function App() {
  // const handleEmojiSelect = (e: Event) => {
  //   console.log(e);
  // };

  return (
    <Grid container spacing={0} style={{ minHeight: '100vh' }}>
      <Grid item={true} xs={12} lg={3}>
        Hello
      </Grid>
      <Grid item={true} xs={12} lg={9} style={{ backgroundColor: 'red' }}>
        World
      </Grid>
    </Grid>
  );
}

export default App;
