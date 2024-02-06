import { ActivityIndicator, View } from "react-native";
import colors from 'tailwindcss/colors'

export function Loading() {
    return (
        <View className="flex-1 items-center justfy-center">
            <ActivityIndicator color={colors.white} />
        </View>
    )
}