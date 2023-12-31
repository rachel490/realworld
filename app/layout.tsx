import { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4, Merriweather_Sans, Titillium_Web } from "next/font/google";
import { getServerSession } from "next-auth";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header/Header";
import AuthenticatedHeader from "@/components/Layout/Header/AuthenticatedHeader";
import AuthSession from "@/components/NextAuth/NextAuthProvider";
import { nextAuthOptions } from "@/lib/nextAuth";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-source-sans-3",
});

const sourceSerif4 = Source_Serif_4({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-source-serif-4",
});

const merriweatherSans = Merriweather_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-merriweather-sans",
});

const titilliumWeb = Titillium_Web({
  display: "swap",
  subsets: ["latin"],
  weight: "700",
  variable: "--font-titillium-web",
});

export const metadata: Metadata = {
  title: "Real World",
  description: "Real World w/ Next.js 13",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html
      lang="en"
      className={`${sourceSans3.variable} ${sourceSerif4.variable} ${merriweatherSans.variable} ${titilliumWeb.variable}`}
    >
      <AuthSession>
        <body>
          {session ? <AuthenticatedHeader /> : <Header />}
          <main>{children}</main>
          <Footer />
        </body>
      </AuthSession>
    </html>
  );
}
