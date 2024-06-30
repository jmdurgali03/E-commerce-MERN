"use client";

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-center space-x-6">
          {categories.map((items) => (
            <Category
              key={items.label}
              label={items.label}
              icon={items.icon}
              selected={
                category === items.label ||
                (category === null && items.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
