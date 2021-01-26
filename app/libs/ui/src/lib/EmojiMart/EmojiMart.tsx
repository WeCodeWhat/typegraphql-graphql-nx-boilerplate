import React from 'react';
import { Picker } from 'emoji-mart';

/* eslint-disable-next-line */
export interface UiProps {}

export function EmojiMart(props: UiProps) {
  return (
    <div>
      <Picker />
    </div>
  );
}

export default EmojiMart;
