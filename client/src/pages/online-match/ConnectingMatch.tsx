import React, { useState } from 'react';
import { defer, LoaderFunctionArgs } from 'react-router';
import useLoaderData from '../../hooks/useLoaderData';
import { getData } from '../../utils/data';
import LinkPage from './pages/LinkPage';
import OnlineMatchPage from './pages/OnlineMatchPage';
import './ConnectingMatch.scss';

const DUMMY_DATA = 'socket id';

const JOIN_ROOM_DATA = 'joining room';

function ConnectingMatchLoader({
  request: { signal, url },
}: LoaderFunctionArgs) {
  const roomId = new URL(url).searchParams.get('room-id');

  if (roomId) {
    // join room
    return defer({ data: getData(true, JOIN_ROOM_DATA) });
  }

  // create room
  return defer({ data: getData(true, DUMMY_DATA) });
}

function ConnectingMatch() {
  const { data } = useLoaderData<string>();
  const [isRoomConnected, setIsRoomConnected] = useState(false);

  return !isRoomConnected ? <LinkPage roomId={data} /> : <OnlineMatchPage />;
}

const ConnectingMatchRoute = {
  loader: ConnectingMatchLoader,
  element: <ConnectingMatch />,
};

export default ConnectingMatchRoute;
