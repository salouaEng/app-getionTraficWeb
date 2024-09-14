import React from 'react';
import { Link } from 'react-router-dom';

const PageLinks = ({ pageName, link1, link2 }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/admin-dashboard">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">
            <Link className="font-medium text-primary" to="/user">
              {link1}
            </Link>
            </li>
          <li>/</li>
          <li className="font-medium text-primary"> {link2}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageLinks;
