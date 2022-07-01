import * as React from 'react';

interface NFProps {
  text: string;
  style?: any;
}

function NotFound({ text, style }: NFProps) {
  return (
    <div style={style} className="notFound">
      <p>{text}</p>
    </div>
  );
}

export default NotFound;
