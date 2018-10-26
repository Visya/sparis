import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";
import FormScreen from "./screens/Form";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotificationsScreen },
  Form: { screen: FormScreen },
});

export default App;
