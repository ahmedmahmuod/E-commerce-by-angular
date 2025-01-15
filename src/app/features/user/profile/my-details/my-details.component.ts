import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-details.component.html',
  styleUrl: './my-details.component.css',
})
export class MyDetailsComponent {}
