import { Button } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";
import FormScreen from "./screens/Form";
import InfoTicketScreen from "./screens/InfoTicket";
import About from "./screens/About";

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Notifications: { screen: NotificationsScreen },
    Form: { screen: FormScreen },
    InfoTicket: { screen: InfoTicketScreen },
    About: { screen: About }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#D26283"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff"
      },
      headerTintColor: "#fff",
      headerBackTitle: "Bakåt"
    }
  }
);

export default App;
