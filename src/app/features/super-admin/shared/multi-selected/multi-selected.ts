import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, input, model, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-selected',
  imports: [CommonModule, FormsModule],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelected,
      multi: true,
    },
  ],
  templateUrl: './multi-selected.html',
  styleUrl: './multi-selected.css',
})

export class MultiSelected implements ControlValueAccessor {
  // Inputs using the new Signal API
  options = input<{ label: string; value: any }[]>([]);
  placeholder = input<string>('Select options...');
  
  // Two-way binding using the new model() signal
  selectedValues = model<any[]>([]);

  // Internal State Signals
  isOpen = signal(false);
  searchTerm = signal('');

  // Computed Signal for filtering
  filteredOptions = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.options().filter(opt => 
      opt.label.toLowerCase().includes(term)
    );
  });

  // Boilerplate for ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  toggleDropdown() {
    this.isOpen.update(v => !v);
  }

  @HostListener('document:click')
  closeDropdown() {
    this.isOpen.set(false);
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  toggleOption(value: any) {
    const current = this.selectedValues();
    const index = current.indexOf(value);
    let newValue: any[];

    if (index > -1) {
      newValue = current.filter(v => v !== value);
    } else {
      newValue = [...current, value];
    }

    this.selectedValues.set(newValue);
    this.onChange(newValue);
  }

  removeItem(value: any, event: MouseEvent) {
    event.stopPropagation();
    this.toggleOption(value);
  }

  isSelected(value: any) {
    return this.selectedValues().includes(value);
  }

  getLabel(value: any) {
    return this.options().find(opt => opt.value === value)?.label || value;
  }

  // CVA Methods
  writeValue(value: any[]): void {
    if (value) this.selectedValues.set(value);
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}

