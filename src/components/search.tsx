'use client'
import {Input} from "@/components/ui/input";
import {fetchData} from "@/actions";
import PersonData from "../app/utils/types";
import { useRef } from "react";
import debounce  from "lodash.debounce";
import { useCallback } from "react";
export function Search({setData}: {setData: (data: PersonData[]) => void}) {
  const inputValueRef = useRef('');

  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current;
      if (name) {
        const result = await fetchData({ name });
        setData(result);
      }
    }, 250),
    []
  );

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    inputValueRef.current = name;
    if (name === '') {
      setData([]);
      debouncedSearch.cancel();  // Cancel the debounce
    } else {
      debouncedSearch();
    }
  }

  return (
      <Input
        dir='rtl'
        type="search"
        placeholder="... שם / שם משפחה / טלפון"
        className="md:w-[100px] lg:w-[300px]"
        onChange={onInputChange}
      />
  );
}
