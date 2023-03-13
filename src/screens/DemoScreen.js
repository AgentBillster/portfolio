import React from "react";
import { animated } from "@react-spring/web";
import { HStack, Box, Center } from "native-base";
import TradeApp from "./../Projects/TradeApp/src/TradeApp";


const DemoScreen = ({ style }) => {
  return (
    <Center
      w={'full'}
      h='full'
    >

      {/* <Box w={'375'} h='812' position={'absolute'} overflow="hidden" borderWidth={1}>
        <TradeApp />
      </Box> */}


      <div className="iphone-x">
        <i></i>
        <TradeApp />
      </div>

    </Center>
  );
};

export default DemoScreen;
{/* <Box w={'375'} h='812'>
      </Box> */}
