import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import {store, persistor } from './utils/context/store';
import { Provider } from 'react-redux';
import appRouter from './routes/userRouter';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { SocketProvider } from './utils/context/SocketContext/SocketContext';


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Toaster richColors position="top-right" />
    <PersistGate loading={null} persistor={persistor} >
      <SocketProvider>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
      </SocketProvider>
    </PersistGate>
  </Provider>
)
