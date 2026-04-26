import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from '../components/nav/nav';

@Component({
  selector: 'app-layout-manager',
  imports: [RouterOutlet , Nav],
  templateUrl: './layout-manager.html',
  styleUrl: './layout-manager.css',
})
export class LayoutManager {

}