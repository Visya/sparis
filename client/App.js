import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import NotificationsScreen from "./screens/Notifications";
import FormScreen from "./screens/Form";
import InfoTicketScreen from "./screens/InfoTicket";
import InfoContactScreen from "./screens/InfoContact";
import InfoBankScreen from "./screens/InfoBank";
import CompensationScreen from "./screens/Compensation";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  InfoContact: { screen: InfoContactScreen },
  InfoTicket: { screen: InfoTicketScreen },
  InfoBank: { screen: InfoBankScreen },
  Notifications: { screen: NotificationsScreen },
  Form: { screen: FormScreen },
  Compensation: { screen: CompensationScreen }
});

export default App;
