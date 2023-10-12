import Image from "next/image";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <Image src="/spinner.gif" alt="loading..." width={200} height={200} />
    </div>
  );
};

export default Spinner;
