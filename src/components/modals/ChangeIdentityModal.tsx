"use client";

import {
  createIdentity,
  generateAvatarSeed,
  getIdentity
} from "@/actions/utils/identity";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Identity } from "@/types/identity";
import { Fragment, useCallback, useEffect, useState } from "react";

interface ChangeIdentityModalProps {
  visible: boolean;
  refetch: () => void;
  toggle: () => void;
}

export default function ChangeIdentityModal({
  refetch,
  visible,
  toggle
}: ChangeIdentityModalProps) {
  const [identity, setIdentity] = useState<Identity | null>(null);

  const regenerateSeed = async () => {
    const seed = await generateAvatarSeed();
    setIdentity((prev) => (prev ? { ...prev, userAvatarSeed: seed } : null));
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setIdentity((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCreateIdentity = async () => {
    if (!identity) return;
    const { userName, userAvatarSeed } = identity;
    await createIdentity({ userName, userAvatarSeed });
    toggle();
    refetch();
  };

  const fetchUserData = useCallback(async () => {
    const identity = await getIdentity();
    setIdentity(identity);
  }, []);

  useEffect(() => {
    if (visible) fetchUserData();
  }, [fetchUserData, visible]);

  return (
    <Modal
      toggle={toggle}
      title="Create Identity"
      className="flex flex-col gap-5">
      {identity && (
        <Fragment>
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar
              size="w-[150px]"
              seed={identity.userAvatarSeed}
            />
            <p className="text-2xl font-medium">{identity.userName}</p>
            <Button
              onClick={regenerateSeed}
              className="bg-neutral-900 text-neutral-100">
              <i className="far fa-rotate-reverse" />
            </Button>
          </div>

          <Input
            id="name"
            name="userName"
            value={identity.userName}
            placeholder="Your anonymous name."
            onChange={handleInputChange}
          />

          <Button
            onClick={handleCreateIdentity}
            className="bg-neutral-900 text-neutral-100">
            Create Identity
          </Button>
        </Fragment>
      )}
    </Modal>
  );
}
