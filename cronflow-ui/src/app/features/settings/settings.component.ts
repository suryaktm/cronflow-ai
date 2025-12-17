import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="space-y-6 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
        Platform Settings
      </h2>

      <!-- General Settings -->
      <div class="card p-6 space-y-4">
        <h3 class="text-lg font-medium text-slate-200 border-b border-slate-700 pb-2">General Configuration</h3>
        
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm text-slate-400 mb-1">Project Name</label>
                <input type="text" value="Default Project" class="input-field w-full" disabled>
            </div>
            <div>
                <label class="block text-sm text-slate-400 mb-1">Time Zone</label>
                <select class="input-field w-full">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>IST (Indian Standard Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                </select>
            </div>
        </div>
      </div>

      <!-- CLI Integration -->
      <div class="card p-6 space-y-4">
         <h3 class="text-lg font-medium text-slate-200 border-b border-slate-700 pb-2">CLI / API Integration</h3>
         <p class="text-sm text-slate-400">Use these credentials to manage jobs via scripts or external tools (like Control-M replacement).</p>
         
         <div class="bg-slate-950 p-4 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
            # Create a job via API<br>
            curl -X POST http://cronflow-server/api/jobs \<br>
             -H "Authorization: Bearer [YOUR_TOKEN]" \<br>
             -d '&#123;"name": "My_Script_Job", ...&#125;'
         </div>
      </div>
    </div>
  `
})
export class SettingsComponent { }
