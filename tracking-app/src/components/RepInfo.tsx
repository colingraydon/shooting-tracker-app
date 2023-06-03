import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Geocodio from "geocodio-library-node";
// import getLocation from "../utils/getLocation";

interface RepInfoProps {}

const RepInfo: React.FC<RepInfoProps> = ({}) => {
  const [repState, setRepState] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const handleSetLat = (input: any) => {
    setLat(input);
  };
  const handleSetLong = (input: any) => {
    setLong(input);
  };
  const handleSetRepState = (input: any) => {
    setRepState(input);
  };
  useEffect(() => {
    const getLocation = async () => {
      const config = {
        method: "get",
        url: `https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.NEXT_PUBLIC_LOCATION_API}`,
      };
      const response = await axios(config);
      console.log(response.data.location);
      handleSetLong(response.data.location.longitude);
      handleSetLat(response.data.location.latitude);
    };
    getLocation();

    const getRepresentative = async (lat: number, long: number) => {
      const geocoder = new Geocodio(process.env.NEXT_PUBLIC_REPRESENTATIVE_API);
      const response = await geocoder.reverse(`${lat},${long}`, ["cd"]);
      console.log("response: ", response);
      return response;
    };

    const res = getRepresentative(lat, long);
  }, []);
  return (
    <Box>
      {!lat ? null : (
        <Box>
          <Box>location: {long}</Box>
          <Box>lat: {lat}</Box>
        </Box>
      )}
    </Box>
  );
};

export default RepInfo;
