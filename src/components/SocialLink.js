import {
  HStack,
  IconButton,
  useMediaQuery,
  Divider,
  Tooltip,
} from "native-base";
import { breakpoints } from "../theme";
import { GitIcon, LinkedInIcon } from "../assets/icons/icons";

const SocialLinks = () => {
  const [isMobile] = useMediaQuery({ maxWidth: breakpoints.lg });
  const [isPhone] = useMediaQuery({ maxWidth: breakpoints.md });

  return (
    <HStack space={"1%"} alignItems={"center"}>
      {!isPhone && (
        <Divider
          _dark={{ bg: "muted.400" }}
          bg="black"
          w={isMobile ? "45%" : "35%"}
        />
      )}
      <Tooltip
        placement="bottom right"
        label="My github"
        openDelay={100}
        bg="muted.200"
        _dark={{
          bg: "muted.800",
        }}
      >
        <IconButton
          borderRadius="50%"
          size={isPhone ? "2.8em" : "3.8em"}
          icon={<GitIcon />}
          onPress={() =>
            window.open("https://github.com/AgentBillster", "_blank")
          }
          _pressed={{ bg: "muted.300" }}
        />
      </Tooltip>

      <Tooltip
        placement="bottom right"
        label="My Linkedin"
        openDelay={100}
        bg="muted.200"
        _dark={{
          bg: "muted.800",
        }}
      >
        <IconButton
          borderRadius="50%"
          size={isPhone ? "2.8em" : "3.8em"}
          icon={<LinkedInIcon />}
          onPress={() =>
            window.open("https://www.linkedin.com/in/agentbillster", "_blank")
          }
          _pressed={{ bg: "muted.300" }}
        />
      </Tooltip>
    </HStack>
  );
};

export default SocialLinks;
