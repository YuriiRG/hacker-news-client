import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import NavBar from './components/NavBar';
import Loader from './routes/Loader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Feed = lazy(() => import('./components/Feed'));
const NotFound = lazy(() => import('./routes/NotFound'));

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col min-h-screen'>
        <NavBar />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/'>
              <Feed type='top' />
            </Route>
            <Route path='/best'>
              <Feed type='best' />
            </Route>
            <Route path='/new'>
              <Feed type='new' />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
