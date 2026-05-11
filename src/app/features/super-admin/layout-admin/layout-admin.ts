import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aside } from '../components/aside/aside';
import { Nav } from '../components/nav/nav';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet , Aside , Nav],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {

}
