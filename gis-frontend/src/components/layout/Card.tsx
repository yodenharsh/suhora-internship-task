import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Card: FC<Props> = (props) => {
  return (
    <div className="mx-auto lg:w-[95%] shadow-md shadow-black w-full border-slate-700 border-1 bg-gray-50 py-4">
      {props.children}
    </div>
  );
};

export default Card;
