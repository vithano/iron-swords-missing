'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import fetchData from "../actions";
import SheetData from "../utils/types";
import { debounce } from "@/lib/utils";

export function Search() {
  const [data, setData] = useState<[Partial<SheetData>]>([{}]);
  const handleSearch = debounce(async (name: string) => {
    const result = await fetchData({ name });
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
      {data && (
        <div>
          {/* Render your data here */}
          {data.map((row, index) => (
            <div key={index}>{JSON.stringify(row)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
