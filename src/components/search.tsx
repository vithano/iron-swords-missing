'use client'
import {Input} from "@/components/ui/input";
import {fetchData} from "@/actions";
import PersonData from "../app/utils/types";
import { useRef } from "react";
import debounce  from "lodash.debounce";
import { useCallback } from "react";
import { useState } from "react";
const MIN_QUERY_LENGTH = 3;
export function Search({setData, setMessage}: {setData: (data: PersonData[]) => void, setMessage: (msg: string) => void}) {
  const inputValueRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current?.trim();
      if (name && name.length >= MIN_QUERY_LENGTH) {
        setIsLoading(true);
        try {
          const result = await fetchData({name});
          setData(result);
          setMessage(result.length ? '' : 'לא נמצאו תוצאות');
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setIsLoading(false);
          setMessage('משהו השתבש. נסו שוב או תיצרו איתנו קשר')
        }
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
      placeholder="שם פרטי/משפחה (בעברית)"
      className="md:w-[100px] lg:w-[300px]"
      onChange={onInputChange}
      isLoading={isLoading}
      iconSrc={'/search.svg'}
    />
  );
}
