import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PropsWithChildren, useEffect} from 'react';
import {RootStackParams} from '../navigation/StackNavigator';
import {useAuthStore} from '../store/auth/useAuthStore';

export const AuthProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {status, renewSession} = useAuthStore();

  useEffect(() => {
    renewSession();
  }, []);

  useEffect(() => {
    console.log(status);

    if (status !== 'checking') {
      if (status === 'authenticated') {
        navigation.reset({index: 0, routes: [{name: 'HomeScreen'}]});
      } else {
        navigation.reset({index: 0, routes: [{name: 'LoginScreen'}]});
      }
    }
  }, [status]);
  return <>{children}</>;
};
