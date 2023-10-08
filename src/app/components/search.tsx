'use client'
import {useState} from "react";
import {Input} from "@/components/ui/input";
import fetchData from "../actions";
import PersonData from "../utils/types";
import {debounce} from "@/lib/utils";
import {PersonCard} from "./person-card";

export function Search() {
  const [data, setData] = useState<PersonData[]>([]);
  const handleSearch = debounce(async (name: string) => {
    const result = await fetchData({name});
    setData(result);
  }, 500);

  return (
    <div>
      <Input
        dir='rtl'
        type="search"
        placeholder="פרטים מזהים"
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e) => handleSearch(e.target.value)}
      />
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {
          data.map((personData, idx) =>
            <li key={idx} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              <PersonCard  {...personData} />
            </li>
          )}


      </ul>
    </div>
  );
}
