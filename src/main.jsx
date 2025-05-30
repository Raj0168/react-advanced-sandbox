import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react'
import Loader from './components/Loader.jsx'
import SnackBarProvider from './context/SnackbarProvider.jsx'
import GlobalSnackbar from './utils/GlobalSnackbar.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <SnackBarProvider>
        <BrowserRouter basename="/react-advanced-sandbox">
          <GlobalSnackbar />
          <App />
        </BrowserRouter>
      </SnackBarProvider>
    </PersistGate>
  </Provider>
)
