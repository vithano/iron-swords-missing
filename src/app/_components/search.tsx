import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div>
      <Input
        dir='rtl'
        type="search"
        placeholder="פרטים מזהים"
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}