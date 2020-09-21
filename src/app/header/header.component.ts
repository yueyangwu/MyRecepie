import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() output = new EventEmitter<string>();
    clickRecipes() {
        this.output.emit("Recipes Clicked");
    }
    clickShoppingList() {
        this.output.emit("Shopping List Clicked");
    }
}