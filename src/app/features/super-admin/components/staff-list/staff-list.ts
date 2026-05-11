import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { StaffResponse } from '../../models/staff-response';
import { StaffService } from '../../services/StaffService/staff-service';
import { HeadStaff } from '../head-staff/head-staff';

@Component({
  selector: 'app-staff-list',
  imports: [CommonModule , HeadStaff],
  templateUrl: './staff-list.html',
  styleUrl: './staff-list.css',
})
export class StaffList implements OnInit {

  firstSecondLetter:any
  staffMembers = signal<StaffResponse[]>([])
  staffList=signal('')
  constructor(private staffService:StaffService){}

  ngOnInit(): void {
    this.getAllStaff()
  }



getAllStaff(search: string = '') {
  this.staffService.getAllStaff(search).subscribe((res: any) => {

    const dataWithInitials = res.data.map((staff: StaffResponse) => {

      const names = staff.userName.split(' ');

      const firstLetter = names[0]?.charAt(0) || '';
      const secondLetter = names[1]?.charAt(0) || '';

      return {
        ...staff,
        initials: (firstLetter + secondLetter).toUpperCase()
      };
    });

    this.staffMembers.set(dataWithInitials);
  });
}
}
