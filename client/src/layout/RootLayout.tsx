import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import AppWrapper from './appWrapper';
import NavBar from './nav-bar/NavBar';

function RootLayout() {
  return (
    <>
      <AppWrapper>
        <NavBar />
        <Outlet />
      </AppWrapper>
      <ScrollRestoration />
    </>
  );
}
export default RootLayout;
