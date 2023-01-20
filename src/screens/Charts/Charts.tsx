import React from "react";
import { Colors } from "../../lib/constants";
import { StyleSheet, View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
import CircularChart from "../../components/CircularChart/CircularChart";

export default function Charts() {
  const primaryFont = useFont(
    require("../../assets/fonts/SofiaSans-SemiBold.ttf"),
    40
  );
  const secondaryFont = useFont(
    require("../../assets/fonts/SofiaSans-Light.ttf"),
    25
  );

  if (!primaryFont || !secondaryFont) return null;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CircularChart
          strokeWidth={9}
          radius={100}
          text={"Instawork"}
          color={"#ef4444"}
          duration={3000}
          targetPercentage={0.85}
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
      </View>
      <View style={styles.subContainer}>
        <CircularChart
          strokeWidth={9}
          radius={100}
          text={"Instawork"}
          color={"#22c55e"}
          duration={3000}
          targetPercentage={0.9}
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
      </View>
      <View style={styles.subContainer}>
        <CircularChart
          strokeWidth={9}
          radius={100}
          duration={4000}
          text={"Instawork"}
          color={Colors.primary}
          targetPercentage={1}
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    width: 210,
    height: 210,
  },
});
