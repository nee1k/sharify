import { Box } from "@chakra-ui/react";
import { ChatState } from "../../../context/ChatProvider";
import SideDrawer from "../../layouts/SideDrawer/SideDrawer";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const { fetchAgain, setFetchAgain } = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"91.5vh"}
        padding={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
