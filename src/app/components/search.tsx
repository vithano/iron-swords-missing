'use client'
import {Input} from "@/components/ui/input";
import {fetchData} from "../actions";
import PersonData from "../utils/types";
import {debounce} from "@/lib/utils";

export function Search({setData}: {setData: (data: PersonData[]) => void}) {
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
    </div>
  );
}
