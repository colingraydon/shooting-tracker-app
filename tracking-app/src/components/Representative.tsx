import { Box } from "@chakra-ui/react";
import React from "react";

interface RepresentativeProps {
  type: string;
  firstName: string;
  lastName: string;
  party: string;
  twitter: string;
  url: string;
  contactForm: string;
  phoneNumber: string;
}

const Representative: React.FC<RepresentativeProps> = (
  props: RepresentativeProps
) => {
  return (
    <Box>
      <Box>{props.firstName}</Box>
      <Box>{props.lastName}</Box>
      <Box>{props.party}</Box>
      <Box>{props.twitter}</Box>
    </Box>
  );
};

export default Representative;
