import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Geocodio from "geocodio-library-node";
import Representative from "./Representative";
// import getLocation from "../utils/getLocation";

interface RepInfoProps {}

const RepInfo: React.FC<RepInfoProps> = ({}) => {
  const [repState, setRepState] = useState<any[]>([]);
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
      //   console.log(response.data.location);
      handleSetLong(response.data.location.longitude);
      handleSetLat(response.data.location.latitude);
    };
    getLocation();

    const getRepresentative = async (lat: number, long: number) => {
      //40.264, -74.542
      const geocoder = new Geocodio(process.env.NEXT_PUBLIC_REPRESENTATIVE_API);
      // const response = await geocoder.reverse(`${lat},${long}`, ["cd"]);
      const response = await geocoder.reverse("40.264, -74.542", ["cd"]);
      return response.results[0].fields.congressional_districts[0]
        .current_legislators;
    };

    getRepresentative(lat, long).then((res) => {
      console.log("res: ", res);
      handleSetRepState(res);
    });
  }, []);
  return (
    <Box>
      {!lat ? null : (
        <Box>
          {repState.length === 0 ? (
            <Box>loading...</Box>
          ) : (
            <Representative {...repState[0]} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default RepInfo;
