import { LoaderIcon } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoaderIcon className="size-12 animate-spin" />
    </div>
  );
};

export default PageLoader;
