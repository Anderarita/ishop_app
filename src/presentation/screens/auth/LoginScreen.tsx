import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, { useState } from 'react';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { CustomIcon } from '../../components/CustomIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const {height} = useWindowDimensions();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const result = await login(form.email, form.password);
    if (result) {
      setIsPosting(false);
      return;
    }

    Alert.alert('Error', 'Usuario o contrase;a incorrecta')
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por </Text>
        </Layout>
        <Layout style={{marginTop: 20}}>
          <Input
            keyboardType="email-address"
            accessoryLeft={<CustomIcon name='email-outline'/>}
            placeholder="Correo Electronico"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            autoCapitalize='none'
            style={{marginBottom:10}}
          />
          <Input
            placeholder="Contrase;a"
            value={form.password}
            onChangeText={password => setForm({...form, password})}
            accessoryLeft={<CustomIcon name='lock-outline'/>}
            secureTextEntry={true}
            autoCapitalize='none'
            style={{marginBottom:20}}
          />
        </Layout>
        <Layout style={{height:50}}/>
        <Layout>
            <Button  disabled={isPosting} accessoryLeft={<CustomIcon name="checkmark-outline"/>} onPress={onLogin}>
                Ingresar
            </Button>
        </Layout>
        <Layout style={{alignItems: 'flex-end', flexDirection: "row", justifyContent:'center'}}>
            <Text category="p2">No tienes cuenta? </Text>
            <Text status='primary' category='s1' onPress={() => navigation.navigate('RegisterScreen')}> Ande Creela</Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
