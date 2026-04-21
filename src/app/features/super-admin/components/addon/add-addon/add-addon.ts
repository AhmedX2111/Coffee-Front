import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddonService } from '../../../services/addon-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-addon',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './add-addon.html',
  styleUrl: './add-addon.css',
})
export class AddAddon implements OnInit{
  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.isEditMode = true;
    this.addonId = +id;

    this.AddonService.getAddonById(this.addonId).subscribe(res => {
      if (res.success) {
        this.addonForm.patchValue({
          name: res.data.name,
          price: res.data.price
        });
      }
    });
  }
}
  private fb = inject(FormBuilder);
  private AddonService = inject(AddonService)
  private toastr = inject(ToastrService);
private route = inject(ActivatedRoute);
isEditMode = false;
addonId!: number;

addonForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required , Validators.min(0)]]
  });

submitAddon() {
  if (this.addonForm.valid) {
    this.AddonService.addAddon(this.addonForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.addonForm.reset();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error?.message) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error("Something went wrong");
        }
      }
    });
  }else{
     this.toastr.error("Data Invalid");
  }
}
}
