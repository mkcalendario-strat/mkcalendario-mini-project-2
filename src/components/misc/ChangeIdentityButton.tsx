"use client";

import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AvatarProvider from "../providers/AvatarProvider";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

export default function ChangeIdentityButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  return (
    <Fragment>
      <button
        onClick={toggleModal}
        className="cursor-pointer">
        <i className="fas fa-grid-2 text-neutral-900" />
      </button>
      <ChangeIdentityModal
        toggle={toggleModal}
        visible={isModalVisible}
      />
    </Fragment>
  );
}

interface ChangeIdentityModalProps {
  visible: boolean;
  toggle: () => void;
}

function ChangeIdentityModal({ visible, toggle }: ChangeIdentityModalProps) {
  const [name, setName] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("");

  const regenerateSeed = () => setAvatarSeed(uuidv4());

  const handleSetName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleCreateIdentity = () => {
    Cookies.set("user_name", name ?? "Anonymous");
    Cookies.set("user_avatar_seed", avatarSeed ?? "Anonymous");

    window.location.reload();
  };

  useEffect(() => {
    setName(Cookies.get("user_name") ?? "");
    setAvatarSeed(Cookies.get("user_avatar_seed") ?? "");
  }, []);

  return (
    <Modal
      toggle={toggle}
      visible={visible}
      title="Create Identity"
      className="flex flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-2">
        <AvatarProvider
          size="w-[150px]"
          seed={avatarSeed}
        />
        <p className="text-2xl font-medium">{name}</p>
        <Button
          onClick={regenerateSeed}
          className="bg-neutral-900 text-neutral-100">
          <i className="far fa-rotate-reverse" />
        </Button>
      </div>

      <Input
        id="name"
        value={name}
        placeholder="Your anonymous name."
        onChange={handleSetName}
      />

      <Button
        onClick={handleCreateIdentity}
        className="bg-neutral-900 text-neutral-100">
        Create Identity
      </Button>
    </Modal>
  );
}
