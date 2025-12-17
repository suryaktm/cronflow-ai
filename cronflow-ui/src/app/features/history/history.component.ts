import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Execution History
        </h2>
      </div>

      <!-- Filters Placeholder -->
      <div class="card p-4 flex gap-4">
         <input type="text" placeholder="Search by Job Name..." class="input-field w-64">
         <div class="text-slate-500 text-sm flex items-center">
            <span class="mr-2">Status:</span>
            <span class="px-2 py-1 bg-slate-800 rounded border border-slate-700">All</span>
         </div>
      </div>

      <!-- Empty State -->
      <div class="card p-12 text-center text-slate-400">
        <div class="text-6xl mb-4">📜</div>
        <h3 class="text-xl font-medium text-slate-200 mb-2">No History Records</h3>
        <p>Execution history from the scheduling engine (Phase 3) will appear here.</p>
      </div>
    </div>
  `
})
export class HistoryComponent { }
