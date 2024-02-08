import { Text, View, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from 
"react-native-keyboard-aware-scroll-view";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

import { Header } from "@/components/header";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Cart() {
    const cartStore = useCartStore()
    const [address, setAddress] = useState("")
    const navigation = useNavigation();

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

    function handleProductRemove(product: ProductCartProps) {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
            {
                text: "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id),
            }
        ])
    }

    function handleOrder() {
        if(address.trim().length === 0){
            return Alert.alert("Pedido", "Informe os dados da entrega")
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        const message = `
        🍔 NOVO PEDIDO
        \n Entregar em: ${address}

        ${products}

        \n Valor total: ${total}
        `

        Alert.alert("Pedido Enviado", "Seu pedido foi enviado")

        cartStore.clear()
        navigation.goBack()
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu Carrinho" />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                    {cartStore.products.length > 0 ? (
                        <View className="border-b border-slate-700">
                            {
                                cartStore.products.map((product) => (
                                    <Product
                                    key={product.id}
                                    data={product}
                                    onPress={() => handleProductRemove(product)}
                                    />
                                ))
                            }
                        </View>
                    ) :
                        <Text
                            className="font-body text-slate-400 text-center my-8">
                            Seu carrinho esta vazio.
                        </Text>
                    }

                    <View
                        className="flex-row gap-2 items-center mt-5 mb-4"
                    >
                        <Text className="text-white text-xl font-subtitle">Total:</Text>
                        <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                    </View>

                    <Input
                    onSubmitEditing={handleOrder}
                    blurOnSubmit={true}
                    onChangeText={setAddress}
                    returnKeyType="next"
                    placeholder="Informe o Endereço de entrega com Rua, Bairro, CEP, e complemento..." />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>
                <LinkButton title="Voltar ao cardapio" href="/" />
            </View>
        </View>
    )
}