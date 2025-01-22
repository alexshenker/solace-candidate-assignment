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
        <button onClick={reset}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    //Assuming no duplicates
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
