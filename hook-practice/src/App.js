import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auto-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader onLogout={authCtx.logoutHandler} />
      <main>
        {!authCtx.isLoggedIn && <Login onLogin={authCtx.loginHandler} />}
        {authCtx.isLoggedIn && <Home onLogout={authCtx.logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
