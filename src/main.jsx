import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from "./store/store.js"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Details from "./pages/details/Details"
import Home from "./pages/home/Home"
import Explore from './pages/explore/Explore'
import SearchResults from './pages/searchResults/SearchResults'
import PageNotFound from "./pages/404/PageNotFound.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound/> ,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:mediaType/:id",
        element: <Details />,
      },
      {
        path: "/explore/:mediaType",
        element: <Explore />,
      },
      {
        path: "/search/:query",
        element: <SearchResults/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
