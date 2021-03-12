import { BACKEND_URL } from "../config/axios";

interface ShortedLinkProps {
  shorted: string;
}

export default function ShortedLink({ shorted }: ShortedLinkProps) {
  const link = `${BACKEND_URL}/${shorted}`;

  return (
    <div className="ShortedLink" style={{ marginTop: "20px" }}>
      <p className="is-size-3">
        Link encurtado:
        <a href={link} target="BLANK">
          {link}
        </a>
      </p>
    </div>
  );
}
