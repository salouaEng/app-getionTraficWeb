import React from 'react';
import clsx from 'clsx';

const steps = [
  {
    step: 1,
    title: 'Links',
    description: 'Add your links',
  },
  {
    step: 2,
    title: 'Filtration',
    description: 'Configure your filters',
  },
  {
    step: 3,
    title: 'Status',
    description: 'Configure your flow status',
  },
];

const Multistepper = ({ currentStep, handleNextStep, stepsCompleted }) => {
  return (
    <aside className="bg-blue-200 min-h-[130px] bg-cover bg-no-repeat lg:rounded-lg lg:bg-sidebar-image-desktop ">
      <nav>
        <ol className="flex justify-center pt-10 gap-8 lg:flex-col lg:w-80 lg:mx-autor">
          {steps.map((step) => (
            <li className="flex gap-4 lg:ml-6 items-center" key={step.step}>
              <button
                className={clsx(
                  'px-3.5 py-3 md:px-4 border inline-flex border-gray-500 rounded-full leading-none font-medium w-auto h-min lg:h-10 lg:w-10 transition-colors duration-[400ms]',
                  currentStep === step.step
                    ? 'bg-blue-600 border-blue-600 text-white font-bold'
                    : 'text-gray-500 '
                )}
                onClick={() => handleNextStep(step.step)}
                disabled={!stepsCompleted[step.step]}
              >
                {step.step}
              </button>
              <span className="hidden lg:inline">
                <p className={clsx(
                  'font-bold text-xl',
                  currentStep === step.step ?
                    'text-blue-600' : 'text-black'
                )}>{step.title}</p>
                <span className="font-normal">{step.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
};


export default Multistepper;
