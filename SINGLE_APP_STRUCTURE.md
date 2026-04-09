# Coffee Shop - Single Angular App Structure (Standalone Components)

```
Coffee-Front/
│
├── src/
│   ├── app/
│   │   ├── core/                      # Core services, guards, interceptors (singleton)
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── notification.service.ts
│   │   │   │   └── logger.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── customer.guard.ts
│   │   │   │   ├── branch-manager.guard.ts
│   │   │   │   └── admin.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   └── models/
│   │   │       ├── user.model.ts
│   │   │       ├── auth.model.ts
│   │   │       ├── order.model.ts
│   │   │       ├── product.model.ts
│   │   │       ├── category.model.ts
│   │   │       ├── branch.model.ts
│   │   │       └── response.model.ts
│   │   │
│   │   ├── shared/                    # Shared components, pipes, directives
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   │   ├── navbar.component.ts
│   │   │   │   │   ├── navbar.component.html
│   │   │   │   │   └── navbar.component.css
│   │   │   │   ├── sidebar/
│   │   │   │   │   ├── sidebar.component.ts
│   │   │   │   │   ├── sidebar.component.html
│   │   │   │   │   └── sidebar.component.css
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.ts
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   └── footer.component.css
│   │   │   │   ├── modal/
│   │   │   │   │   ├── modal.component.ts
│   │   │   │   │   ├── modal.component.html
│   │   │   │   │   └── modal.component.css
│   │   │   │   ├── toast-notification/
│   │   │   │   │   ├── toast-notification.component.ts
│   │   │   │   │   ├── toast-notification.component.html
│   │   │   │   │   └── toast-notification.component.css
│   │   │   │   ├── loader/
│   │   │   │   │   ├── loader.component.ts
│   │   │   │   │   ├── loader.component.html
│   │   │   │   │   └── loader.component.css
│   │   │   │   ├── confirmation-dialog/
│   │   │   │   │   ├── confirmation-dialog.component.ts
│   │   │   │   │   ├── confirmation-dialog.component.html
│   │   │   │   │   └── confirmation-dialog.component.css
│   │   │   │   └── button/
│   │   │   │       ├── button.component.ts
│   │   │   │       ├── button.component.html
│   │   │   │       └── button.component.css
│   │   │   ├── pipes/
│   │   │   │   ├── price.pipe.ts
│   │   │   │   ├── truncate.pipe.ts
│   │   │   │   ├── date-format.pipe.ts
│   │   │   │   └── order-status.pipe.ts
│   │   │   ├── directives/
│   │   │   │   ├── highlight.directive.ts
│   │   │   │   └── trim-input.directive.ts
│   │   │   └── constants/
│   │   │       └── app.constants.ts
│   │   │
│   │   ├── features/
│   │   │   ├── auth/                  # Authentication (shared across all roles)
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── login.component.ts
│   │   │   │   │   │   ├── login.component.html
│   │   │   │   │   │   └── login.component.css
│   │   │   │   │   ├── register/
│   │   │   │   │   │   ├── register.component.ts
│   │   │   │   │   │   ├── register.component.html
│   │   │   │   │   │   └── register.component.css
│   │   │   │   │   ├── forgot-password/
│   │   │   │   │   │   ├── forgot-password.component.ts
│   │   │   │   │   │   ├── forgot-password.component.html
│   │   │   │   │   │   └── forgot-password.component.css
│   │   │   │   │   └── reset-password/
│   │   │   │   │       ├── reset-password.component.ts
│   │   │   │   │       ├── reset-password.component.html
│   │   │   │   │       └── reset-password.component.css
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.service.ts
│   │   │   │   └── models/
│   │   │   │       └── auth.model.ts
│   │   │   │
│   │   │   ├── customer/              # Customer Feature Module
│   │   │   │   ├── components/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   │   └── dashboard.component.css
│   │   │   │   │   ├── landing/
│   │   │   │   │   │   ├── landing.component.ts
│   │   │   │   │   │   ├── landing.component.html
│   │   │   │   │   │   └── landing.component.css
│   │   │   │   │   ├── featured-products/
│   │   │   │   │   │   ├── featured-products.component.ts
│   │   │   │   │   │   ├── featured-products.component.html
│   │   │   │   │   │   └── featured-products.component.css
│   │   │   │   │   ├── product-list/
│   │   │   │   │   │   ├── product-list.component.ts
│   │   │   │   │   │   ├── product-list.component.html
│   │   │   │   │   │   └── product-list.component.css
│   │   │   │   │   ├── product-detail/
│   │   │   │   │   │   ├── product-detail.component.ts
│   │   │   │   │   │   ├── product-detail.component.html
│   │   │   │   │   │   └── product-detail.component.css
│   │   │   │   │   ├── product-card/
│   │   │   │   │   │   ├── product-card.component.ts
│   │   │   │   │   │   ├── product-card.component.html
│   │   │   │   │   │   └── product-card.component.css
│   │   │   │   │   ├── customization/
│   │   │   │   │   │   ├── customization.component.ts
│   │   │   │   │   │   ├── customization.component.html
│   │   │   │   │   │   └── customization.component.css
│   │   │   │   │   ├── cart/
│   │   │   │   │   │   ├── cart-view.component.ts
│   │   │   │   │   │   ├── cart-view.component.html
│   │   │   │   │   │   └── cart-view.component.css
│   │   │   │   │   ├── cart-item/
│   │   │   │   │   │   ├── cart-item.component.ts
│   │   │   │   │   │   ├── cart-item.component.html
│   │   │   │   │   │   └── cart-item.component.css
│   │   │   │   │   ├── cart-summary/
│   │   │   │   │   │   ├── cart-summary.component.ts
│   │   │   │   │   │   ├── cart-summary.component.html
│   │   │   │   │   │   └── cart-summary.component.css
│   │   │   │   │   ├── checkout/
│   │   │   │   │   │   ├── checkout.component.ts
│   │   │   │   │   │   ├── checkout.component.html
│   │   │   │   │   │   └── checkout.component.css
│   │   │   │   │   ├── branch-selection/
│   │   │   │   │   │   ├── branch-selection.component.ts
│   │   │   │   │   │   ├── branch-selection.component.html
│   │   │   │   │   │   └── branch-selection.component.css
│   │   │   │   │   ├── order-summary/
│   │   │   │   │   │   ├── order-summary.component.ts
│   │   │   │   │   │   ├── order-summary.component.html
│   │   │   │   │   │   └── order-summary.component.css
│   │   │   │   │   ├── special-notes/
│   │   │   │   │   │   ├── special-notes.component.ts
│   │   │   │   │   │   ├── special-notes.component.html
│   │   │   │   │   │   └── special-notes.component.css
│   │   │   │   │   ├── order-history/
│   │   │   │   │   │   ├── order-history.component.ts
│   │   │   │   │   │   ├── order-history.component.html
│   │   │   │   │   │   └── order-history.component.css
│   │   │   │   │   ├── order-detail/
│   │   │   │   │   │   ├── order-detail.component.ts
│   │   │   │   │   │   ├── order-detail.component.html
│   │   │   │   │   │   └── order-detail.component.css
│   │   │   │   │   ├── order-item/
│   │   │   │   │   │   ├── order-item.component.ts
│   │   │   │   │   │   ├── order-item.component.html
│   │   │   │   │   │   └── order-item.component.css
│   │   │   │   │   ├── profile/
│   │   │   │   │   │   ├── profile.component.ts
│   │   │   │   │   │   ├── profile.component.html
│   │   │   │   │   │   └── profile.component.css
│   │   │   │   │   └── profile-edit/
│   │   │   │   │       ├── profile-edit.component.ts
│   │   │   │   │       ├── profile-edit.component.html
│   │   │   │   │       └── profile-edit.component.css
│   │   │   │   ├── services/
│   │   │   │   │   ├── product.service.ts
│   │   │   │   │   ├── cart.service.ts
│   │   │   │   │   ├── order.service.ts
│   │   │   │   │   └── branch.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── cart-item.model.ts
│   │   │   │   │   ├── customization.model.ts
│   │   │   │   │   └── cart-state.model.ts
│   │   │   │   └── customer.routes.ts
│   │   │   │
│   │   │   ├── branch-manager/        # Branch Manager Feature Module
│   │   │   │   ├── components/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   │   └── dashboard.component.css
│   │   │   │   │   ├── active-orders/
│   │   │   │   │   │   ├── active-orders.component.ts
│   │   │   │   │   │   ├── active-orders.component.html
│   │   │   │   │   │   └── active-orders.component.css
│   │   │   │   │   ├── order-card/
│   │   │   │   │   │   ├── order-card.component.ts
│   │   │   │   │   │   ├── order-card.component.html
│   │   │   │   │   │   └── order-card.component.css
│   │   │   │   │   ├── order-details-modal/
│   │   │   │   │   │   ├── order-details-modal.component.ts
│   │   │   │   │   │   ├── order-details-modal.component.html
│   │   │   │   │   │   └── order-details-modal.component.css
│   │   │   │   │   ├── order-workflow/
│   │   │   │   │   │   ├── order-workflow.component.ts
│   │   │   │   │   │   ├── order-workflow.component.html
│   │   │   │   │   │   └── order-workflow.component.css
│   │   │   │   │   ├── completed-orders/
│   │   │   │   │   │   ├── completed-orders.component.ts
│   │   │   │   │   │   ├── completed-orders.component.html
│   │   │   │   │   │   └── completed-orders.component.css
│   │   │   │   │   ├── branch-profile/
│   │   │   │   │   │   ├── branch-profile.component.ts
│   │   │   │   │   │   ├── branch-profile.component.html
│   │   │   │   │   │   └── branch-profile.component.css
│   │   │   │   │   └── manager-profile/
│   │   │   │   │       ├── manager-profile.component.ts
│   │   │   │   │       ├── manager-profile.component.html
│   │   │   │   │       └── manager-profile.component.css
│   │   │   │   ├── services/
│   │   │   │   │   ├── order.service.ts
│   │   │   │   │   └── branch.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── order-status.model.ts
│   │   │   │   │   └── dashboard-state.model.ts
│   │   │   │   └── branch-manager.routes.ts
│   │   │   │
│   │   │   └── super-admin/           # Super Admin Feature Module
│   │   │       ├── components/
│   │   │       │   ├── dashboard/
│   │   │       │   │   ├── dashboard.component.ts
│   │   │       │   │   ├── dashboard.component.html
│   │   │       │   │   └── dashboard.component.css
│   │   │       │   ├── branches/
│   │   │       │   │   ├── branches-list/
│   │   │       │   │   │   ├── branches-list.component.ts
│   │   │       │   │   │   ├── branches-list.component.html
│   │   │       │   │   │   └── branches-list.component.css
│   │   │       │   │   ├── new-branch/
│   │   │       │   │   │   ├── new-branch.component.ts
│   │   │       │   │   │   ├── new-branch.component.html
│   │   │       │   │   │   └── new-branch.component.css
│   │   │       │   │   ├── edit-branch/
│   │   │       │   │   │   ├── edit-branch.component.ts
│   │   │       │   │   │   ├── edit-branch.component.html
│   │   │       │   │   │   └── edit-branch.component.css
│   │   │       │   │   └── branch-detail/
│   │   │       │   │       ├── branch-detail.component.ts
│   │   │       │   │       ├── branch-detail.component.html
│   │   │       │   │       └── branch-detail.component.css
│   │   │       │   ├── users/
│   │   │       │   │   ├── users-list/
│   │   │       │   │   │   ├── users-list.component.ts
│   │   │       │   │   │   ├── users-list.component.html
│   │   │       │   │   │   └── users-list.component.css
│   │   │       │   │   ├── new-user/
│   │   │       │   │   │   ├── new-user.component.ts
│   │   │       │   │   │   ├── new-user.component.html
│   │   │       │   │   │   └── new-user.component.css
│   │   │       │   │   ├── edit-user/
│   │   │       │   │   │   ├── edit-user.component.ts
│   │   │       │   │   │   ├── edit-user.component.html
│   │   │       │   │   │   └── edit-user.component.css
│   │   │       │   │   └── user-detail/
│   │   │       │   │       ├── user-detail.component.ts
│   │   │       │   │       ├── user-detail.component.html
│   │   │       │   │       └── user-detail.component.css
│   │   │       │   ├── categories/
│   │   │       │   │   ├── categories-list/
│   │   │       │   │   │   ├── categories-list.component.ts
│   │   │       │   │   │   ├── categories-list.component.html
│   │   │       │   │   │   └── categories-list.component.css
│   │   │       │   │   ├── new-category/
│   │   │       │   │   │   ├── new-category.component.ts
│   │   │       │   │   │   ├── new-category.component.html
│   │   │       │   │   │   └── new-category.component.css
│   │   │       │   │   ├── edit-category/
│   │   │       │   │   │   ├── edit-category.component.ts
│   │   │       │   │   │   ├── edit-category.component.html
│   │   │       │   │   │   └── edit-category.component.css
│   │   │       │   │   └── category-detail/
│   │   │       │   │       ├── category-detail.component.ts
│   │   │       │   │       ├── category-detail.component.html
│   │   │       │   │       └── category-detail.component.css
│   │   │       │   ├── products/
│   │   │       │   │   ├── products-list/
│   │   │       │   │   │   ├── products-list.component.ts
│   │   │       │   │   │   ├── products-list.component.html
│   │   │       │   │   │   └── products-list.component.css
│   │   │       │   │   ├── add-product/
│   │   │       │   │   │   ├── add-product.component.ts
│   │   │       │   │   │   ├── add-product.component.html
│   │   │       │   │   │   └── add-product.component.css
│   │   │       │   │   ├── edit-product/
│   │   │       │   │   │   ├── edit-product.component.ts
│   │   │       │   │   │   ├── edit-product.component.html
│   │   │       │   │   │   └── edit-product.component.css
│   │   │       │   │   └── product-detail/
│   │   │       │   │       ├── product-detail.component.ts
│   │   │       │   │       ├── product-detail.component.html
│   │   │       │   │       └── product-detail.component.css
│   │   │       │   └── analytics/
│   │   │       │       ├── overview/
│   │   │       │       │   ├── overview.component.ts
│   │   │       │       │   ├── overview.component.html
│   │   │       │       │   └── overview.component.css
│   │   │       │       └── reports/
│   │   │       │           ├── reports.component.ts
│   │   │       │           ├── reports.component.html
│   │   │       │           └── reports.component.css
│   │   │       ├── services/
│   │   │       │   ├── branch.service.ts
│   │   │       │   ├── user.service.ts
│   │   │       │   ├── category.service.ts
│   │   │       │   └── product.service.ts
│   │   │       ├── models/
│   │   │       │   └── admin-state.model.ts
│   │   │       └── super-admin.routes.ts
│   │   │
│   │   ├── app.routes.ts              # Main routing with lazy loading
│   │   ├── app.config.ts              # App configuration (providers)
│   │   ├── app.component.ts           # Root component (standalone)
│   │   ├── app.component.html
│   │   └── app.component.css
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo/
│   │   │   ├── products/
│   │   │   ├── banners/
│   │   │   ├── icons/
│   │   │   └── status-icons/
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   ├── tailwind.css
│   │   │   └── animations.css
│   │   └── fonts/
│   │
│   ├── environments/
│   │   ├── environment.ts             # Development
│   │   ├── environment.prod.ts        # Production
│   │   └── environment.dev.ts         # Local dev
│   │
│   ├── index.html
│   ├── main.ts                        # Bootstrap standalone app
│   ├── styles.css
│   └── favicon.ico
│
├── .gitignore                         # ✅ Already updated
├── .env.example
├── .editorconfig
├── .postcssrc.json
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── tailwind.config.js
├── README.md
└── FOLDER_STRUCTURE.md
```

