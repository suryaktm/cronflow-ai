import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [
    { text: 'Hello! I am CronBot. How can I help you automate today?', sender: 'bot' }
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    // User Message
    this.messages.push({ text: this.userInput, sender: 'user' });

    // Dummy Response Logic
    const response = this.getDummyResponse(this.userInput);
    setTimeout(() => {
      this.messages.push({ text: response, sender: 'bot' });
    }, 1000);

    this.userInput = '';
  }

  getDummyResponse(input: string): string {
    const lower = input.toLowerCase();
    if (lower.includes('job') || lower.includes('create')) return "To create a job, click the 'New Job' button on the dashboard.";
    if (lower.includes('error') || lower.includes('fail')) return "If a job fails, check the logs in the History tab.";
    if (lower.includes('schedule')) return "You can schedule jobs using Cron expressions or simple intervals.";
    return "I'm just a dummy bot for now! Integration with Gemini AI coming in Phase 6.";
  }
}
