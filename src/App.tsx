import { lazy, Suspense } from 'react';
import { Link, Route, Switch } from 'wouter';

const Root = lazy(() => import('./routes/Root'));
const Page1 = lazy(() => import('./routes/Page1'));

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow-0'>
        Navbar. <Link href='/page1'>page1</Link>.{' '}
        <Link href='/'>Main page</Link>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <div className='flex-grow'>
          <Switch>
            <Route path='/'>
              <Root />
            </Route>
            <Route path='/page1'>
              <Page1 />
            </Route>
            <Route>Not found</Route>
          </Switch>
        </div>
      </Suspense>
    </div>
  );
}
