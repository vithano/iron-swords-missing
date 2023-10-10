'use client'
import {Input} from "@/components/ui/input";
import {fetchData} from "@/actions";
import PersonData from "../app/utils/types";
import { useRef } from "react";
import debounce  from "lodash.debounce";
import { useCallback } from "react";
import { useState,useEffect  } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";


const MIN_QUERY_LENGTH = 3;
export function Search({setData, setMessage}: {setData: (data: PersonData[]) => void, setMessage: (msg: string) => void}) {
  
  const searchParams = useSearchParams();

  const inputValueRef = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("")
  const [isResults, setIsResults] = useState(false)

  useEffect(() => {
    const name = searchParams.get("name")
    if(name && name.length >= MIN_QUERY_LENGTH)
    {

    const event = { target: { value: name } } as React.ChangeEvent<HTMLInputElement>;
  onInputChange(event)
    }
  }, [searchParams])

  const onCopy = () => {
    navigator.clipboard.writeText(`https://ironswords.org.il/?name=${searchName}`)
 
  }
  const debouncedSearch = useCallback(
    debounce(async () => {
      const name = inputValueRef.current?.trim();
      if (name && name.length >= MIN_QUERY_LENGTH) {
        setIsLoading(true);
        try {
          const result = await fetchData({name});
          setData(result);
          setIsResults(result.length > 0)
          setSearchName(name)
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
      setMessage('')
      debouncedSearch.cancel();  // Cancel the debounce
    } else {
      debouncedSearch();
    }
  }

  return (
    <>
    <Input
      dir="rtl"
      type="search"
      placeholder="שם פרטי/משפחה (בעברית)"
      className="md:w-[100px] lg:w-[300px]"
      defaultValue={searchName}
      onChange={onInputChange}
      isLoading={isLoading}
      iconSrc={"/search.svg"}
    />
    {isResults &&
    <Button className="f" onClick={() => onCopy()}>העתק את התוצאות</Button>
    
  }
    </>


  );
};
