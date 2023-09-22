import React, { useEffect, useState } from 'react'
import { FlatList, Alert } from 'react-native'
import * as S from './styles'
import { OrderCards, OrderProps, } from '@src/components/OrderCards';
import { ItemSeparator } from '@src/components/ItemSeparator';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '@src/config/firebaseConfig';
import { useAuth } from '@src/hooks/auth';


export function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<OrderProps[]>([])
  const pizzasRef = collection(firestore, "orders")
  const queryPizza = query(pizzasRef, where('waiter_id', '==', user?.id))
  async function handleGetOrders() {
    onSnapshot(queryPizza, (snapShot) => {
      const data = snapShot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      }) as OrderProps[]
      setOrders(data)
    })
  }
  async function handlePizzaDelivered(id: string) {
    Alert.alert("Pedido", "Confirmar que a pizza foi entregue?", [
      {
        text: "Não",
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          const pizzaUpdate = doc(firestore, 'orders', id)
          await updateDoc(pizzaUpdate, {
            status: "Entregue"
          })
        }
      }
    ])

  }
  useEffect(() => {
    handleGetOrders()
  }, [])
  return (
    <S.Container>
      <S.Header>
        <S.Title>Pedidos feitos</S.Title>
      </S.Header>
      <FlatList
        key={"#"}
        data={orders}
        keyExtractor={item => item?.id}
        renderItem={({ item, index }) => (
          <OrderCards
            index={index}
            data={item}
            disabled={item.status === "Entregue"}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </S.Container>
  );
}