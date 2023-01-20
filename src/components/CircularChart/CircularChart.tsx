import {
  Canvas,
  Path,
  Skia,
  Text,
  SkFont,
  useValue,
  runTiming,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { Easing, StyleSheet } from "react-native";

interface Props {
  text: string;
  radius: number;
  duration: number;
  strokeWidth: number;
  primaryFont: SkFont;
  secondaryFont: SkFont;
  targetPercentage: number;
  color: string;
}

export default function CircularChart({
  radius,
  duration,
  strokeWidth,
  targetPercentage,
  primaryFont,
  secondaryFont,
  text,
  color,
}: Props) {
  const innerRadius = radius - strokeWidth / 2;
  const path = Skia.Path.Make();
  const targetText = `${targetPercentage * 100}%`;
  path.addCircle(radius, radius, innerRadius);
  const width = primaryFont.getTextWidth(targetText);
  const textWidth = secondaryFont.getTextWidth(text);

  const animationState = useValue(0);

  const animateChart = () => {
    animationState.current = 0;
    runTiming(animationState, targetPercentage, {
      duration,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  useEffect(() => {
    animateChart();
  }, []);

  return (
    <Canvas style={styles.container}>
      <Path
        path={path}
        color={"#cbd5e1"}
        style="stroke"
        strokeCap="round"
        start={0}
        end={100}
        strokeWidth={strokeWidth}
      />
      <Path
        path={path}
        color={color}
        style="stroke"
        strokeCap="round"
        start={0}
        end={animationState}
        strokeWidth={strokeWidth}
      />
      <Text
        color={color}
        text={targetText}
        font={primaryFont}
        x={innerRadius - width / 2}
        y={radius + strokeWidth}
        opacity={animationState}
      />
      <Text
        text={text}
        y={radius + 40}
        color="grey"
        font={secondaryFont}
        x={innerRadius - textWidth / 2}
        opacity={animationState}
      />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
