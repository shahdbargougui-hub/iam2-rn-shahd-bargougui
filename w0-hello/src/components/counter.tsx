import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  step?: number;
};

export function Counter({ label, step = 1 }: Props) {
  const [count, setCount] = useState<number>(0);

  const handlePress = () => {
    setCount(count + step);
    // count still holds the value of the current render here.
    console.log(count);
  };

  return (
    <View>
      <Text>
        {label} : {count}
      </Text>
      <Pressable onPress={handlePress}>
        <Text>Ajouter {step}</Text>
      </Pressable>
    </View>
  );
}
