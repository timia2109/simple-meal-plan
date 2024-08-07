// In this files we define the features of the landing page

import { getScopedI18n } from "@/locales/server";

type Description = string;

type PlainFeature = {
  heading: Description;
  body: Description[];
  link?: string;
};

type ImageFeature = PlainFeature & {
  image: string;
  alt: string;
  width: number;
  height: number;
};

export type Feature = PlainFeature | ImageFeature;

export const getFeatures: () => Promise<Feature[]> = async () => {
  const t = await getScopedI18n("features");

  return [
    {
      heading: t("featureA"),
      image: "/example.png",
      alt: t("featureAImgAlt"),
      width: 288,
      height: 119,
      body: [t("featureADescription")],
    },
    {
      heading: t("featureB"),
      body: [t("featureBDescription1"), t("featureBDescription2")],
      image: "undraw_real_time_sync_re_nky7.svg",
      alt: t("featureBImgAlt"),
      height: 200,
      width: 200,
    },
    {
      heading: t("featureC"),
      body: [t("featureCDescription")],
      image: "undraw_eating_together_re_ux62.svg",
      alt: t("featureCImgAlt"),
      height: 200,
      width: 200,
    },
    {
      heading: t("featureD"),
      body: [t("featureDDescription")],
    },
    {
      heading: t("featureE"),
      body: [t("featureEDescription")],
      link: "https://github.com/timia2109/simple-meal-plan",
    },
  ];
};

export const isImageFeature = (feature: Feature): feature is ImageFeature =>
  "image" in feature;
