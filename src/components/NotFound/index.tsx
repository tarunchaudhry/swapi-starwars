import * as React from 'react';

interface NFProps {
  text: string;
  style?: any;
}

function NotFound({ text, style }: NFProps) {
  return (
    <div style={style} className="notFound bg-gray-700 text-base-200">
      <p>{text}</p>
    </div>
  );
}

export default NotFound;
