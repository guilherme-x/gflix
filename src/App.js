import 'styles/app.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom';
import Routes from 'routes';
import { ConfigProvider } from 'antd';
import Theme from 'styles/theme';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={Theme}>
        <RouterProvider router={Routes} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
