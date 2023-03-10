import { Suspense } from 'react';
import { Route, Switch } from 'wouter';
import NavBar from './components/NavBar';
import Loader from './routes/Loader';
import Feed from './components/Feed';
import NotFound from './routes/NotFound';
import User from './routes/User';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostView from './routes/PostView';
import CommentView from './routes/CommentView';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

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
            <Route path='/user/:id'>
              {(params) => <User id={params.id} />}
            </Route>
            <Route path='/item/:id'>
              {(params) => <PostView id={Number(params.id)} />}
            </Route>
            <Route path='/comment/:id'>
              {(params) => (
                <div className='m-2'>
                  <CommentView id={Number(params.id)} showParent highlight />
                </div>
              )}
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
