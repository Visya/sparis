import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";
import InfoTicketScreen from "./screens/InfoTicket";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotificationsScreen },
  InfoTicket: { screen: InfoTicketScreen }
});

export default App;
