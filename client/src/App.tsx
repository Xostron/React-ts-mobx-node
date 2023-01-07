import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import pages from './routes/Routes';
import { Navbar } from './components/container-components/navbar/Navbar';

function App() {
  return (
    <div >
      <Navbar />
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path='*' element={<Navigate replace to='/' />} />
          {pages.map(({ path, Element }, idx) => {
            return (
              <Route key={idx} path={path} element={<Element />} />
            )
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
