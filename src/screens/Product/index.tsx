import React, { useEffect, useState } from 'react';
import { View, Platform, TouchableOpacity, Alert } from 'react-native'
import * as S from './styles'
import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import * as ImagePicker from 'expo-image-picker';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { auth, firestore, storage } from '@config/firebaseConfig';
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDoc, query } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native'
import { ProductNavigationProps } from '@src/@types/navigation'
import { ProductProps } from '@src/components/ProductCard';
import { useAuth } from '@src/hooks/auth';
type PizzasResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string
    m: string
    g: string
  }
}

export function Product() {
  const route = useRoute();

  const { id } = route.params as ProductNavigationProps
  const { navigate, goBack } = useNavigation()
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [photo_path, setPhotoPath] = useState("")
  const [description, setDescription] = useState("")
  const [priceSizeP, setPriceSizeP] = useState("")
  const [priceSizeM, setPriceSizeM] = useState("")
  const [priceSizeG, setPriceSizeG] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleAddPizza() {
    if (!image) {
      return Alert.alert("Cadatro", "Informe a imagem da pizza.")
    }
    if (!name.trim()) {
      return Alert.alert("Cadatro", "Informe o nome da pizza.")
    }
    if (!description.trim()) {
      return Alert.alert("Cadatro", "Informe a descrição da pizza.")
    }
    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert("Cadatro", "Informe o preço de todos os tamanhos de pizza.")
    }
    const fileName = new Date().getTime();
    const reference = ref(storage, `/pizzas/${fileName}.png`)

    try {
      setIsLoading(true)
      const img = await fetch(image)
      const bytes = await img.blob()
      const imageRef = await uploadBytes(reference, bytes)
      const photo_url = await getDownloadURL(imageRef.ref);
      await addDoc(collection(firestore, 'pizzas'), {
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG
        },
        photo_url,
        photo_path: reference.fullPath
      })
      setName("")
      setDescription("")
      setImage("")
      setPriceSizeG("")
      setPriceSizeM("")
      setPriceSizeP("")
      navigate('home')
    } catch (error) {
      setIsLoading(false);
      return Alert.alert("Error", "Não foi possivel cadastrar")
    }
  }
  async function handlerPickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })
      if (!result.canceled) {
        const img = await fetch(result.assets[0].uri)
        const bytes = await img.blob()
        setImage(result.assets[0].uri)
      }
    }
  }
  async function handleGetPizzaById() {
    if (id) {
      const pizzasRef = doc(firestore, "pizzas", id)
      const product = await getDoc(pizzasRef)
      const pizzas = product.data() as PizzasResponse
      setName(pizzas.name)
      setDescription(pizzas.description)
      setImage(pizzas.photo_url)
      setPriceSizeG(pizzas.prices_sizes.g)
      setPriceSizeM(pizzas.prices_sizes.m)
      setPriceSizeP(pizzas.prices_sizes.p)
      setPhotoPath(pizzas.photo_path)
    }
  }
  function handleDeletePizza() {
    if (id) {
      const pizzasRef = doc(firestore, "pizzas", id)
      deleteDoc(pizzasRef)
        .then(() => {
          const reference = ref(storage, photo_path)
          deleteObject(reference).then(() => {
            // File deleted successfully
            navigate("home")
          }).catch((error) => {
            // Uh-oh, an error occurred!
            Alert.alert("Foto", "Não foi possivel deletar a foto")
          });

        })
        .catch(() => {
          Alert.alert("Deletar",
            'Ops!,🤡 Ocorreu um erro e não foi possivel deletar o placar',
          )
        })
    }
  }
  useEffect(() => {
    handleGetPizzaById()
  }, [id])
  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Header>
          <ButtonBack onPress={() => goBack()} />
          <S.Title>Cadastrar Pizza</S.Title>
          <TouchableOpacity onPress={handleDeletePizza}>
            {
              id ?
                <S.DeleteLabel>Deletar</S.DeleteLabel>
                :
                <View style={{ width: 40 }} />
            }
          </TouchableOpacity>
        </S.Header>
        <S.Upload>
          <Photo uri={image} />
          {!id &&
            <S.PickImageButton title='Carregar' type='SECONDARY' onPress={handlerPickerImage} />
          }
        </S.Upload>
        <S.Form>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <Input onChangeText={setName} value={name} />
          </S.InputGroup>
          <S.InputGroup>
            <S.InputGroupHeader>
              <S.Label>Descrição</S.Label>
              <S.MaxCaracters>0 de 60 caracters</S.MaxCaracters>
            </S.InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription} value={description}
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Label>Tamanhos e preço</S.Label>
            <InputPrice size='P' onChangeText={setPriceSizeP} value={priceSizeP} />
            <InputPrice size='M' onChangeText={setPriceSizeM} value={priceSizeM} />
            <InputPrice size='G' onChangeText={setPriceSizeG} value={priceSizeG} />
          </S.InputGroup>
          {
            !id && <Button title="Cadastar" onPress={handleAddPizza} isLoading={isLoading} />
          }
        </S.Form>
      </ScrollView>
    </S.Container>
  );
}