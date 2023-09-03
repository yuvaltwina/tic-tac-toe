import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppWrapper from './appWrapper';
import NavBar from './nav-bar/NavBar';

function RootLayout() {
  return (
    <>
      <AppWrapper>
        <NavBar />
        <Outlet />
        <Toaster />
      </AppWrapper>
      <ScrollRestoration />
    </>
  );
}
export default RootLayout;
