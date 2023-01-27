import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ListItem from "../../components/ListItem/ListItem";
import { Screens } from "../../lib/constants";

export default function Home({ navigation }) {
  const renderListItem = ({ item }) => {
    const onItemPress = () => navigation.navigate(item.route);
    return <ListItem onItemPress={onItemPress} title={item.title} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to{`\n`}
        <Text style={styles.superText}>Instawork{"\n"}</Text>react-native-skia
        animations
      </Text>
      <FlatList
        data={animations}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const animations = [
  {
    id: "1",
    route: Screens.CHARTS,
    title: "Skia Circular Charts",
  },
  {
    id: "1",
    route: Screens.CARDS,
    title: "Animated Motion Payment cards",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    color: "grey",
    marginVertical: 25,
  },
  superText: {
    fontSize: 45,
    fontWeight: "600",
    color: "black",
  },
  logoContainer: {
    width: 70,
    height: 120,
    alignSelf: "center",
  },
});
