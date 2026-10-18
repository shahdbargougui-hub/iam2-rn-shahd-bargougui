import { useEffect, useState } from "react";
import { Text } from "react-native";

type Props = {
  contactId: string;
};

export function OnlineTimer({ contactId }: Props) {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    console.log(`start timer for ${contactId}`);
    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    // Cleanup: runs before the next effect and when the component disappears.
    return () => {
      console.log(`stop timer for ${contactId}`);
      clearInterval(timer);
    };
  }, [contactId]);

  return <Text>En ligne depuis {seconds} s</Text>;
}
