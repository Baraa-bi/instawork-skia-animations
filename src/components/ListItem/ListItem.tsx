import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  onItemPress: () => null;
  title: string;
}

export default function ListItem(props: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={props.onItemPress}
    >
      <Text>{props.title}</Text>
      <Text>»</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#BDBDBD",
  },
});
