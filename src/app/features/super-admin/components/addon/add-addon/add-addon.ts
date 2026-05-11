import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddonService } from '../../../services/AddonService/addon-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-addon',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-addon.html',
  styleUrl: './add-addon.css',
})
export class AddAddon implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private addonService = inject(AddonService);
  private toastr = inject(ToastrService);

  isEditMode = false;
  addonId!: number;

  addonForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.addonId = +id;
      let addonData = null
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras?.state) {
        addonData = navigation.extras.state['addonData'];
      }
      if (!addonData && window.history.state) {
        addonData = window.history.state['addonData'];
      }
      if (addonData) {
        this.addonForm.patchValue({
          name: addonData.name,
          price: addonData.price,
        });
      } else {
        this.toastr.error('No addon data provided. Please edit from the list.');
        this.router.navigate(['/super-admin/addon-list']);
      }
    }
  }

  submitAddon(): void {
    if (this.addonForm.invalid) {
      this.toastr.error('Please fill all required fields correctly');
      return;
    }
    const formValue = this.addonForm.value;
    if (this.isEditMode) {
      this.addonService.updateAddon(this.addonId, formValue).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.router.navigate(['/super-admin/addon-list']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
        },
      });
    } else {
      this.addonService.addAddon(formValue).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res.message);
            this.addonForm.reset();
            this.goBack()
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          const msg = err.error?.message || 'Something went wrong';
          this.toastr.error(msg);
        },
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/super-admin/addon-list']);
  }
}