'use client';


import { useState } from 'react';


const SettingsSection = ({ title, children }) => (
 <div className="bg-white shadow-sm rounded-lg border border-gray-200">
   <div className="p-6">
     <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
     <div className="space-y-4">{children}</div>
   </div>
 </div>
);


const Toggle = ({ label, enabled, setEnabled }) => (
 <div className="flex items-center justify-between">
   <span className="text-gray-700">{label}</span>
   <button
     onClick={() => setEnabled(!enabled)}
     className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
     <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
   </button>
 </div>
);


export default function MentorSettingsPage() {
 const [emailNotifications, setEmailNotifications] = useState(true);
 const [pushNotifications, setPushNotifications] = useState(false);


 return (
   <div className="min-h-screen bg-gray-50">
     <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       <header className="mb-8">
         <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
         <p className="text-gray-600 mt-1">Manage your account and notification preferences.</p>
       </header>


       <div className="space-y-8">
         <SettingsSection title="Account">
           <div>
             <label className="block text-sm font-medium text-gray-700">Email</label>
             <input type="email" value="mentor@example.com" disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100" />
           </div>
           <button className="text-blue-600 hover:underline">Change Password</button>
         </SettingsSection>


         <SettingsSection title="Notifications">
           <Toggle label="Email Notifications" enabled={emailNotifications} setEnabled={setEmailNotifications} />
           <Toggle label="Push Notifications" enabled={pushNotifications} setEnabled={setPushNotifications} />
         </SettingsSection>


         <SettingsSection title="Connected Apps">
           <div className="flex items-center justify-between p-4 border rounded-lg">
             <p>GitHub</p>
             <button className="text-red-600 hover:underline">Disconnect</button>
           </div>
         </SettingsSection>
       </div>
     </div>
   </div>
 );
}



