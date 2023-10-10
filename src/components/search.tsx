'use client'
import {Input} from "@/components/ui/input";
import {fetchData} from "@/actions";
import PersonData from "../app/utils/types";
import { useRef } from "react";
import debounce  from "lodash.debounce";
import { useCallback } from "react";
import { useState } from "react";
const MIN_QUERY_LENGTH = 3;
export function Search({setData}: {setData: (data: PersonData[]) => void}) {
  const inputValueRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current?.trim();
      if (name && name.length >= MIN_QUERY_LENGTH) {
        setIsLoading(true);
        const result = await fetchData({ name });
        setData(result);
        setIsLoading(false);
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
      placeholder="שם פרטי/משפחה (בעברית)..."
      className="md:w-[100px] lg:w-[300px]"
      onChange={onInputChange}
      isLoading={isLoading}
      iconSrc={'/search.svg'}
    />
  );
}
