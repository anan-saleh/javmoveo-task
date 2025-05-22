import { useWindowDimensions } from "react-native";

export const useResize = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  return { isMobile };
};