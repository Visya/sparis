import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotificationsScreen }
});

export default App;
