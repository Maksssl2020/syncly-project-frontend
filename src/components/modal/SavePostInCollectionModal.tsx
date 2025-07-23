import { useState } from "react";
import Modal from "./Modal.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Plus, X } from "lucide-react";
import useUserPostCollectionsQuery from "../../hooks/queries/useUserPostCollectionsQuery.ts";
import Spinner from "../spinner/Spinner.tsx";
import useSavePostByUserPostCollectionMutation from "../../hooks/mutations/useSavePostByUserPostCollectionMutation.ts";
import PostCollectionForm from "../form/PostCollectionForm.tsx";

type SavePostInCollectionModalProps = {
  postId: string | number;
  isOpen: boolean;
  onClose: () => void;
};

const SavePostInCollectionModal = ({
  postId,
  isOpen,
  onClose,
}: SavePostInCollectionModalProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { userPostCollections, fetchingUserPostCollections } =
    useUserPostCollectionsQuery();
  const { savePost, savingPost } = useSavePostByUserPostCollectionMutation();

  if (fetchingUserPostCollections) {
    return <Spinner />;
  }

  const handleSavePostToCollection = (postCollectionId: string | number) => {
    savePost({
      postCollectionId: postCollectionId,
      postId: postId,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between p-6 border-b-2 border-gray-600">
        <h2 className="text-xl font-bold text-white-100">
          {showCreateForm ? "Create New Collection" : "Save to Collection"}
        </h2>
        <AnimatedButton
          onClick={onClose}
          className="p-2 rounded-lg"
          bgColor="#222222"
          bgColorHover="#393939"
          textColorHover="#14b8a6"
        >
          <X className="size-5" />
        </AnimatedButton>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!showCreateForm ? (
            <motion.div
              key="collections-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {userPostCollections?.map((collection) => (
                  <motion.button
                    key={collection.id}
                    whileHover={{
                      borderColor: collection.color,
                    }}
                    onClick={() => handleSavePostToCollection(collection.id)}
                    className="w-full p-4 bg-black-300 border-2 border-gray-600 rounded-lg flex items-center gap-4 text-left"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: collection.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white-100 font-medium truncate">
                        {collection.title}
                        {collection.isDefault && (
                          <span className="ml-2 text-xs text-gray-400">
                            (Default)
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {collection.posts.length}{" "}
                        {collection.posts.length === 1 ? "post" : "posts"}
                      </p>
                    </div>
                    <Bookmark className="size-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateForm(true)}
                className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg hover:border-teal-100 transition-colors flex items-center justify-center gap-3 text-gray-400 hover:text-teal-100"
              >
                <Plus className="size-5" />
                <span className="font-medium">Create New Collection</span>
              </motion.button>
            </motion.div>
          ) : (
            <PostCollectionForm onClose={() => setShowCreateForm(false)} />
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default SavePostInCollectionModal;
