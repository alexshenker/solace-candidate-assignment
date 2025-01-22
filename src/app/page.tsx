"use client";

import { Advocate } from "@/db/seed/advocates";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";

//temp placement
const Res = z.object({
  data: Advocate.array(),
});

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        const parsed = Res.safeParse(jsonResponse);

        if (parsed.success) {
          setAdvocates(jsonResponse.data);
          setFilteredAdvocates(jsonResponse.data);
        } else {
          console.error(
            `Unexpected response data: ${JSON.stringify(parsed.error.issues)}`
          );
        }
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      const termNormalized = searchTerm.trim().toLowerCase();

      return (
        advocate.firstName.toLowerCase().includes(termNormalized) ||
        advocate.lastName.toLowerCase().includes(termNormalized) ||
        advocate.city.toLowerCase().includes(termNormalized) ||
        advocate.degree.toLowerCase().includes(termNormalized) ||
        advocate.specialties.some((s) => s.toLowerCase() === termNormalized) ||
        `${advocate.yearsOfExperience}`.includes(termNormalized)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
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
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
          </tr>
          <tr>
            <th>Last Name</th>
          </tr>
          <tr>
            <th>City</th>
          </tr>
          <tr>
            <th>Degree</th>
          </tr>
          <tr>
            <th>Specialties</th>
          </tr>
          <tr>
            <th>Years of Experience</th>
          </tr>
          <tr>
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
