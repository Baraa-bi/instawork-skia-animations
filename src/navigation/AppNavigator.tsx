import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screens } from "../lib/constants";
import Charts from "../screens/Charts/Charts";
import Home from "../screens/Home/Home";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen component={Home} name={Screens.HOME} />
      <Stack.Screen component={Charts} name={Screens.CHARTS} />
    </Stack.Navigator>
  );
}
