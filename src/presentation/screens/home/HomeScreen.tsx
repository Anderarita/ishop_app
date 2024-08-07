import {Button, Icon,  Layout, Text} from '@ui-kitten/components';
import React from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logout, user} = useAuthStore();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Text>Biemvenido(a){user !== undefined ? `: ${user.fullName}` : ''} </Text>
      <Button onPress={logout} accessoryLeft={<Icon name="log-out-outline" />}>
        cerrar sesion
      </Button>
    </Layout>
  );
};
