import {View, Text, FlatList } from 'react-native'
import { Header } from '@/components/header'
import { CaregoryButton } from '@/components/category-button'
import { CATEGORIES } from '@/utils/data/products'
import { useState } from 'react'

export default function Home() {
    const [category, setCategory] = useState(CATEGORIES[0])

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory);
    }

    return (
        <View className='flex-1 pt-8'>
            <Header title="Faça seu pedido" cartQuantity={2} />
            <FlatList
              data={ CATEGORIES }
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <CaregoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)} />
              )}
              horizontal
              className='max-h-10 mt-5'
              contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator= { false }
            />
        </View>
    )
}
