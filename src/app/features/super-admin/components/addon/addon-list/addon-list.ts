import { Component, inject, OnInit, signal } from '@angular/core';
import { AddonService } from '../../../services/AddonService/addon-service';
import { AddonResponse } from '../../../models/addon-response';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addon-list',
  imports: [RouterLink],
  templateUrl: './addon-list.html',
  styleUrl: './addon-list.css',
})
export class AddonList implements OnInit {
  addons = signal<AddonResponse[]>([]);
  private toastr = inject(ToastrService);
  private router = inject(Router);
searchValue = signal('');

  constructor(private addonService: AddonService) {}

  ngOnInit(): void {
    this.getAllAddons();
  }

  getAllAddons() {
    this.addonService.getAllAddons(this.searchValue()).subscribe((res) => {
      this.addons.set(res.data);
    });
  }

  deleteAddon(id: number) {
    this.addonService.deleteAddon(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.addons.update(list => list.filter(a => a.id !== id));
        } else {
          this.toastr.error(res.message);
        }
      },
      error: () => {
        this.toastr.error('Something went wrong');
      }
    });
  }

editAddon(addon: AddonResponse) {
  this.router.navigate(['/super-admin/addon', addon.id], {
    state: { addonData: addon }
  });
}

onSearch(event:Event){
  const value = (event.target as HTMLInputElement).value
  this.searchValue.set(value)
  this.getAllAddons()
}

}