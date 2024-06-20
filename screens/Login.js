import { useAuth0, Auth0Provider } from "react-native-auth0";
import { Button } from "react-native";

const LoginButton = () => {
  const { authorize } = useAuth0();
  const onPress = async () => {
    try {
      await authorize();
      console.log("Button pressed!");
    } catch (e) {
      console.error(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />;
};
export default LoginButton;
