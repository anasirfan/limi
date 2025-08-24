'use client';
import { useEffect, useState } from 'react';
import ForcefulThemeToggle, { MinimalThemeToggle, ThemeStatus } from '../ui/ForcefulThemeToggle';
import { getCurrentTheme, getThemeColors } from '../../utils/forcefulThemeSwitcher';

/**
 * Demo page showcasing the forceful theme switcher capabilities
 * This demonstrates how it overrides ALL color values including arbitrary Tailwind classes
 */
export default function ThemeSwitcherDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading theme demo...</div>;
  }

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Header with theme controls */}
      <header className="flex justify-between items-center p-6 rounded-lg bg-[#f3ebe2] border-2 border-[#54bb74]">
        <div>
          <h1 className="text-3xl font-bold text-[#2b2d2f] mb-2">
            LIMI Forceful Theme Switcher Demo
          </h1>
          <p className="text-[#54bb74]">
            Watch how ALL colors change, including arbitrary Tailwind classes!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ForcefulThemeToggle size="lg" />
          <MinimalThemeToggle />
        </div>
      </header>

      {/* Color demonstration grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Arbitrary Tailwind Colors Card */}
        <div className="p-6 rounded-lg bg-[#ffffff] border border-[#e9eaec] shadow-lg">
          <h2 className="text-xl font-semibold text-[#2b2d2f] mb-4">
            Arbitrary Tailwind Classes
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-[#f3ebe2] text-[#54bb74] rounded">
              bg-[#f3ebe2] text-[#54bb74]
            </div>
            <div className="p-3 bg-[#93cfa2] text-[#ffffff] rounded">
              bg-[#93cfa2] text-[#ffffff]
            </div>
            <div className="p-3 bg-[#54bb74] text-[#f2f0e6] rounded">
              bg-[#54bb74] text-[#f2f0e6]
            </div>
          </div>
        </div>

        {/* Standard HTML Elements */}
        <div className="p-6 rounded-lg bg-[#f2f0e6] border border-[#54bb74] shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Standard HTML Elements</h2>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">This is an H3 heading</h3>
            <p>This is a paragraph that should change color with theme.</p>
            <button className="px-4 py-2 rounded bg-[#54bb74] text-white hover:bg-[#50c878]">
              Button with arbitrary colors
            </button>
            <a href="#" className="text-[#2e7f53] hover:text-[#54bb74] underline">
              This is a link
            </a>
          </div>
        </div>

        {/* Form Elements */}
        <div className="p-6 rounded-lg bg-[#ffffff] border border-[#93cfa2] shadow-lg">
          <h2 className="text-xl font-semibold text-[#2b2d2f] mb-4">Form Elements</h2>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Input field"
              className="w-full p-2 border border-[#e9eaec] rounded bg-[#f3ebe2] text-[#2b2d2f]"
            />
            <textarea 
              placeholder="Textarea"
              className="w-full p-2 border border-[#54bb74] rounded bg-[#ffffff] text-[#2b2d2f]"
              rows={3}
            />
            <select className="w-full p-2 border border-[#93cfa2] rounded bg-[#f2f0e6] text-[#2b2d2f]">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </div>

        {/* Interactive States */}
        <div className="p-6 rounded-lg bg-[#f3ebe2] border border-[#2b2d2f] shadow-lg">
          <h2 className="text-xl font-semibold text-[#54bb74] mb-4">Interactive States</h2>
          <div className="space-y-3">
            <button className="w-full p-3 rounded bg-[#54bb74] text-[#ffffff] hover:bg-[#50c878] focus:bg-[#2e7f53] transition-colors">
              Hover & Focus States
            </button>
            <div className="p-3 border-2 border-[#93cfa2] rounded hover:border-[#54bb74] hover:bg-[#f2f0e6] cursor-pointer transition-all">
              Hover to change border and background
            </div>
            <a href="#" className="block p-3 text-[#2e7f53] hover:text-[#ffffff] hover:bg-[#54bb74] rounded transition-all">
              Link with hover background
            </a>
          </div>
        </div>

        {/* Mixed Color Combinations */}
        <div className="p-6 rounded-lg bg-[#93cfa2] border-2 border-[#ffffff] shadow-lg">
          <h2 className="text-xl font-semibold text-[#2b2d2f] mb-4">Mixed Combinations</h2>
          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-[#ffffff] text-[#54bb74] rounded text-sm">Tag 1</span>
              <span className="px-2 py-1 bg-[#f3ebe2] text-[#2b2d2f] rounded text-sm">Tag 2</span>
              <span className="px-2 py-1 bg-[#54bb74] text-[#ffffff] rounded text-sm">Tag 3</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-[#f2f0e6] rounded"></div>
              <div className="h-8 bg-[#e9eaec] rounded"></div>
              <div className="h-8 bg-[#ffffff] rounded"></div>
            </div>
          </div>
        </div>

        {/* Theme Status */}
        <div className="md:col-span-2 lg:col-span-1">
          <ThemeStatus />
        </div>
      </section>

      {/* Instructions */}
      <section className="p-6 rounded-lg bg-[#f2f0e6] border-l-4 border-[#54bb74]">
        <h2 className="text-xl font-semibold text-[#2b2d2f] mb-4">
          🎨 How the Forceful Theme Switcher Works
        </h2>
        <div className="space-y-3 text-[#2b2d2f]">
          <p>
            <strong>1. Arbitrary Color Override:</strong> All arbitrary Tailwind classes like 
            <code className="bg-[#e9eaec] px-1 rounded">text-[#54bb74]</code> and 
            <code className="bg-[#e9eaec] px-1 rounded">bg-[#f3ebe2]</code> are automatically converted.
          </p>
          <p>
            <strong>2. CSS Variable Updates:</strong> Root variables like 
            <code className="bg-[#e9eaec] px-1 rounded">--emerald</code> and 
            <code className="bg-[#e9eaec] px-1 rounded">--charleston-green</code> are dynamically updated.
          </p>
          <p>
            <strong>3. Component Targeting:</strong> All major HTML elements (h1-h6, p, button, a, input, etc.) 
            get forceful color overrides with <code className="bg-[#e9eaec] px-1 rounded">!important</code>.
          </p>
          <p>
            <strong>4. State Management:</strong> Hover, focus, and active states are all handled automatically.
          </p>
          <p>
            <strong>5. Cross-tab Sync:</strong> Theme changes sync across browser tabs using localStorage.
          </p>
        </div>
      </section>

      {/* Color Mapping Reference */}
      <section className="p-6 rounded-lg bg-[#ffffff] border border-[#93cfa2]">
        <h2 className="text-xl font-semibold text-[#2b2d2f] mb-4">Color Mapping Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-[#54bb74] mb-2">Light → Dark</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#f3ebe2] border rounded"></div>
                <span>#f3ebe2 → #2b2d2f</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#93cfa2] border rounded"></div>
                <span>#93cfa2 → #3b7f63</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#54bb74] border rounded"></div>
                <span>#54bb74 → #2e7f53</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#ffffff] border rounded"></div>
                <span>#ffffff → #000000</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[#54bb74] mb-2">Dark → Light</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#2b2d2f] border rounded"></div>
                <span>#2b2d2f → #f2f0e6</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#1e2022] border rounded"></div>
                <span>#1e2022 → #e9eaec</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#3a3d42] border rounded"></div>
                <span>#3a3d42 → #e5e5e5</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
