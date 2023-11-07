import Home from 'pages/Home';
const { createBrowserRouter } = require("react-router-dom");
const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
])

export default Routes;