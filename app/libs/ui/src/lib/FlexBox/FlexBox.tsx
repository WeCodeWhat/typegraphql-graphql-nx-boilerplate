import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';

export enum FlexDirection {
  row = 'row',
  column = 'column',
}

export enum FlexJustify {
  center = 'center',
  spaceBetween = 'space-between',
  flexEnd = 'flex-end',
}

export enum AlignItem {
  center = 'center',
  left = 'left',
  right = 'right',
}
interface Props {
  direction: FlexDirection;
  justify: FlexJustify;
  style: CSSProperties;
  align: AlignItem;
}

export const FlexBox: React.FC<Partial<Props>> = ({
  direction,
  children,
  justify,
  align,
  style,
}) => {
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
};
