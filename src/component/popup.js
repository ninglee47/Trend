import React from "react";
import { Box } from "@chakra-ui/react";

export default function PopUp(props) {
    return (props.trigger) ? (
        <Box p={230}>Wait</Box>
    ): ""
}