import { PropsWithoutRef } from "react";

type HighlightProps = PropsWithoutRef<{
  search: string;
  text: string;
}>

const Highlight = ({search, text}: HighlightProps) => {
  if (!text) {
    return null;
  }
  if (!search) {
    return <div>{text}</div>;
  }

  const highlights = text.split(search);

  if (!highlights.length) {
    return <div>{text}</div>;
  }

  return (
    <div>
      {highlights.map((h, i) => (
        <span key={i}>
          <strong>
            {h}
          </strong>
          {i < highlights.length - 1 && (<>{search}</>)}
        </span>
      ))}
    </div>
  );
};

export default Highlight;

