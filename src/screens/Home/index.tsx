import React, { useCallback, useState } from "react";
import { TouchableOpacity, Alert, FlatList } from "react-native";
import * as S from './styles'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "@hooks/auth";
import { Search } from "@components/Search";
import smille from '@assets/happy.png'
import { ProductCard, ProductProps } from "@components/ProductCard";
import { collection, endAt, onSnapshot, orderBy, query, startAt, where } from "firebase/firestore";
import { firestore } from "@config/firebaseConfig";
import { useNavigation, useFocusEffect } from "@react-navigation/native"

export function Home() {
  const { signOut } = useAuth()
  const { navigate } = useNavigation();
  const [pizzas, setPizzas] = useState<ProductProps[]>([])
  const [search, setSearch] = useState("")
  async function fetchPizzas(value: string) {
    try {
      const formattedValue = value.toLocaleLowerCase().trim()
      const pizzasRef = collection(firestore, "pizzas")
      const queryPizza = query(pizzasRef, orderBy("name_insensitive"), startAt(formattedValue), endAt(`${formattedValue}\uf8ff`))
      onSnapshot(queryPizza, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[]
        setPizzas(data)
      })
    } catch (error) {
      return Alert.alert("Error", "Não foi possivel carregar os dados")
    }
  }
  async function handleSearch() {
    fetchPizzas(search)
  }
  async function handleClearSearch() {
    setSearch("")
    fetchPizzas('')
  }
  function handleOpen(id: string) {
    navigate("product", { id });
  }
  function handleAdd() {
    navigate('product', {})
  }
  useFocusEffect(useCallback(() => {
    fetchPizzas(search)
  }, []))
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
      <Search
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onChangeText={setSearch}
        value={search}
      />
      <S.MenuHeader>
        <S.MenuTitle>Cardapio</S.MenuTitle>
        <S.MenuItemsNumber>{pizzas.length} {pizzas.length > 1 ? "pizzas" : "pizza"}</S.MenuItemsNumber>
      </S.MenuHeader>
      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            data={item}
            onPress={() => handleOpen(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 22
        }}
      />
      <S.NewProduct title="Cadastrar nova Pizza" type="SECONDARY" onPress={handleAdd} />
    </S.Container>
  )
}

