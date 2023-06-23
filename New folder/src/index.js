import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import Mobile404 from './pages/Mobile404';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ProSidebarProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <BrowserView>
              <App />
            </BrowserView>
            <MobileView>
              <Mobile404 />
            </MobileView>
          </PersistGate>
        </Provider>
      </ProSidebarProvider>
    </Router>
  </React.StrictMode>,
);
