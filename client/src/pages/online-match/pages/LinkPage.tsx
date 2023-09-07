import React, { Suspense } from 'react';
import { Await } from 'react-router';
import SiteTitle from '../../../components/Site-title/SiteTitle';

import { routesData } from '../../../utils/data';
import './LinkPage.scss';

const { linkPage } = routesData;
const { VITE_SITE_URL } = import.meta.env;

function LinkPage({ roomId }: { roomId: Promise<string> }) {
  return (
    <div className="link-page">
      <SiteTitle />
      <h1>press link to copy</h1>

      <Suspense fallback={<p>loading...</p>}>
        <Await resolve={roomId} errorElement={<p>Error loading data</p>}>
          {(data) => {
            const link = `${VITE_SITE_URL}${linkPage}?room-id=${data}`;
            return (
              <button
                type="button"
                className="link-container"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                }}
              >
                <p>{link}</p>
              </button>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default LinkPage;
