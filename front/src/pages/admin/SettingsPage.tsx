import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, KeyRound } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [site, setSite] = useState({ title: 'Mathematics Research Center', logoUrl: '', defaultLanguage: 'az' });
  const [access, setAccess] = useState({ roles: { Admin: true, Editor: true, Researcher: true } });
  const [notify, setNotify] = useState({ emailOnEvents: true, emailOnPublications: true });
  const [backup, setBackup] = useState({ schedule: 'Weekly', destination: 'Cloud' });
  const [api, setApi] = useState({ citationApiKey: '', analyticsKey: '' });

  // TODO API: load & save settings to server

  return (
    <div className="rounded-[2rem] bg-white p-6 space-y-6">
      <h1 className="text-xl font-semibold">Settings</h1>

      <section className="rounded-xl border p-4">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2"><Settings className="w-4 h-4"/>General Settings</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs mb-1">Site Title</label>
            <input className="w-full border rounded-lg px-3 py-2" value={site.title} onChange={(e)=>setSite({...site,title:e.target.value})} />
          </div>
          <div>
            <label className="block text-xs mb-1">Default Language</label>
            <select className="w-full border rounded-lg px-3 py-2" value={site.defaultLanguage} onChange={(e)=>setSite({...site,defaultLanguage:e.target.value})}>
              <option value="az">Azerbaijani</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs mb-1">Logo URL</label>
            <input className="w-full border rounded-lg px-3 py-2" value={site.logoUrl} onChange={(e)=>setSite({...site,logoUrl:e.target.value})} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2"><Shield className="w-4 h-4"/>Access Control</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {Object.keys(access.roles).map((role) => (
            <label key={role} className="flex items-center gap-2 border rounded-lg p-2">
              <input type="checkbox" checked={(access.roles as any)[role]} onChange={() => setAccess(prev => ({ roles: { ...(prev.roles as any), [role]: !(prev.roles as any)[role] } }))} />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2"><Bell className="w-4 h-4"/>Notifications</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <label className="flex items-center gap-2 border rounded-lg p-2"><input type="checkbox" checked={notify.emailOnEvents} onChange={()=>setNotify(prev=>({...prev,emailOnEvents:!prev.emailOnEvents}))}/> Email for event updates</label>
          <label className="flex items-center gap-2 border rounded-lg p-2"><input type="checkbox" checked={notify.emailOnPublications} onChange={()=>setNotify(prev=>({...prev,emailOnPublications:!prev.emailOnPublications}))}/> Email for publication alerts</label>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2"><Database className="w-4 h-4"/>Data Backup</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs mb-1">Backup Schedule</label>
            <select className="w-full border rounded-lg px-3 py-2" value={backup.schedule} onChange={(e)=>setBackup({...backup,schedule:e.target.value})}>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1">Destination</label>
            <select className="w-full border rounded-lg px-3 py-2" value={backup.destination} onChange={(e)=>setBackup({...backup,destination:e.target.value})}>
              <option>Cloud</option>
              <option>Local</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2"><KeyRound className="w-4 h-4"/>API & Integrations</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1">Citation API Key</label>
            <input className="w-full border rounded-lg px-3 py-2" value={api.citationApiKey} onChange={(e)=>setApi({...api,citationApiKey:e.target.value})} placeholder="sk-..." />
          </div>
          <div>
            <label className="block text-xs mb-1">Analytics Key</label>
            <input className="w-full border rounded-lg px-3 py-2" value={api.analyticsKey} onChange={(e)=>setApi({...api,analyticsKey:e.target.value})} placeholder="UA-..." />
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded-lg border">Discard</button>
        <button className="px-4 py-2 rounded-lg bg-black text-white">Save Settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;
