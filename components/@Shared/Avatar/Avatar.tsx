import Image from "next/image";
import Link from "next/link";
import { PAGE_LINKS } from "@/constants/links";
import { parseDate } from "@/utils/date";

interface IProps {
  username: string;
  image: string;
  createdAt: string;
}

function Avatar({ username, image, createdAt }: IProps) {
  return (
    <Link href={PAGE_LINKS.profile(username)}>
      <Image src={image} alt="profile" width={32} height={32} />
      <div className="info">
        <span className="author">{username}</span>
        <span className="date">{parseDate(createdAt)}</span>
      </div>
    </Link>
  );
}

export default Avatar;
