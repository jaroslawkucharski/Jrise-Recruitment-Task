import Image from "next/image";
import LogoSrc from "@/public/logo.svg";

export function Logo() {
  return <Image src={LogoSrc} alt="POSTPRODUKCJADZWIEKU.PL" height={40} />;
}
