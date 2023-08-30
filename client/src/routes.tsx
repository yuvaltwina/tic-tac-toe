import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/Error/ErrorPage';
import BracketPage from './pages/bracket/BracketPage';
import MainPage from './pages/Main/MainPage';
import NotFound from './pages/Not-found/NotFound';
import { routesData } from './utils/data';
import LinkPage from './pages/Link/LinkPage';
import ComputerMatch from './pages/computer-match/ComputerMatch';

const { mainPage, bracketPage, linkPage, computer } = routesData;

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
            element: <LinkPage />,
          },
          {
            path: computer,
            element: <ComputerMatch />,
          },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
];

export default routes;
