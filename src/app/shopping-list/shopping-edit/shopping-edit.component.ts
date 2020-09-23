import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @Output() ingredientCreated = new EventEmitter<Ingredient>();
  // @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  // constructor() { }

  // ngOnInit() {
  // }
  // onAddIngredient(nameInput: HTMLInputElement) {
  //   this.ingredientCreated.emit({
  //     name: nameInput.value,
  //     amount: this.amountInput.nativeElement.value
  //   });
  // }
  // @Output() ingredientCreated = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }
  onAddIngredient() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingService.ingredientCreated.next(newIngredient);
  }
}
