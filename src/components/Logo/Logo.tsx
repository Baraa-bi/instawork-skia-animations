import { useFocusEffect } from "@react-navigation/native";
import {
  Canvas,
  Skia,
  useValue,
  ImageSVG,
  useSVG,
  BlendMode,
  Group,
  runSpring,
  runTiming,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../lib/constants";

export default function Logo({
  width,
  height,
  logo,
}: {
  width: number;
  height: number;
  logo;
}) {
  const svg = useSVG(logo);
  const animationState = useValue(0);

  const animateLogo = () => {
    animationState.current = 0;
    runSpring(animationState, 65, {
      mass: 3,
      damping: 5,
      velocity: 45,
    });
  };

  useFocusEffect(() => {
    animateLogo();
    return () => {
      runTiming(animationState, 0, { duration: 500 });
    };
  });

  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(Colors.primary), BlendMode.SrcIn)
  );
  return (
    <Canvas style={styles.container}>
      <Group layer={paint}>
        {svg && (
          <ImageSVG
            x={0}
            y={animationState}
            svg={svg}
            width={width}
            height={height}
          />
        )}
      </Group>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
