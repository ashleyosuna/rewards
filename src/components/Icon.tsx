import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faShirt,
  faPlane,
  faHeart,
  faBook,
  faCartShopping,
  faMusic,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  coffee: faMugHot,
  clothes: faShirt,
  trip: faPlane,
  heart: faHeart,
  book: faBook,
  shopping: faCartShopping,
  music: faMusic,
  treat: faCookieBite,
};

export default function Icon({
  name,
  className,
}: {
  name: keyof typeof iconMap;
  className: string;
}) {
  return <FontAwesomeIcon icon={iconMap[name]} className={className} />;
}
