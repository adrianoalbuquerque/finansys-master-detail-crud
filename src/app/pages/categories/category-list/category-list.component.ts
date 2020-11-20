import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list';
import { Category } from '../service/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(private categoryService: CategoryService) {
    super(categoryService);
  }
}
