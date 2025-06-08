import Page from "../animation/Page.tsx";
import type { TabData } from "../types/types.ts";
import { Key, Shield, User } from "lucide-react";
import Tab from "../components/tab/Tab.tsx";
import { useState } from "react";
import ProfileSettingsSection from "../components/section/ProfileSettingsSection.tsx";
import PrivacySettingsSection from "../components/section/PrivacySettingsSection.tsx";
import AccountSettingsSection from "../components/section/AccountSettingsSection.tsx";

const tabs: TabData[] = [
  {
    id: "profile",
    label: "Profile",
    icon: <User className={"size-5"} />,
  },
  {
    id: "account",
    label: "Account",
    icon: <Key className={"size-5"} />,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: <Shield className={"size-5"} />,
  },
];

const Settings = () => {
  const [activeTabId, setActiveTabId] = useState<string>("profile");

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="w-full max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className={"lg:col-span-1 space-y-2 w-full"}>
            {tabs.map((tab) => (
              <Tab
                data={tab}
                onClick={(id) => setActiveTabId(id)}
                activeTabId={activeTabId}
                className={"w-full"}
              />
            ))}
          </div>
          <div className={"lg:col-span-3"}>
            <div
              className={
                "rounded-lg p-8 border-2 bg-black-200 border-gray-600 "
              }
            >
              <div className={"mb-6"}>
                <h2 className={"text-2xl font-bold text-white-100"}>
                  {tabs.find((tab) => tab.id === activeTabId)?.label}
                </h2>
                <p className={"text-gray-400"}>
                  Manage your {activeTabId} settings and preferences
                </p>
              </div>
              {activeTabId === "profile" && <ProfileSettingsSection />}
              {activeTabId === "account" && <AccountSettingsSection />}
              {activeTabId === "privacy" && <PrivacySettingsSection />}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Settings;
