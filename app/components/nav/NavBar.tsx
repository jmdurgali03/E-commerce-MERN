import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  console.log("user<<<", currentUser); // para ver en la terminal

  return (
    <div
      className="
            sticky
            top-0
            w-full
            bg-white
            z-30
            shadow-md
        "
    >
      <div className="py-2 border-b-[1px] border-gray-300">
        <Container>
          <div
            className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                    "
          >
            <div className="flex items-center gap-8">
              <Link href="/">
                <span className="text-xl font-semibold tracking-wide text-gray-800">
                  Harman/Kardon
                </span>
              </Link>
              <div className="hidden md:block">
                <SearchBar />
              </div>
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default NavBar;
