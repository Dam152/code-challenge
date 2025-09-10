import { PacmanLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="!py-0 w-full h-screen flex items-center justify-center">
      <PacmanLoader />
    </div>
  );
}
