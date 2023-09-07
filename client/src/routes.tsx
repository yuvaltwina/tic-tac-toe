import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/Error/ErrorPage';
import MainPage from './pages/Main/MainPage';
import NotFound from './pages/Not-found/NotFound';
import { routesData } from './utils/data';
import ComputerMatch from './pages/computer-match/ComputerMatch';
import BracketPageRoute from './pages/bracket/BracketPage';
import MatchHistoryPageRoute from './pages/match-history/MatchHistoryPage';
import ConnectingMatchRoute from './pages/online-match/ConnectingMatch';

const { mainPage, bracketPage, linkPage, computer, matchHistory } = routesData;

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
            ...ConnectingMatchRoute,
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
