import React from "react";
import { Container } from "@components/Container";
import { TextInput, View, TouchableOpacity } from "react-native";
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "@hooks/auth";
import { Search } from "@components/Search";

export function Home() {
  const { signOut } = useAuth()

  return (
    <S.Container>
      <S.Header>
        <S.Greeting>
          <S.GreetinEmoji>😁</S.GreetinEmoji>
          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>
        <TouchableOpacity onPress={() => signOut()}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </S.Header>
      <Search onSearch={() => { }} onClear={() => { }} />
    </S.Container>

  )
}

{/* <Container>
      <S.HeaderHome>
        <S.WrapperTitle>
          <S.SmalleTitle>😁</S.SmalleTitle>
          <S.Title>Olá, Garçom</S.Title>
        </S.WrapperTitle>
        <TouchableOpacity onPress={() => signOut()}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </S.HeaderHome>
      <S.WrapperSearch>
        <S.SearchPizza placeholder="Busque pela pizza" />
        <S.ButtonSearch>
          <MaterialIcons name="search" size={24} color="white" />
        </S.ButtonSearch>
      </S.WrapperSearch>
    </Container> */}