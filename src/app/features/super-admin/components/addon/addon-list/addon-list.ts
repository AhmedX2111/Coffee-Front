import { Component, inject, OnInit, signal } from '@angular/core';
import { AddonService } from '../../../services/addon-service';
import { AddonResponse } from '../../../models/addon-response';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addon-list',
  imports: [],
  templateUrl: './addon-list.html',
  styleUrl: './addon-list.css',
})
export class AddonList implements OnInit {
  addons=signal<AddonResponse[]>([])
    private toastr = inject(ToastrService);
    private router = inject(Router)
  
  constructor(private addonService:AddonService){}

  ngOnInit(): void {
    this.getAllAddons()
  }

  getAllAddons(){
    this.addonService.getAllAddons().subscribe((res)=>{
      this.addons.set(res.data);
    })
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

}
