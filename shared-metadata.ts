import { Metadata } from "next";

const title = "Didem Küçükkaraaslan";
const description =
  "Personal portfolio website of Didem Küçükkaraaslan, software engineer, content creator, and course instructor.";

export const sharedMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    url: "https://codingwithdidem.vercel.app/",
    images: [
      {
        url: "https://codingwithdidem.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Didem Küçükkaraaslan",
      },
    ],
  },
  twitter: {
    title,
    description,
    creator: "@DidemKkkaraasl1",
    site: "@DidemKkkaraasl1,",
    card: "summary_large_image",
  },
};
