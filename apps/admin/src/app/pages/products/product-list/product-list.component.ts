import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService, Product } from '@blubits/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit,OnDestroy {
  products: Product[] = [];
  isLoading=false
  endSub$:Subject<boolean> = new Subject()
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  ngOnDestroy(){
    this.endSub$.next()
    this.endSub$.complete()
  }
  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `Product Deleted successfully :D`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Product failed to Delete!`,
            });
          }
        );
      },
      reject: () => {},
    });
  }
  updateProduct(productId: string) {
      this.router.navigateByUrl(`products/form/${productId}`)
  }

  private _getProducts() {
    this.isLoading=true
    this.productsService.getProducts().pipe(takeUntil(this.endSub$)).subscribe((res) => {
      this.products = res.data;
      this.isLoading=false
      // for( let i =0; i<this.products.length; i++){
      //   console.log(this.products[i].image)
      // }
    });
  }
}
