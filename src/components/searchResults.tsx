'use client'
import PersonData from "../app/utils/types";
import {PersonCard} from "./person-card";

export function SearchResults({data}: {data: PersonData[]}) {
  return (
    <div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((personData, idx) =>
            <li key={idx} className="col-span-1 divide-y divide-gray-200 rounded-lg shadow">
              <PersonCard {...personData} />
            </li>
        )}
      </ul>
    </div>
  );
}