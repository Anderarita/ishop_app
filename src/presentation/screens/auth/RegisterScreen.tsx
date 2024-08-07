import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CustomIcon} from '../../components/CustomIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}:Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.30}}>
          <Text category="h1">Registrarse</Text>
          <Text category="p2">Por favor, cree una cuenta para continuar  </Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            keyboardType="email-address"
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Correo Electronico"
            autoCapitalize="none"
            style={{marginBottom: 10}}
          />
          <Input
            placeholder="Contrase;a"
            accessoryLeft={<CustomIcon name="lock-outline" />}
            secureTextEntry={true}
            autoCapitalize="none"
            style={{marginBottom: 20}}
          />
          <Input
            placeholder="Confirmar Contrase;a"
            accessoryLeft={<CustomIcon name="lock-outline" />}
            secureTextEntry={true}
            autoCapitalize="none"
            style={{marginBottom: 20}}
          />
        </Layout>
        <Layout style={{height: 50}} />
        <Layout>
          <Button
            accessoryLeft={<CustomIcon name="person-add-outline" />}
            onPress={() => console.log('inicioin seciado inicaindo ')}>
            Ingresar
          </Button>
        </Layout>
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text category="p2">Ya tiene cuenta? </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.pop()}>
            {' '}
            Pues inicia sesion
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
