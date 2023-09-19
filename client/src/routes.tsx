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
import OnlineGameProvider from './pages/online/context/OnlineGameContext';
import SearchOnline from './pages/online-match/pages/online-room';
import PrivateRoom from './pages/online/pages/private-room';

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
                <SearchOnline />
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
