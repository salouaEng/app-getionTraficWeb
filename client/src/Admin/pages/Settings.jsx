import React from 'react';
import PageLink from '../components/PageLinks/PageLink';
import DefaultLayout from '../layout/DefaultLayout';
import LanguageSettings from '../components/Settings/LanguageSettings';
import InfoSettings from '../components/Settings/InfoSettings';
import PhotoSettings from '../components/Settings/PhotoSettings';
import PasswordSettings from '../components/Settings/PasswordSettings';
import AccountsSettings from '../components/Settings/SocialAccounts/AccountsSettings';

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <PageLink pageName="Settings" />

        <div className="grid grid-cols-5 grid-rows-auto gap-8 xl:grid-cols-5 mb-8">

          <div className="col-span-5 xl:col-span-2 xl:row-span-4">
            <PhotoSettings />
          </div>

          <div className="col-span-5 xl:col-span-3 xl:row-span-7">
            <InfoSettings />
          </div>

          <div className="col-span-5 xl:col-span-2 xl:row-span-3">
            <LanguageSettings />
          </div>

          <div className="col-span-5 xl:col-span-3">
            <PasswordSettings />
          </div>

          <div className="col-span-5 xl:col-span-2">
            <AccountsSettings/>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
