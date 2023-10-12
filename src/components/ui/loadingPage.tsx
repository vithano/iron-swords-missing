import Spinner from "./spinner";
import React from "react";
export const LoadingPage = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24"
      dir="rtl"
    >
      <div className={"max-w-[400px] bg-inherit shadow flex flex-col my-4 p-6"}>
        <p className={"text-xl font-semibold pb-5"}>טוען</p>
        <p className={"pb-2"}>אנא המתן בזמן שאנחנו מאמתים את הקישור</p>
        <Spinner />
      </div>
    </div>
  );
};
