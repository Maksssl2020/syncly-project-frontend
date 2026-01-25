import type {
  ConversationResponse,
  SelectedConversation,
} from "../../types/conversation.ts";
import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import { format } from "date-fns";
import useAuthentication from "../../hooks/useAuthentication.ts";
import useUserProfileAvatarByUserIdQuery from "../../hooks/queries/useUserProfileAvatarByUserIdQuery.ts";
import ComponentSpinner from "../spinner/ComponentSpinner.tsx";
import { useUserPresence } from "../../hooks/useUserPresence.ts";
import { usePresenceStore } from "../../store/presenceStore.ts";

type ConversationCardProps = {
  conversation: ConversationResponse;
  isActive: boolean;
  onSelect: (data: SelectedConversation) => void;
};

const ConversationCard = ({
  conversation,
  isActive,
  onSelect,
}: ConversationCardProps) => {
  const { userId } = useAuthentication();
  // const navigate = useNavigate();
  useUserPresence(conversation.recipientId);
  const userPresence = usePresenceStore(
    (state) => state.presenceMap[conversation.recipientId] || null,
  );

  const { userProfileAvatar, fetchingUserProfileAvatar } =
    useUserProfileAvatarByUserIdQuery(conversation.recipientId);

  if (fetchingUserProfileAvatar) {
    return (
      <div
        className={
          "flex items-center cursor-pointer gap-3 p-2 rounded-lg border-l-4 w-full h-auto"
        }
      >
        <ComponentSpinner />
      </div>
    );
  }

  return (
    <motion.div
      onClick={() => {
        // navigate(
        //   `/conversation/${conversation.recipientId}/${conversation.recipientUsername}`,
        // );
        onSelect({
          conversationId: conversation.id,
          recipientId: conversation.recipientId,
          recipientUsername: conversation.recipientUsername,
        });
      }}
      key={conversation.id}
      className={
        "flex items-center cursor-pointer gap-3 p-2 rounded-lg border-l-4 w-full h-auto"
      }
      whileHover={{
        backgroundColor: "#393939",
      }}
      animate={{
        backgroundColor: isActive ? "#393939" : "#222222",
        borderColor: isActive ? "#14b8a6" : "#222222",
      }}
    >
      <div className={"relative"}>
        <Avatar avatar={userProfileAvatar} size={"size-12"} />
        {userPresence?.status && (
          <span
            className={
              "absolute bottom-0 right-0 size-3 rounded-full bg-teal-100 "
            }
          />
        )}
      </div>

      <div className={"flex flex-col gap-2 overflow-hidden"}>
        <div className={"flex justify-between items-baseline"}>
          <h3 className={"font-medium text-white-100 truncate"}>
            {conversation.recipientUsername}
          </h3>
          <span className={"text-xs text-gray-400"}>
            {format(new Date(conversation.lastMessageTimestamp), "dd.MM.yyyy")}
          </span>
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={`text-sm truncate text-gray-400`}>
            {" "}
            {conversation.lastMessageSenderId === userId ? "You: " : ""}
            {conversation.lastMessageContent}
          </p>
          {/*{conversation.unreadCount > 0 && (*/}
          {/*  <span className="bg-teal-100 text-white text-xs rounded-full min-w-5 min-h-5 flex items-center justify-center">*/}
          {/*    {conversation.unreadCount}*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationCard;