---

## 🎯 Key Features

### ✅ Single App with Role-Based Routing
```typescript
// app.routes.ts - Lazy loading feature routes
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'customer',
    canActivate: [customerGuard],
    loadChildren: () => import('./features/customer/customer.routes').then(m => m.CUSTOMER_ROUTES)
  },
  {
    path: 'branch-manager',
    canActivate: [branchManagerGuard],
    loadChildren: () => import('./features/branch-manager/branch-manager.routes').then(m => m.BRANCH_MANAGER_ROUTES)
  },
  {
    path: 'super-admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/super-admin/super-admin.routes').then(m => m.SUPER_ADMIN_ROUTES)
  }
];
```

### ✅ Standalone Components
```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,         // ✅ No NgModule needed
  imports: [CommonModule, TailwindModule],
  template: `<!-- Tailwind CSS classes -->`
})
export class ProductCardComponent {}
```

### ✅ Tailwind CSS Setup
```css
/* tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ✅ Environment Configuration
```typescript
// environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  authEndpoint: '/auth',
  customerEndpoint: '/customer',
  branchManagerEndpoint: '/branch-manager',
  adminEndpoint: '/admin'
};
```

---

## 📋 Structure Benefits

✅ **One app, three roles** - Easy role management with guards
✅ **Lazy loaded** - Each role's module loads only when needed
✅ **Standalone** - No NgModule boilerplate
✅ **Shared services** - Core services in `/core` used by all roles
✅ **Feature isolation** - Each role has its own services, models, components
✅ **Tailwind ready** - CSS utilities pre-configured

---

## ❓ Next Steps

Should I now:

1. ✅ **Create all folders & template files**
2. ✅ **Set up Tailwind configuration**
3. ✅ **Create core services templates**
4. ✅ **Create example route files**
5. ✅ **Create .env.example**
6. ✅ **All of the above**

Which option?
