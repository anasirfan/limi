import React, { useState, useEffect } from 'react';
import UmamiAnalytics from './UmamiAnalytics';

const fetchJSON = (path) => fetch(path).then(res => res.json());

function InvestorTable({ data, type }) {
  return (
    <table className="w-full text-left bg-[#1e1e1e] rounded-lg overflow-hidden font-poppins">
      <thead>
        <tr className="bg-[#292929] text-emerald-400 font-semibold font-amenti">
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3">Slug</th>
          <th className="px-4 py-3">Content Type</th>
          <th className="px-4 py-3">Preview</th>
        </tr>
      </thead>
      <tbody>
        {data.map(inv => (
          <tr key={inv.slug} className="border-b border-[#292929] hover:bg-[#232323]">
            <td className="px-4 py-3 font-medium">{inv.name}</td>
            <td className="px-4 py-3">{inv.email}</td>
            <td className="px-4 py-3 text-mono text-emerald-300">
              <a href={`/investors/${inv.slug}`} className="underline text-emerald-400" target="_blank" rel="noopener noreferrer">
                {inv.slug}
              </a>
            </td>
            <td className="px-4 py-3">{type}</td>
            <td className="px-4 py-3">
              <a
                href={`/investors/${inv.slug}`}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-semibold font-amenti transition"
                target="_blank" rel="noopener noreferrer"
              >
                Preview Page
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function MarketingTab() {
  const [investors, setInvestors] = useState({ VCFirmData: [], AngelInvestorData: [] });
  const [active, setActive] = useState('vc');

  useEffect(() => {
    fetchJSON('/data/InvestorsData.json').then(setInvestors);
  }, []);

  return (
    <div className="font-poppins">
      <div className="flex mb-6 space-x-4">
        <button
          className={`px-6 py-2 rounded-t-lg font-amenti text-2xl ${active === 'vc' ? 'bg-emerald-600 text-white' : 'bg-[#232323] text-emerald-300'}`}
          onClick={() => setActive('vc')}
        >
          VC Firms
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-amenti text-2xl ${active === 'angel' ? 'bg-emerald-600 text-white' : 'bg-[#232323] text-emerald-300'}`}
          onClick={() => setActive('angel')}
        >
          Angel Investors
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-amenti text-2xl ${active === 'analytics' ? 'bg-emerald-600 text-white' : 'bg-[#232323] text-emerald-300'}`}
          onClick={() => setActive('analytics')}
        >
          📊 Analytics
        </button>
      </div>
      <div className="bg-[#232323] rounded-b-lg p-6 shadow-lg">
        {active === 'vc' ? (
          <InvestorTable data={investors.VCFirmData} type="VC Firm" />
        ) : active === 'angel' ? (
          <InvestorTable data={investors.AngelInvestorData} type="Angel Investor" />
        ) : (
          <UmamiAnalytics investors={investors} />
        )}
      </div>
    </div>
  );
}
