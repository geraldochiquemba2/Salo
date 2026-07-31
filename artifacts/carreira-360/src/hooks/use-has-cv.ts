import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";

export function useHasCv() {
  const [hasCv, setHasCv] = useState<boolean | null>(null);
  const [cvSkills, setCvSkills] = useState<string[]>([]);

  useEffect(() => {
    apiFetch("/api/candidate/cv").then((cv) => {
      setHasCv(true);
      const skills = Array.isArray(cv.skills) ? cv.skills : (typeof cv.skills === "string" ? JSON.parse(cv.skills) : []);
      setCvSkills(skills);
    }).catch(() => {
      setHasCv(false);
    });
  }, []);

  return { hasCv, cvSkills };
}
