import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Colors } from "../../lib/constants";
import Logo from "../Logo/Logo";
const height = Dimensions.get("window").height;

type CARD_TYPE = "CREDIT" | "DEBIT";

interface Props {
  cardNumber: string;
  cardHolder: string;
  cardType: CARD_TYPE;
  colors: string[];
  containerStyle?: any;
}

export default function CreditCard({
  colors,
  cardNumber,
  cardHolder,
  cardType,
  containerStyle,
}: Props) {
  const formatedCardNumber = useMemo(() => {
    let number = "";
    Array.from(cardNumber).forEach((c, i) => {
      number += c;
      if ((i + 1) % 4 === 0) return (number += " ");
    });
    return number;
  }, [cardNumber]);

  return (
    <View style={[styles.container]}>
      <View style={[styles.subContainer]}>
        <View style={styles.header}>
          <View style={{ height: 120, width: 70 }}>
            <Logo
              width={70}
              height={120}
              color="white"
              logo={require("../../assets/logo.svg")}
            />
          </View>
          <View>
            <Text style={styles.cardType}>{cardType}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.cardNumber}>{formatedCardNumber}</Text>
          <Text style={styles.cardHolder}>{cardHolder}</Text>
        </View>
      </View>
      <Animated.View style={[containerStyle, styles.background]}>
        <LinearGradient
          colors={colors}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.5, y: 1.5 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    height: height * 0.25,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: Colors.primary,
  },
  subContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    marginBottom: 10,
  },
  cardHolder: {
    textTransform: "uppercase",
    fontSize: 18,
    color: "#F2f2f2",
  },
  cardType: {
    color: "white",
  },
  background: {
    position: "absolute",
    zIndex: -1,
    left: -100,
    right: -100,
    top: 0,
    bottom: 0,
  },
});
