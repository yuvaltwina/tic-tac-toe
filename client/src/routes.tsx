import React from 'react';
import { RouteObject } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import ErrorPage from './pages/Error/ErrorPage';
import BracketPage from './pages/bracket/BracketPage';
import MainPage from './pages/Main/MainPage';
import NotFound from './pages/Not-found/NotFound';
import routesData from './utils/data';

const { mainPage, bracketPage } = routesData;
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
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
];

export default routes;
