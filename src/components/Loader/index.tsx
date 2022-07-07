import React from 'react';

interface LoaderProps {
  loading: boolean;
  noDelay: boolean;
}

export default function Loader({ loading, noDelay }: LoaderProps) {
  const [isLoad, setIsLoad] = React.useState(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (loading) {
      setIsLoad(true);
    } else {
      setTimeout(() => {
        if (isMounted.current) {
          setIsLoad(false);
        }
      }, 2000);
    }
  }, [loading]);

  const isVisible = noDelay ? loading : isLoad;
  if (isVisible) {
    return (
      <div className="loader-wrapper" data-testid="custom-loader">
        <div className="blobs">
          <div className="blob-center"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
  return null;
}
