import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/Error/ErrorPage';
import MainPage from './pages/Main/MainPage';
import NotFound from './pages/Not-found/NotFound';
import { routesData } from './utils/data';
import ComputerMatch from './pages/offline/ComputerMatch';
import PrivateRoom from './pages/online/pages/private-room';
import OnlineGameProvider from './pages/online/context/OnlineGameContext';
import OnlineRoom from './pages/online/pages/online-room';
import RequireAuth from './components/HOC/RequireAuth';
import BracketPage from './pages/bracket/BracketPage';
import MatchHistoryPage from './pages/match-history/MatchHistoryPage';

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
            element: <BracketPage />,
          },
          {
            path: linkPage,
            element: (
              <RequireAuth>
                <OnlineGameProvider>
                  <PrivateRoom />
                </OnlineGameProvider>
              </RequireAuth>
            ),
          },
          {
            path: online,
            element: (
              <RequireAuth>
                <OnlineGameProvider>
                  <OnlineRoom />
                </OnlineGameProvider>
              </RequireAuth>
            ),
          },
          {
            path: computer,
            element: <ComputerMatch />,
          },
          {
            path: matchHistory,
            element: (
              <RequireAuth>
                <MatchHistoryPage />
              </RequireAuth>
            ),
          },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
];

export default routes;
