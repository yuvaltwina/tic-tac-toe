import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/error/ErrorPage';
import MainPage from './pages/main/MainPage';
import NotFound from './pages/not-found/NotFound';
import { routesData } from './utils/data';
import ComputerMatch from './pages/computer/ComputerMatch';
import BracketPageRoute from './pages/bracket/BracketPage';
import MatchHistoryPageRoute from './pages/match-history/MatchHistoryPage';
import PrivateRoom from './pages/online/pages/private-room';
import OnlineGameProvider from './pages/online/context/OnlineGameContext';
import OnlineRoom from './pages/online/pages/online-room';

const { mainPage, bracketPage, linkPage, computer, matchHistory, online } =
  routesData;

const routes: RouteObject[] = [
  {
    path: mainPage,
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: bracketPage,
            ...BracketPageRoute,
          },
          {
            path: linkPage,
            element: (
              <OnlineGameProvider>
                <PrivateRoom />
              </OnlineGameProvider>
            ),
          },
          {
            path: online,
            element: (
              <OnlineGameProvider>
                <OnlineRoom />
              </OnlineGameProvider>
            ),
          },
          {
            path: computer,
            element: <ComputerMatch />,
          },
          {
            path: matchHistory,
            ...MatchHistoryPageRoute,
          },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
];

export default routes;
