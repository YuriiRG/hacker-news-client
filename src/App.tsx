import { Link, Route, Switch } from 'wouter';
import { useState } from 'react';
export default function App() {
  const [test, setTest] = useState(0);
  return (
    <div>
      <Link href='/'>Index</Link>
      <Link href='/page1'>Page1</Link>
      <Link href='/page2'>Page2</Link>
      <Switch>


        
      <Route path='/'>
        <div>Index data</div>
      </Route>
      <Route path='/page1'>
        <div>Page1 data</div>
      </Route>
      <Route path='/page2'>
        <div>Page2 data</div>
      </Route>
      <Route>
        <div>Not found</div>
      </Route>
      </Switch>
    </div>
  );
}
