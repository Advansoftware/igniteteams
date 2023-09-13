import theme from "./src/theme";
import { ThemeProvider } from "styled-components";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Groups from "@screens/Groups";
import { Loading } from "@components/Loading";
import { StatusBar } from "react-native";
import { NewGroups } from "@screens/NewGroups";

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});
  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <NewGroups/> : <Loading/>}
    </ThemeProvider>
    
  );
}