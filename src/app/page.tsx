"use client";

import { Advocate } from "@/db/seed/advocates";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { z } from "zod";

//temp placement
const Res = z.object({
  data: Advocate.array(),
});

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        const parsed = Res.safeParse(jsonResponse);

        if (parsed.success) {
          setAdvocates(jsonResponse.data);
        } else {
          console.error(
            `Unexpected response data: ${JSON.stringify(parsed.error.issues)}`
          );
        }
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAdvocates = useMemo(() => {
    const termNormalized = searchTerm.trim().toLowerCase();
    if (termNormalized.length === 0) {
      return advocates;
    }

    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(termNormalized) ||
        advocate.lastName.toLowerCase().includes(termNormalized) ||
        advocate.city.toLowerCase().includes(termNormalized) ||
        advocate.degree.toLowerCase().includes(termNormalized) ||
        advocate.specialties.some((s) => s.toLowerCase() === termNormalized) ||
        `${advocate.yearsOfExperience}`.includes(termNormalized)
      );
    });
  }, [advocates, searchTerm]);

  const reset = () => {
    setSearchTerm("");
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={onChange}
        />
        <button
          onClick={reset}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium active:bg-gray-200 rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table className="w-full text-sm text-left rtl:text-right text-gray-600 ">
        <thead className="text-xs text-gray-600 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">City</th>
            <th className="px-6 py-3">Degree</th>
            <th className="px-6 py-3">Specialties</th>
            <th className="px-6 py-3">Years of Experience</th>
            <th className="px-6 py-3">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr className="bg-white border-b" key={advocate.id}>
                <td className="px-6 py-4">{advocate.firstName}</td>
                <td className="px-6 py-4">{advocate.lastName}</td>
                <td className="px-6 py-4">{advocate.city}</td>
                <td className="px-6 py-4">{advocate.degree}</td>
                <td className="px-6 py-4">
                  {advocate.specialties.map((s) => (
                    //Assuming no duplicates
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td className="px-6 py-4">{advocate.yearsOfExperience}</td>
                <td className="px-6 py-4">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
