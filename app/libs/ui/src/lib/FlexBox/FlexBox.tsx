import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';

export enum FlexDirection {
  row = 'row',
  column = 'column',
}

export enum FlexJustify {
  center = 'center',
  spaceBetween = 'space-between',
}

interface Props {
  direction: FlexDirection;
  justify: FlexJustify;
  style: CSSProperties;
}

export const FlexBox: React.FC<Partial<Props>> = ({
  direction,
  children,
  justify,
  style,
}) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
};
