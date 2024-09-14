import React, { useState, useEffect } from 'react';

const Map = () => {

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pt-5 pb-1 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Map</p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Map;
