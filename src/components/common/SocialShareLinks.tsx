"use server";

import { getScopedI18n } from "@/locales/server";
import { faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  messagePayload: string;
};

type SocialProvider = {
  icon: IconDefinition;
  name: string;
  openLink: (messagePayload: string) => string;
};

const SocialProviders: SocialProvider[] = [
  {
    icon: faWhatsapp,
    name: "WhatsApp",
    openLink: (messagePayload) =>
      `https://wa.me/?text=${encodeURIComponent(messagePayload)}`,
  },
  {
    icon: faMessage,
    name: "SMS / iMessage",
    openLink: (messagePayload) =>
      `sms:&body=${encodeURIComponent(messagePayload)}`,
  },
  {
    icon: faTelegram,
    name: "Telegram",
    openLink: (messagePayload) =>
      `https://t.me/share/url?url=${encodeURIComponent(messagePayload)}`,
  },
];

export const SocialShareLinks = async ({ messagePayload }: Props) => {
  const t = await getScopedI18n("invite");

  return (
    <div className="join join-vertical xl:join-horizontal">
      {SocialProviders.map((p) => (
        <Link
          prefetch={false}
          target="_blank"
          href={p.openLink(messagePayload)}
          key={p.name}
          className="btn btn-outline join-item"
        >
          <FontAwesomeIcon icon={p.icon} />
          {t("shareVia", p)}
        </Link>
      ))}
    </div>
  );
};
