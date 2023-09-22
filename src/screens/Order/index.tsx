import React, { useEffect, useState } from 'react'
import * as S from './styles'
import { Alert, Platform } from 'react-native';
import { ButtonBack } from '@components/ButtonBack';
import { RadioButton } from '@components/RadioButton';
import { PIZZAS_TYPE } from '@utils/pizzaType'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OrderNavigationProps, ProductNavigationProps } from '@src/@types/navigation'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@src/config/firebaseConfig';
import { ProductProps } from '@src/components/ProductCard';
import { useAuth } from '@src/hooks/auth';
type PizzasResponse = ProductProps & {
  photo_url: string
  prices_sizes: {
    [key: string]: number
  }
}
export function Order() {
  const route = useRoute();
  const { user } = useAuth()
  const { goBack, navigate } = useNavigation()
  const [size, setSize] = useState("")
  const [pizza, setPizza] = useState<PizzasResponse>({} as PizzasResponse)
  const [isLoading, setIsLoading] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [tableNumber, setTableNumber] = useState('')
  const [sendingOrder, setSendingOrder] = useState(false)
  const { id } = route.params as OrderNavigationProps
  const amount = size ? pizza.prices_sizes[size] * quantity : '0,00'
  async function handleGetPizzaById() {
    if (id) {
      const pizzasRef = doc(firestore, "pizzas", id)
      const product = await getDoc(pizzasRef)
      const pizzasById = product.data() as PizzasResponse
      setPizza(pizzasById)
    }
  }
  async function handleOrder() {
    if (!size) return Alert.alert("Pedido", "Selecione o tamanho da pizza")
    if (!tableNumber) return Alert.alert("Pedido", "Informe o numero da mesa")
    if (!quantity) return Alert.alert("Pedido", "Informe a quantidade de pizzas")
    setSendingOrder(true)
    try {
      await addDoc(collection(firestore, 'orders'), {
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: "Preparando",
        waiter_id: user?.id,
        image: pizza.photo_url

      })
      navigate('home')
    } catch (error) {
      setSendingOrder(false)
      return Alert.alert("Pedido", "Não foi possivel cadastrar o pedido")
    } finally {
      setSendingOrder(false)
    }
  }
  useEffect(() => {
    handleGetPizzaById()
  }, [id])
  return (
    <S.Container behavior={Platform.OS === 'ios' ? "padding" : undefined}   >
      <S.ContentScroll >
        <S.Header>
          <ButtonBack
            onPress={() => { goBack() }}
            style={{ marginBottom: 108 }}
          />
        </S.Header>
        <S.Photo source={{ uri: pizza.photo_url }} />
        <S.Form>
          <S.Title>{pizza.name}</S.Title>
          <S.Label>Selecione um tamanho</S.Label>
          <S.Sizes>
            {
              PIZZAS_TYPE.map(type => (
                <RadioButton
                  key={type.id}
                  title={type.name}
                  onPress={() => setSize(type.id)}
                  selected={size === type.id}
                />
              ))
            }
          </S.Sizes>
          <S.FormRow>
            <S.InptGroups>
              <S.Label>Numero da mesa</S.Label>
              <Input keyboardType='numeric' onChangeText={setTableNumber} />
            </S.InptGroups>
            <S.InptGroups>
              <S.Label>Quantidade</S.Label>
              <Input keyboardType='numeric' onChangeText={(value) => setQuantity(Number(value))} />
            </S.InptGroups>
          </S.FormRow>
          <S.Price>Valor de R$ {amount}</S.Price>
          <Button title='Confirmar Pedido' onPress={handleOrder} isLoading={sendingOrder} />
        </S.Form>
      </S.ContentScroll>
    </S.Container>
  );
}