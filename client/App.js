import { createStackNavigator } from "react-navigation";
import HomeScreen from "./screens/Home";
import TravelProfileScreen from "./screens/TravelProfile";

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  TravelProfile: { screen: TravelProfileScreen }
});

export default App;
