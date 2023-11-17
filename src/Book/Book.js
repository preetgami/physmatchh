import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Book({ supabase, session }) {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    const { data, error } = await supabase
      .from("doctors")
      .select()
      .order("doctor_name", { ascending: false });
    if (data) {
      setDoctors(data);
    }
  };

  // get doctors only once when loading page
  useEffect(() => {
    getDoctors();
  }, []);

  const displayDoctors = () => {
    return doctors.map((doctor, id) => {
      return (
        <Link to={`/doctor_page/${doctor.id}`}>
          <li>{doctor.doctor_name}</li>
        </Link>
      );
    });
  };

  return <>{doctors ? <div>{displayDoctors()}</div> : <div></div>}</>;
}

export default Book;
