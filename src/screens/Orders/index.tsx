import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import * as S from './styles'
import { OrderCards, OrderProps, } from '@src/components/OrderCards';
import { ItemSeparator } from '@src/components/ItemSeparator';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '@src/config/firebaseConfig';
import { useAuth } from '@src/hooks/auth';


export function Orders() {
  const { user } = useAuth()
  const pizzasRef = collection(firestore, "orders")
  const queryPizza = query(pizzasRef, where('waiter_id', '==', user?.id))
  const [orders, setOrders] = useState<OrderProps[]>([])
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
          <OrderCards index={index} data={item} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </S.Container>
  );
}