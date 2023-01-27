import { useFocusEffect } from "@react-navigation/native";
import {
  Canvas,
  Skia,
  useValue,
  ImageSVG,
  useSVG,
  BlendMode,
  runSpring,
  runTiming,
  Group,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../lib/constants";

export default function Logo({
  width,
  height,
  logo,
  color,
}: {
  width: number;
  height: number;
  logo;
  color;
}) {
  const svg = useSVG(logo);
  const animationState = useValue(0);

  const animateLogo = () => {
    animationState.current = 0;
    runSpring(
      animationState,
      {
        from: 20,
        to: 4,
      },
      {
        damping: 7,
      }
    );
  };

  useFocusEffect(() => {
    animateLogo();
    return () => {
      runTiming(animationState, 0, { duration: 500 });
    };
  });

  const paint = useMemo(() => Skia.Paint(), []);
  paint.setColorFilter(
    Skia.ColorFilter.MakeBlend(Skia.Color(color), BlendMode.SrcIn)
  );
  return (
    <Canvas style={styles.container}>
      <Group layer={paint}>
        {svg && (
          <ImageSVG
            x={animationState}
            y={0}
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
