import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';
import NavBar from './components/NavBar';
import Loader from './routes/Loader';

const Root = lazy(() => import('./routes/Root'));
const Page1 = lazy(() => import('./routes/Page1'));
const NotFound = lazy(() => import('./routes/NotFound'));

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path='/'>
            <Root />
          </Route>
          <Route path='/page1'>
            <Page1 />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
