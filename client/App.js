import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";
import FormScreen from "./screens/Form";
import InfoTicketScreen from "./screens/InfoTicket";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Notifications: { screen: NotificationsScreen },
  Form: { screen: FormScreen },
  InfoTicket: { screen: InfoTicketScreen }
});

export default App;
