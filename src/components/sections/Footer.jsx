import { Heart } from "lucide-react";
import { FOOTER } from "../../data/content";

export default function Footer() {
  return (
    <footer className="footer">
      Hecho con <Heart size={13} fill="currentColor" /> {FOOTER}
    </footer>
  );
}
