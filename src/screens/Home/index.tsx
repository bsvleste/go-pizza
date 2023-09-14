import React from "react";
import { Container } from "@components/Container";
import { TextInput, View, TouchableOpacity } from "react-native";
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "@hooks/auth";
import { Search } from "@components/Search";
import smille from '@assets/happy.png'
import { ProductCard } from "@components/ProductCard";
import { ScrollView } from "react-native-gesture-handler";


const data = {
  id: '1',
  description: "olalal",
  name: "Margherita",
  photo_url: 'https://github.com/bsvleste.png',
}
export function Home() {
  const { signOut } = useAuth()

  return (
    <S.Container>
      <S.Header>
        <S.Greeting>
          <S.GreetinEmoji source={smille} />
          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>
        <TouchableOpacity onPress={() => signOut()} style={{ alignItems: 'flex-end' }}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </S.Header>
      <Search onSearch={() => { }} onClear={() => { }} />
      <S.MenuHeader>
        <S.MenuTitle>Cardapio</S.MenuTitle>
        <S.MenuItemsNumber>32 pizzas</S.MenuItemsNumber>
      </S.MenuHeader>
      <ScrollView>
        <ProductCard data={data} />
      </ScrollView>
    </S.Container>
  )
}

