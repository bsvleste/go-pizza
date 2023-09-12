import React, { useState } from 'react'
import { Platform, View, ScrollView, TouchableOpacity, Alert, Dimensions, KeyboardAvoidingView, Text } from 'react-native'
import * as S from './styles'
import LogoPizza from '@assets/logoPizza.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useAuth } from '@hooks/auth'
export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, signIn, forgotPassword } = useAuth();
  function handleSignIn() {
    signIn(email, password);
  }
  function hadleForgotPasssword() {
    forgotPassword(email);
  }
  return (
    <S.ContainerSignIn>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <S.Content>
          <S.Brand source={LogoPizza} />
          <S.Title>Login</S.Title>
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            type={'secondary'}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail} />
          <Input
            placeholder='Senha'
            secureTextEntry
            type={'secondary'}
            onChangeText={setPassword} />

          <Button onPress={handleSignIn} title='Entrar' type='SECONDARY' activeOpacity={.3} isLoading={isLoading} />
          <S.LinkForgotPassword onPress={hadleForgotPasssword}>
            <S.ForgotPasswordLabel>Esqueceu a senha?</S.ForgotPasswordLabel>
          </S.LinkForgotPassword>
        </S.Content>
      </KeyboardAvoidingView>
    </S.ContainerSignIn>
  )
}