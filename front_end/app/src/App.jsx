import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter } from 'simple-react-routing';
import HomePage from './pages/Home';

export default function App() {

  return <BrowserRouter routes={[{
    path: "",
    component: <HomePage></HomePage>
  }]}>
  </BrowserRouter>
}