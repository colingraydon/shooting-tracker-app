import { Box } from "@chakra-ui/react";
import RepInfo from "../components/RepInfo";

import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Index = () => (
  <Box>
    <DarkModeSwitch></DarkModeSwitch>
    <RepInfo></RepInfo>
    <Box>hello world</Box>
    <RepInfo></RepInfo>
  </Box>
);

export default Index;
