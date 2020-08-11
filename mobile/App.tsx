import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserLogin from './modules/user/login';
import { navigator } from './navigator'
import useSafeState from './state'
import { userLoad } from './user';
import ComponentLoading from './modules/component/loading';

const LoginNavigator = createStackNavigator(navigator, {
  headerMode: 'none',
  initialRouteName: 'login'
});

const DashboardNavigator = createStackNavigator(navigator, {
  headerMode: 'none',
  initialRouteName: 'dashboard'
});

const LoginContainer = createAppContainer(LoginNavigator)
const DashboardContainer = createAppContainer(DashboardNavigator);

export default function App() {
  const [login, setLogin] = useSafeState('loading')

  async function checkIsUserLogin() {
    userLoad().then((user) => {
      setTimeout(() => {
        checkIsUserLogin()
      }, 500);
      setLogin(user)
    })
  }

  useEffect(() => {
    checkIsUserLogin()
  }, [])

  if (login == 'loading') {
    return <ComponentLoading />
  }

  if (!login) {
    return <LoginContainer />
  }

  return (
    <DashboardContainer />
  );
}