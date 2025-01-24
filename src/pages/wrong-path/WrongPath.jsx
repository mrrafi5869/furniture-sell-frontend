import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WrongPath = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-8xl font-bold text-lime-900">Oops!</h1>
        <h3 className="uppercase text-lg font-bold my-2">
          404 - Page not found
        </h3>
        <p className="lg:text-lg my-5">
          The page you are looking for might have been removed had <br /> its
          name changed or is temporarily unavailable
        </p>
        <Link to="/">
          <Button className="rounded-full">GO TO HOME PAGE</Button>
        </Link>
      </div>
    </div>
  );
};

export default WrongPath;
