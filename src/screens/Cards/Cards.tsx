import React, { useEffect } from "react";
import { Colors } from "../../lib/constants";
import { ScrollView, StyleSheet, View } from "react-native";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import { Gyroscope } from "expo-sensors";
import Animated, {
  Extrapolate,
  interpolate,
  SlideInDown,
  SlideInRight,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { LightenDarkenColor } from "../../lib/helpers";

export default function Cards() {
  const gyroValue = useSharedValue({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    const subscription = Gyroscope.addListener(({ x, y, z }) => {
      gyroValue.value = { x, y, z };
    });
    return () => {
      subscription.remove();
    };
  }, [gyroValue.value]);

  const prev = useSharedValue({ x: 0 });
  const derivedTranslations = useDerivedValue(() => {
    "worklet";
    const MAX_X = 200;
    let newX = prev.value.x + gyroValue.value.y * -6;

    // Can be more cleaner
    if (Math.abs(newX) >= MAX_X) {
      newX = prev.value.x;
    }
    prev.value = {
      x: newX,
    };
    return {
      x: newX,
    };
  }, [gyroValue.value]);

  const AnimatedStyles = {
    motion: useAnimatedStyle(() => {
      const inputRange = [-100, 0, 100];
      const outputRange = [-20, 0, 20];
      return {
        transform: [
          {
            translateX: withSpring(
              interpolate(
                derivedTranslations.value.x,
                inputRange,
                outputRange,
                Extrapolate.EXTEND
              )
            ),
          },
        ],
      };
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View layout={SlideInRight.springify().damping(12)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PaymentCard
            cardHolder="Adam Stepinski"
            cardNumber={"4242424242424242"}
            cardType="CREDIT"
            colors={["#be123c", "#f43f5e", "#be123c"]}
            containerStyle={AnimatedStyles.motion}
          />
          <PaymentCard
            cardHolder="Florent Bonomo"
            cardNumber={"1234123412341234"}
            cardType="DEBIT"
            colors={["#166534", "#22c55e", "#166534"]}
            containerStyle={AnimatedStyles.motion}
          />
          <PaymentCard
            cardHolder="David Monson"
            cardNumber={"1234567891234567"}
            cardType="CREDIT"
            colors={["#3730a3", "#3b82f6", "#3730a3"]}
            containerStyle={AnimatedStyles.motion}
          />
          <PaymentCard
            cardHolder="Reshav Singla"
            cardNumber={"1234567891234567"}
            cardType="CREDIT"
            colors={["#b45309", "#f59e0b", "#b45309"]}
            containerStyle={AnimatedStyles.motion}
          />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  subContainer: {
    width: 210,
    height: 210,
  },
});
