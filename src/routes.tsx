import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import AuthLayout from './common/layouts/AuthLayout';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import HomePage from './pages/Home';

const PrivateRouter: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuth = () => localStorage.getItem('user');
  return (
    <Route
      {...rest}
      render={() => {
        return isAuth() ? children : <Redirect to='/login' />;
      }}
    />
  );
};

const renderRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/auth'>
          <AuthLayout>
            <Route path='/auth/login'>
              <LoginPage />
            </Route>
            <Route path='/auth/register'>
              <RegisterPage />
            </Route>  
          </AuthLayout>
        </Route>
        
        <PrivateRouter path='/' exact>
          <HomePage />
        </PrivateRouter>
      </Switch>
    </Router>
  );
};

export default renderRouter;
