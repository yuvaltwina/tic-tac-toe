import React from 'react';
import { useRouteError } from 'react-router';
import './ErrorPage.scss';

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== 'production' && error instanceof Error && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}

export default ErrorPage;
