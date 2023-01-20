import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListItem from "../../components/ListItem/ListItem";
import Logo from "../../components/Logo/Logo";
import { Colors, Screens } from "../../lib/constants";

export default function Home({ navigation }) {
  const renderListItem = ({ item }) => {
    const onItemPress = () => navigation.navigate(item.route);
    return <ListItem onItemPress={onItemPress} title={item.title} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo
          width={150}
          height={150}
          logo={require("../../assets/logo.svg")}
        />
      </View>
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
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 155,
    padding: 15,
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
    color: Colors.primary,
  },
  logoContainer: {
    width: 235,
    height: 260,
    alignSelf: "center",
  },
});
