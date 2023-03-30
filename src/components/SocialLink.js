import { HStack, VStack, Box, Text, IconButton } from "native-base";
import { ArrowUpIcon } from "native-base";
import { GitIcon, LinkedInIcon, MailIcon } from "../assets/icons/icons";

const SocialLinks = () => {
  const socialData = [
    {
      icon: <MailIcon />,
      name: "Gmail",
      email: "william.z.wilson95@gmail.com",
      link: "https://www.gmail.com",
    },
    {
      icon: <GitIcon />,
      name: "Github",
      email: "AgentBillster",
      link: "https://www.github.com/agentbillster",
    },
    {
      icon: <LinkedInIcon />,
      name: "Linkedin",
      email: "William_wilson95",
      link: "https://www.linkedin.com/in/agentbillster/",
    },
  ];

  return (
    <HStack variant="socialspacing">
      {socialData.map(({ icon, name, email, link }, index) => (
        <HStack key={index} space={[2, 2, 4, 6]} alignItems={"center"}>
          <Box>{icon}</Box>
          <VStack>
            <Text variant={"socialname"}>{name}</Text>
            <Text _light={{ color: "muted.600" }} variant={"socialemail"}>
              {email}
            </Text>
          </VStack>
          <IconButton
            size={["4", "6", "8", "12"]}
            colorScheme={"coolGray"}
            variant={"outline"}
            p="1"
            icon={<ArrowUpIcon />}
            top={-10}
            style={{
              transform: "rotate(45deg)",
            }}
            onPress={() => window.open(link, "_blank")}
          />
        </HStack>
      ))}
    </HStack>
  );
};

export default SocialLinks;
