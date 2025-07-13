"use client";

import DeleteCommentModal from "@/components/modals/DeleteCommentModal";
import EditCommentModal from "@/components/modals/EditCommentModal";
import Avatar from "@/components/ui/Avatar";
import { UserComment } from "@/types/interactions";
import { Fragment, useState } from "react";

export type CommentsProps = Pick<
  UserComment,
  "id" | "text" | "timestamp" | "userAvatarSeed" | "userName"
>;

export default function Comment({
  id,
  userName,
  userAvatarSeed,
  timestamp,
  text
}: CommentsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <Fragment>
      <div className="relative flex flex-col gap-3 bg-white p-[20px]">
        <div className="flex flex-wrap gap-2">
          <Avatar
            seed={userAvatarSeed}
            size="w-[40px]"
          />
          <div>
            <p className="leading-[20px] font-medium">{userName}</p>
            <p className="text-xs leading-[20px] text-neutral-600">
              {timestamp}
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex">
          <button
            onClick={() => setShowEditModal(true)}
            className="cursor-pointer bg-green-700 p-[3px] leading-0">
            <i className="far fa-fw fa-edit text-xs text-neutral-100" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="cursor-pointer bg-red-700 p-[3px] leading-0">
            <i className="far fa-fw fa-trash text-xs text-neutral-100" />
          </button>
        </div>

        <p className="text-sm">{text}</p>
      </div>

      {showEditModal && (
        <EditCommentModal
          id={id}
          toggle={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteCommentModal
          id={id}
          toggle={() => setShowDeleteModal(false)}
        />
      )}
    </Fragment>
  );
}
