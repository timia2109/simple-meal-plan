import Image from "next/image";
import type { FC } from "react";
import type { Feature } from "./Features";
import { isImageFeature } from "./Features";

type Props = {
  feature: Feature;
};

export const FeatureBox: FC<Props> = ({ feature }) => (
  <div className="card bg-base-300 shadow-2xl">
    {isImageFeature(feature) && (
      <figure>
        <Image
          src={feature.image}
          alt={feature.alt}
          width={feature.width}
          height={feature.height}
        />
      </figure>
    )}
    <div className="card-body">
      <h2 className="card-title flex justify-center">{feature.heading}</h2>
      {feature.body.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {feature.link && (
        <div className="card-actions justify-end">
          <a
            href={feature.link}
            target="_blank"
            className="btn btn-outline btn-secondary"
          >
            More Infos
          </a>
        </div>
      )}
    </div>
  </div>
);
